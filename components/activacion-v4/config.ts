/**
 * Fuente única de todo lo que cambia entre ediciones: título, fecha,
 * horarios, precio y enlaces de conversión.
 *
 * LINKS.registro y GRUPO_WHATSAPP son los de esta edición (confirmados por el
 * cliente el 23/10/2026). LINKS.soporte sigue siendo el de la edición
 * anterior. Cambiar el registro rompe el embudo, no sólo el botón.
 */

export const EVENTO = {
  /** Nombre de la experiencia. */
  titulo: "Activación del Corazón y el Poder Interior",
  /** Rótulo corto de la fecha. */
  fechaCorta: "15 de noviembre",
  /** Forma larga para prosa. */
  fechaLarga: "el 15 de noviembre",
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
 * Copia de la configuración que PixelBridge tiene para su link /go/27 (píxel de
 * Meta y link de pago de Stripe de 27€). Se arma el link /go?c=… acá, en vez
 * de usar el corto /go/27, para que el kit de Sierra pueda sumarle al link de
 * Stripe de qué landing y de qué anuncio viene la persona: PixelBridge no
 * reenvía nada por su cuenta, y sin esto las ventas llegan sin anuncio.
 *
 * ⚠ Si se cambia el píxel o el link de Stripe dentro de PixelBridge, hay que
 * cambiarlo también acá, o el botón sigue mandando a lo viejo.
 */
const PIXELBRIDGE = {
  p: "1942441866476662",
  k: "",
  s: "https://buy.stripe.com/8x27sDaowe1w8b8cYW2401f",
  n: "",
  v: "27",
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
 * el píxel de Meta y manda al link de pago de Stripe de 27€. Al hacer clic, el
 * kit de Sierra le suma al link de Stripe la landing y el anuncio de origen
 * (client_reference_id), y el webhook los manda al panel con la venta.
 */
export const LINKS = {
  registro: PIXELBRIDGE_REGISTRO,
  soporte: "https://wa.link/insiui",
} as const;

/** Grupo de WhatsApp de la experiencia (página de gracias). */
export const GRUPO_WHATSAPP = "https://chat.whatsapp.com/G1AN4bv8fnvKr2IVREeY7x";

export const CTA_LABEL = "Activa tu corazón";

/**
 * Precio. La moneda es el EURO. `tachado` vacío oculta la línea de precio
 * de referencia: un tachado que nadie ha pagado no persuade, molesta.
 */
export const PRECIO = {
  actual: "27€",
  tachado: "",
  nota: "Pago único",
} as const;
