import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import {
  ETIQUETA_MAILERLITE,
  PREGUNTAS_CERRADAS,
  calcularDiagnostico,
  type Respuestas,
} from "@/components/diagnostico/preguntas";
import { FICHAS } from "@/components/diagnostico/resultados";

/*
 * /api/diagnostico — guarda el resultado y lo empuja a MailerLite.
 *
 * EL DIAGNÓSTICO SE RECALCULA AQUÍ. No se acepta el patrón que mande el
 * navegador: es lo que decide qué vídeo recibe la persona, y ese veredicto no
 * puede depender de un valor editable desde las herramientas de desarrollo.
 * El cliente manda las respuestas crudas; el servidor calcula.
 *
 * PRIMERO SUPABASE, DESPUÉS MAILERLITE. Si el proceso muere a mitad del envío
 * o MailerLite rechaza, el dato ya está guardado. Es el mismo orden que usa
 * /api/register y es lo único que garantiza no perder a nadie.
 *
 * SIEMPRE SE RESPONDE 200 mientras los datos sean válidos. La persona ya
 * completó el cuestionario: un error en pantalla por un fallo de
 * infraestructura solo conseguiría que se fuera, y el fallo no es suyo.
 */

type Data = { ok: true; patron: string } | { ok: false; error: string };

const TABLE = "diagnosticos";

/**
 * Añade o actualiza el suscriptor en MailerLite con su patrón dominante.
 *
 * El campo `patron_dominante` es el que lee la automatización para elegir el
 * vídeo. Tiene que existir como campo personalizado en MailerLite: si no, la
 * API acepta el suscriptor pero descarta ese valor en silencio.
 *
 * OJO: `etiqueta` NO es el identificador interno. Es el nombre con el que la
 * automatización tiene montadas sus siete condiciones («Seguridad»,
 * «Merecimiento»…), y la traducción vive en ETIQUETA_MAILERLITE. En Supabase
 * se sigue guardando el identificador, así que el mismo patrón aparece con
 * dos nombres según dónde se mire.
 *
 * No lanza: el dato ya está en Supabase y el correo es secundario.
 */
async function addToMailerLite(
  name: string,
  email: string,
  phone: string,
  etiqueta: string
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID_DIAGNOSTICO;

  /* NO HAY FALLBACK A MAILERLITE_GROUP_ID, Y ES DELIBERADO.
     Esa variable es el grupo de la masterclass y la lista de espera. Caer en
     ella cuando falta la del diagnóstico no salva nada: mete a la persona en
     un embudo que no es el suyo y le dispara la automatización de otra
     campaña. El síntoma aparece días después como «me llegó un correo
     viejo», sin nada en los logs que apunte al origen.

     El diagnóstico ya quedó guardado en Supabase antes de llegar aquí, así
     que cortar no pierde a nadie: solo retrasa el vídeo hasta que se corrija
     la configuración. */
  if (!groupId) {
    console.error(
      "MAILERLITE_GROUP_ID_DIAGNOSTICO sin valor: el suscriptor no entra a " +
        "ningún grupo y no recibirá su vídeo. Revisar variables de entorno."
    );
    return;
  }

  if (!apiKey) {
    console.error("MAILERLITE_API_KEY sin valor: no se envía nada a MailerLite.");
    return;
  }

  try {
    const resp = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          ...(name ? { name } : {}),
          ...(phone ? { phone } : {}),
          patron_dominante: etiqueta,
        },
        groups: [groupId],
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error("MailerLite respondió con error", resp.status, detail);
    }
  } catch (err) {
    console.error("Error llamando a MailerLite", err);
  }
}

/**
 * Guarda el diagnóstico completo: una columna por pregunta más el resultado.
 *
 * Las respuestas van en columnas separadas y no en un JSON para poder
 * consultarlas directamente ("cuántas personas respondieron C en la tercera"),
 * que es justo lo que se va a entregar al cliente.
 *
 * Tolerante a falta de configuración, igual que /api/register.
 */
async function saveToSupabase(
  fila: Record<string, unknown>
): Promise<{ ok: boolean }> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase no configurado (falta URL o service role key)");
    return { ok: false };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from(TABLE).insert(fila);

    if (error) {
      console.error("Error de Supabase", error);
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error("Error inesperado guardando en Supabase", err);
    return { ok: false };
  }
}

/**
 * Red de emergencia: deja el registro en los logs con un prefijo buscable,
 * para poder recuperarlo a mano si Supabase no estaba disponible.
 */
function registrarFallback(fila: Record<string, unknown>) {
  console.error(`DIAGNOSTICO_FALLBACK ${JSON.stringify(fila)}`);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, answers, open } = req.body ?? {};

  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  if (!emailOk) {
    return res.status(400).json({ ok: false, error: "Datos inválidos" });
  }

  /* Solo se aceptan las claves de las preguntas conocidas y con un índice de
     opción válido. Sin este filtro, una petición manipulada podría inflar el
     objeto o meter claves que después nadie sabría interpretar. */
  const respuestas: Respuestas = {};
  if (typeof answers === "object" && answers !== null) {
    for (const pregunta of PREGUNTAS_CERRADAS) {
      const opciones = pregunta.opciones ?? [];
      const valor = (answers as Record<string, unknown>)[pregunta.id];
      if (
        typeof valor === "number" &&
        Number.isInteger(valor) &&
        valor >= 0 &&
        valor < opciones.length
      ) {
        respuestas[pregunta.id] = valor;
      }
    }
  }

  if (Object.keys(respuestas).length === 0) {
    return res.status(400).json({ ok: false, error: "Sin respuestas" });
  }

  const diagnostico = calcularDiagnostico(respuestas);

  /* Se guarda el texto de la opción y no solo su índice: si algún día cambia
     el orden o la redacción de una pregunta, los registros antiguos seguirían
     siendo legibles sin tener que reconstruir qué decía cada letra. */
  const columnasRespuestas: Record<string, string> = {};
  for (const pregunta of PREGUNTAS_CERRADAS) {
    const indice = respuestas[pregunta.id];
    const opcion = pregunta.opciones?.[indice ?? -1];
    if (typeof indice === "number" && opcion) {
      const letra = String.fromCharCode(65 + indice);
      columnasRespuestas[pregunta.id] = `${letra}. ${opcion}`;
    }
  }

  /* La séptima es de texto libre y no puntúa, pero es la respuesta con más
     valor cualitativo de todo el cuestionario: es la que se va a leer a mano.
     Se recorta porque un textarea sin tope es una puerta abierta a guardar
     cualquier cosa. */
  const abierta =
    typeof open === "string" ? open.trim().slice(0, 2000) : "";

  const fila = {
    nombre: trimmedName || null,
    email: trimmedEmail,
    telefono: trimmedPhone || null,
    ...columnasRespuestas,
    p7_abierta: abierta || null,
    patron_dominante: diagnostico.dominante,
    patron_nombre: FICHAS[diagnostico.dominante].titulo,
    puntajes: diagnostico.puntajes,
    hubo_empate: diagnostico.huboEmpate,
  };

  const guardado = await saveToSupabase(fila);
  if (!guardado.ok) registrarFallback(fila);

  /* A MailerLite va la etiqueta, no el identificador: es contra eso que
     comparan las siete condiciones de la automatización. */
  await addToMailerLite(
    trimmedName,
    trimmedEmail,
    trimmedPhone,
    ETIQUETA_MAILERLITE[diagnostico.dominante]
  );

  return res.status(200).json({ ok: true, patron: diagnostico.dominante });
}
