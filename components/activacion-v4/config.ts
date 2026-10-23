/**
 * Fuente única de todo lo que cambia entre ediciones: título, fecha,
 * horarios, precio y enlaces de conversión.
 *
 * PENDIENTE DEL CLIENTE: LINKS.registro, LINKS.soporte y GRUPO_WHATSAPP
 * siguen siendo los de la edición anterior hasta que el cliente confirme los
 * nuevos. Cambiar el registro rompe el embudo, no sólo el botón.
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
 * Enlaces de conversión. `registro` es el redirector donde viven el registro
 * y su página de gracias.
 */
export const LINKS = {
  registro: "https://pixelbridge-theta.vercel.app/go",
  soporte: "https://wa.link/insiui",
} as const;

/** Grupo de WhatsApp de la experiencia (página de gracias). */
export const GRUPO_WHATSAPP = "https://chat.whatsapp.com/CXDD2XxJkJkBE90CEMjZeX";

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
