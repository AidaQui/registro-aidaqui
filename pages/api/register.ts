import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

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
 * teléfono (en `registros`: la variante y los UTM).
 *
 * Devuelve `{ skipped: true }` si no hay config, o el resultado del insert.
 */
async function saveToSupabase(
  table: string,
  fila: Record<string, unknown>
): Promise<{ skipped: true } | { skipped: false; duplicate: boolean; error?: string }> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase no configurado (falta URL o service role key)");
    return { skipped: true };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { error } = await supabase.from(table).insert(fila);

    if (error) {
      // 23505 = unique_violation (email ya registrado) → lo tratamos como éxito
      if (error.code === "23505") {
        return { skipped: false, duplicate: true };
      }
      console.error("Error de Supabase", error);
      return { skipped: false, duplicate: false, error: "No se pudo guardar" };
    }

    return { skipped: false, duplicate: false };
  } catch (err) {
    console.error("Error inesperado guardando en Supabase", err);
    return { skipped: false, duplicate: false, error: "No se pudo guardar" };
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

function resolverFuente(source: string, utm: unknown): SourceConfig {
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
      extra: { variante: source, ...limpiarUtm(utm) },
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

  const { name, email, phone, source, utm } = req.body ?? {};

  // Basic validation
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  if (!trimmedName || !emailOk) {
    return res.status(400).json({ ok: false, error: "Datos inválidos" });
  }

  const trimmedSource = typeof source === "string" ? source.trim() : "";
  const config = resolverFuente(trimmedSource, utm);

  const fila = {
    nombre: trimmedName,
    email: trimmedEmail,
    ...(trimmedPhone ? { telefono: trimmedPhone } : {}),
    ...config.extra,
  };

  // Supabase es la fuente de verdad cuando está disponible, pero un problema
  // de infraestructura ahí (caído, pausado, DNS) no debe romper el alta del
  // usuario: MailerLite es la red de contención y ya dispara el email.
  const guardado = await saveToSupabase(config.table, fila);

  // Red de emergencia, como en /api/diagnostico: si no se pudo guardar, el
  // registro queda en los logs con un prefijo buscable para recuperarlo.
  if (guardado.skipped || guardado.error) {
    console.error(`REGISTRO_FALLBACK ${JSON.stringify({ tabla: config.table, ...fila })}`);
  }

  // Si Supabase no está configurado (skipped) o el registro es nuevo, lo
  // mandamos a MailerLite. Si ya existía (duplicate), lo reenviamos igual
  // por si se registró antes de configurar el email automático.
  await addToMailerLite(
    trimmedName,
    trimmedEmail,
    trimmedPhone,
    process.env[config.mailerliteGroupEnv]
  );

  return res.status(200).json({ ok: true });
}
