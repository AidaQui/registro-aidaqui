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
  fechaCorta: "7 de noviembre",
  /** Forma larga para prosa. */
  fechaLarga: "el 7 de noviembre",
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
 * Enlaces de conversión. `registro` es el redirector de PixelBridge: dispara
 * el píxel de Meta y manda al link de pago de Stripe de 27€. Como no es un
 * link de Stripe, la compra no trae el anuncio de origen: el webhook la ubica
 * en esta landing con SIERRA_ACTIVACION_PATH.
 */
export const LINKS = {
  registro: "https://pixelbridge-theta.vercel.app/go/27",
  soporte: "https://wa.link/insiui",
} as const;

/** Grupo de WhatsApp de la experiencia (página de gracias). */
export const GRUPO_WHATSAPP = "https://chat.whatsapp.com/G1AN4bv8fnvKr2IVREeY7x";

export const CTA_LABEL = "Quiero reservar mi plaza";

/**
 * Precio. La moneda es el EURO. `tachado` vacío oculta la línea de precio
 * de referencia: un tachado que nadie ha pagado no persuade, molesta.
 */
export const PRECIO = {
  actual: "27€",
  tachado: "",
  nota: "Pago único",
} as const;
