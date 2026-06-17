import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

type Data = { ok: true } | { ok: false; error: string };

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
        return res.status(200).json({ ok: true });
      }
      console.error("Error de Supabase", error);
      return res.status(502).json({ ok: false, error: "No se pudo guardar" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error inesperado", err);
    return res.status(502).json({ ok: false, error: "No se pudo guardar" });
  }
}
