import type { Atribucion } from "@/lib/sierra";

const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

/**
 * Atribución que los formularios por fetch/JSON mandan en `sierra` (lo que
 * devuelve leerAtribucion() en el navegador). Es texto del visitante: se
 * valida y se acota antes de reenviarlo al panel.
 */
export function atribucionDeJson(valor: unknown): Atribucion {
  const datos = typeof valor === "object" && valor !== null ? (valor as Record<string, unknown>) : {};
  const utm = typeof datos.utm === "object" && datos.utm !== null ? (datos.utm as Record<string, unknown>) : {};

  const texto = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
  const path = texto(datos.path, 200);

  return {
    path: path?.startsWith("/") ? path : null,
    utm: Object.fromEntries(UTM.map((key) => [key, texto(utm[key], 120)])),
  };
}
