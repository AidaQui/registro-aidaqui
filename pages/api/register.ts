import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { registrarLead } from "@/lib/sierra";
import { atribucionDeJson } from "@/lib/sierra-atribucion";

type Data = { ok: true } | { ok: false; error: string };

/**
 * Agrega (o actualiza) el suscriptor en MailerLite y lo asigna al grupo de la
 * masterclass. Al entrar al grupo, MailerLite dispara el email automático.
 *
 * No lanza: si MailerLite falla, el registro en Supabase ya está hecho y es la
 * fuente de verdad. El email es secundario, no debe romper el alta del usuario.
 */
async function addToMailerLite(
  name: string,
  email: string,
  phone: string,
  groupId: string | undefined
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey || !groupId) {
    console.warn("MailerLite no configurado (falta API key o group id)");
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
        fields: { name, ...(phone ? { phone } : {}) },
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
 * Guarda el registro en Supabase, en la tabla correspondiente a la fuente.
 * Tolerante a falta de configuración: si no están las env vars, avisa por
 * consola y no hace nada (no rompe el alta). Esto permite mergear el código
 * antes de tener Supabase habilitado en el proyecto del cliente.
 *
 * `fila` lleva las columnas propias de cada tabla además de nombre, email y
 * teléfono (en `registros`: la variante, los UTM y el origen).
 *
 * Devuelve `{ skipped: true }` si no hay config, o el resultado del insert.
 * Con `devolverId` pide también el id de la fila nueva (lo usa el panel del
 * traficker); sólo para tablas que tienen columna id.
 */
async function saveToSupabase(
  table: string,
  fila: Record<string, unknown>,
  devolverId = false
): Promise<
  | { skipped: true }
  | { skipped: false; duplicate: boolean; error?: string; id?: string | null }
> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase no configurado (falta URL o service role key)");
    return { skipped: true };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  async function insertar(datos: Record<string, unknown>) {
    if (!devolverId) {
      const { error } = await supabase.from(table).insert(datos);
      return { id: null, error };
    }
    const { data, error } = await supabase.from(table).insert(datos).select("id").single();
    return { id: data ? String((data as { id: unknown }).id) : null, error };
  }

  try {
    let { id, error } = await insertar(fila);

    // PGRST204 = la tabla no tiene alguna de las columnas. Pasa si se publica
    // el código antes de correr el ALTER de las columnas de origen (ver
    // docs/registros-supabase.sql): se guarda sin ellas antes que perder el
    // registro.
    if (error?.code === "PGRST204" && COLUMNAS_ORIGEN.some((c) => c in fila)) {
      console.warn("Faltan columnas de origen en Supabase, se guarda sin ellas", error.message);
      const sinOrigen = Object.fromEntries(
        Object.entries(fila).filter(([c]) => !COLUMNAS_ORIGEN.includes(c))
      );
      ({ id, error } = await insertar(sinOrigen));
    }

    if (error) {
      // 23505 = unique_violation (email ya registrado) → lo tratamos como éxito
      if (error.code === "23505") {
        return { skipped: false, duplicate: true };
      }
      console.error("Error de Supabase", error);
      return { skipped: false, duplicate: false, error: "No se pudo guardar" };
    }

    return { skipped: false, duplicate: false, id };
  } catch (err) {
    console.error("Error inesperado guardando en Supabase", err);
    return { skipped: false, duplicate: false, error: "No se pudo guardar" };
  }
}

/**
 * Reenvía cada lead nuevo de las landings de registro al panel del
 * traficker (LEADS_WEBHOOK_URL), con su clave en Authorization, en el
 * formato que acordamos con él: un registro por envío. Sale de aquí y no de
 * un webhook de Supabase porque ése manda la fila completa: así se elige qué
 * datos salen. Nombre, email y teléfono sólo van con
 * LEADS_WEBHOOK_INCLUDE_PII=true (autorizado por Aida el 13/10).
 *
 * `sitio` es el dominio desde el que llegó la persona (el referrer), no el de
 * la landing, que ya va en `landing`.
 *
 * Sin LEADS_WEBHOOK_URL no hace nada, y para cortarlo basta con borrarla.
 * Igual que MailerLite, no lanza: si el panel falla o tarda más de 3 s, el
 * registro sigue y queda en los logs.
 */
async function enviarAlPanel(fila: Record<string, unknown>, id: string | null): Promise<void> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return;

  const conDatosPersonales = process.env.LEADS_WEBHOOK_INCLUDE_PII === "true";

  const lead = {
    id,
    landing: fila.variante,
    fecha: new Date().toISOString(),
    ...(conDatosPersonales
      ? { email: fila.email, nombre: fila.nombre, telefono: fila.telefono ?? null }
      : {}),
    ...Object.fromEntries(UTM_KEYS.map((key) => [key, fila[key] ?? null])),
    sitio: fila.referrer ?? null,
    fbclid: fila.fbclid ?? null,
  };

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LEADS_WEBHOOK_SECRET ?? ""}`,
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(3000),
    });

    if (!resp.ok) {
      console.error("El panel de leads respondió con error", resp.status, await resp.text());
    }
  } catch (err) {
    console.error("Error enviando el lead al panel", err);
  }
}

type SourceConfig = {
  table: string;
  mailerliteGroupEnv: string;
  /** Columnas extra que la tabla espera además de nombre/email/teléfono */
  extra?: Record<string, string | null>;
};

const SOURCE_CONFIG: Record<string, SourceConfig> = {
  masterclass: { table: "registros_masterclass", mailerliteGroupEnv: "MAILERLITE_GROUP_ID" },
  // Reutiliza el grupo ya configurado en producción. Si algún día la
  // lista de espera necesita su propio grupo, basta con definir
  // MAILERLITE_GROUP_ID_ACADEMIA_ESPERA y apuntar aquí a esa variable.
  "academia-lista-de-espera": {
    table: "registros_academia_espera",
    mailerliteGroupEnv: "MAILERLITE_GROUP_ID",
  },
};

/**
 * Landings de registro numeradas (registro-v1, registro-v2, ...): todas van
 * a la tabla `registros` con su variante, así una variante nueva no necesita
 * tocar este archivo ni la base (ver docs/registros-supabase.sql).
 *
 * El formato se valida estricto porque el número arma el nombre de la
 * variable de entorno del grupo de MailerLite: con cualquier otro texto no se
 * podría apuntar a otras variables.
 */
const VARIANTE_REGISTRO = /^registro-v(\d{1,3})$/;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Los UTM llegan de la URL: texto libre del visitante, se recortan y acotan */
function limpiarUtm(utm: unknown): Record<string, string | null> {
  const datos = typeof utm === "object" && utm !== null ? (utm as Record<string, unknown>) : {};
  return Object.fromEntries(
    UTM_KEYS.map((key) => {
      const valor = datos[key];
      const limpio = typeof valor === "string" ? valor.trim().slice(0, 200) : "";
      return [key, limpio || null];
    })
  );
}

const COLUMNAS_ORIGEN = ["referrer", "fbclid"];

/**
 * De dónde vino la persona cuando el link no trae UTM: el sitio que la mandó
 * (sólo el dominio: l.instagram.com, com.google.android.gm, ...) y el fbclid,
 * que Meta agrega a todo clic que sale de Facebook o Instagram, anuncio u
 * orgánico. También es texto del visitante: se valida y se acota.
 */
function limpiarOrigen(origen: unknown): Record<string, string | null> {
  const datos = typeof origen === "object" && origen !== null ? (origen as Record<string, unknown>) : {};

  let referrer: string | null = null;
  if (typeof datos.referrer === "string" && datos.referrer) {
    try {
      const url = new URL(datos.referrer);
      // Las apps de Android llegan como android-app://paquete/
      referrer = (url.hostname || url.protocol.replace(/:$/, "")).slice(0, 200) || null;
    } catch {
      referrer = null;
    }
  }

  const fbclid =
    typeof datos.fbclid === "string" && /^[\w-]{1,500}$/.test(datos.fbclid) ? datos.fbclid : null;

  return { referrer, fbclid };
}

function resolverFuente(source: string, utm: unknown, origen: unknown): SourceConfig {
  const registro = VARIANTE_REGISTRO.exec(source);
  if (registro) {
    // Cada variante usa su propio grupo (MAILERLITE_GROUP_ID_REGISTRO_V1, ...)
    // para recibir el email con su fecha y su hora. Mientras ese grupo no
    // exista, cae en el de la masterclass para no quedarse sin email.
    const groupEnv = `MAILERLITE_GROUP_ID_REGISTRO_V${registro[1]}`;
    if (!process.env[groupEnv]) {
      console.warn(`${groupEnv} sin valor: ${source} usa el grupo de la masterclass`);
    }
    return {
      table: "registros",
      mailerliteGroupEnv: process.env[groupEnv] ? groupEnv : "MAILERLITE_GROUP_ID",
      extra: { variante: source, ...limpiarUtm(utm), ...limpiarOrigen(origen) },
    };
  }

  // "masterclass" por compatibilidad: es la única fuente que existía antes
  // de agregar este campo.
  return SOURCE_CONFIG[source] ?? SOURCE_CONFIG.masterclass;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, phone, source, utm, origen, sierra } = req.body ?? {};

  // Basic validation
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  if (!trimmedName || !emailOk) {
    return res.status(400).json({ ok: false, error: "Datos inválidos" });
  }

  const trimmedSource = typeof source === "string" ? source.trim() : "";
  const config = resolverFuente(trimmedSource, utm, origen);

  const fila = {
    nombre: trimmedName,
    email: trimmedEmail,
    ...(trimmedPhone ? { telefono: trimmedPhone } : {}),
    ...config.extra,
  };

  // Supabase es la fuente de verdad cuando está disponible, pero un problema
  // de infraestructura ahí (caído, pausado, DNS) no debe romper el alta del
  // usuario: MailerLite es la red de contención y ya dispara el email.
  const esRegistro = config.table === "registros";
  const guardado = await saveToSupabase(config.table, fila, esRegistro);

  // Red de emergencia, como en /api/diagnostico: si no se pudo guardar, el
  // registro queda en los logs con un prefijo buscable para recuperarlo.
  if (guardado.skipped || guardado.error) {
    console.error(`REGISTRO_FALLBACK ${JSON.stringify({ tabla: config.table, ...fila })}`);
  }

  // Si Supabase no está configurado (skipped) o el registro es nuevo, lo
  // mandamos a MailerLite. Si ya existía (duplicate), lo reenviamos igual
  // por si se registró antes de configurar el email automático.
  // Al panel del traficker sólo van las landings de registro, y no los
  // duplicados: ya los recibió la primera vez.
  const esNuevo = guardado.skipped || !guardado.duplicate;
  const id = guardado.skipped ? null : (guardado.id ?? null);

  await Promise.all([
    addToMailerLite(
      trimmedName,
      trimmedEmail,
      trimmedPhone,
      process.env[config.mailerliteGroupEnv]
    ),
    esRegistro && esNuevo ? enviarAlPanel(fila, id) : Promise.resolve(),
  ]);

  // Panel de sierra labs: todas las landings, después de guardar y sólo los
  // registros nuevos, igual que el panel del traficker. No lanza.
  if (esNuevo) {
    await registrarLead({
      email: trimmedEmail,
      name: trimmedName,
      phone: trimmedPhone || null,
      ...atribucionDeJson(sierra),
    });
  }

  return res.status(200).json({ ok: true });
}
