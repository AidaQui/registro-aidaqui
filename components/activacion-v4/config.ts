import { SOPORTE_WHATSAPP } from "@/lib/soporte";

/**
 * Fuente única de todo lo que cambia entre ediciones: título, fecha,
 * horarios, precio y enlaces de conversión.
 *
 * GRUPO_WHATSAPP es el de esta edición (confirmado por el cliente el
 * 23/10/2026). LINKS.registro apunta al checkout de 19€ (28/10/2026) y
 * LINKS.soporte sale de lib/soporte.ts, el mismo para todas las landings.
 * Cambiar el registro rompe el embudo, no sólo el botón.
 */

export const EVENTO = {
  /** Nombre de la experiencia. */
  titulo: "Inmersión Energética",
  /** Rótulo corto de la fecha. */
  fechaCorta: "14 de noviembre",
  /** Forma larga para prosa. */
  fechaLarga: "el 14 de noviembre",
  formato: "Online vía Zoom",
} as const;

export type Horario = {
  pais: string;
  hora: string;
};

/** Se renderiza como texto real: editable, accesible e indexable. */
export const HORARIOS: Horario[] = [
  { pais: "España", hora: "19:00 hs" },
  { pais: "Argentina", hora: "15:00 hs" },
  { pais: "México", hora: "12:00 hs" },
  { pais: "Colombia", hora: "13:00 hs" },
];

/**
 * Configuración de PixelBridge para el checkout del evento (píxel de Meta y
 * link de pago de Stripe de 19€, producto prod_VWQOUxqU7A9U6e). Se arma el
 * link /go?c=… acá, en vez de usar un link corto de PixelBridge, para que el
 * kit de Sierra pueda sumarle al link de Stripe de qué landing y de qué
 * anuncio viene la persona: PixelBridge no reenvía nada por su cuenta, y sin
 * esto las ventas llegan sin anuncio.
 *
 * ⚠ Si se cambia el píxel o el link de Stripe dentro de PixelBridge, hay que
 * cambiarlo también acá, o el botón sigue mandando a lo viejo.
 */
const PIXELBRIDGE = {
  p: "1942441866476662",
  k: "",
  s: "https://buy.stripe.com/fZudR1eEM9Lg2QO4sq2401g",
  n: "",
  v: "19",
  c: "EUR",
  t: "¡Gracias por tu compra!",
  m: "Tu pedido ha sido procesado correctamente. Revisa tu email para más detalles.",
};

/** Mismo formato que PixelBridge: JSON en UTF-8, en base64. */
function aBase64(texto: string): string {
  let binario = "";
  for (const byte of new TextEncoder().encode(texto)) binario += String.fromCharCode(byte);
  return btoa(binario);
}

const PIXELBRIDGE_REGISTRO = `https://pixelbridge-theta.vercel.app/go?c=${encodeURIComponent(aBase64(JSON.stringify(PIXELBRIDGE)))}`;

/**
 * Enlaces de conversión. `registro` es el redirector de PixelBridge: dispara
 * el píxel de Meta y manda al link de pago de Stripe de 19€. Al hacer clic, el
 * kit de Sierra le suma al link de Stripe la landing y el anuncio de origen
 * (client_reference_id), y el webhook los manda al panel con la venta.
 */
export const LINKS = {
  registro: PIXELBRIDGE_REGISTRO,
  soporte: SOPORTE_WHATSAPP,
} as const;

/**
 * Grupos de WhatsApp de la experiencia (páginas de gracias). Cada público
 * tiene el suyo: el orgánico entra por /activacion-v4 y su link de Stripe
 * vuelve a /activacion-v4/gracias; el frío (anuncios) entra por las cuatro
 * landings de área y su link de Stripe vuelve a /inmersion/gracias.
 */
export const GRUPO_WHATSAPP = "https://chat.whatsapp.com/G1AN4bv8fnvKr2IVREeY7x";
export const GRUPO_WHATSAPP_FRIO = "https://chat.whatsapp.com/FeJsrS1THtfEnLzVt63Kqa";

export const CTA_LABEL = "Quiero apuntarme";

/**
 * Precio. La moneda es el EURO. `tachado` vacío oculta la línea de precio
 * de referencia: un tachado que nadie ha pagado no persuade, molesta.
 */
export const PRECIO = {
  actual: "19€",
  tachado: "",
  nota: "Pago único",
} as const;
