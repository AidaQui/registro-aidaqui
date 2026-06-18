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
async function addToMailerLite(name: string, email: string): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

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
        fields: { name },
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email } = req.body ?? {};

  // Basic validation
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

  if (!trimmedName || !emailOk) {
    return res.status(400).json({ ok: false, error: "Datos inválidos" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("Faltan variables de entorno de Supabase");
    return res.status(500).json({ ok: false, error: "Config faltante" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { error } = await supabase
      .from("registros_masterclass")
      .insert({ nombre: trimmedName, email: trimmedEmail });

    if (error) {
      // 23505 = unique_violation (email ya registrado) → lo tratamos como éxito
      if (error.code === "23505") {
        // Aun si ya estaba en Supabase, lo (re)enviamos a MailerLite por si
        // se registró antes de configurar el email automático.
        await addToMailerLite(trimmedName, trimmedEmail);
        return res.status(200).json({ ok: true });
      }
      console.error("Error de Supabase", error);
      return res.status(502).json({ ok: false, error: "No se pudo guardar" });
    }

    // Registro nuevo guardado → lo agregamos a MailerLite (dispara el email)
    await addToMailerLite(trimmedName, trimmedEmail);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error inesperado", err);
    return res.status(502).json({ ok: false, error: "No se pudo guardar" });
  }
}
