/**
 * Fuente única de todo lo que cambia entre ediciones: título, fechas,
 * horarios, precio y enlaces de conversión.
 *
 * PENDIENTE DEL CLIENTE (v4): los valores de abajo son una copia de
 * /activacion y son provisionales. Cuando llegue la información del nuevo
 * lanzamiento hay que revisar EVENTO, HORARIOS, OCTUBRE, PRECIO, LINKS,
 * GRUPO_WHATSAPP y el texto del FAQ sobre la fecha límite de inscripción
 * (FECHA_LIMITE_INSCRIPCION).
 */

export const EVENTO = {
  /** Nombre de la experiencia. */
  titulo: "Activación del Ser Multidimensional",
  /** Rótulo corto. Con las palabras completas: "10/10" se lee como una razón. */
  fechaCorta: "10 de octubre",
  /** Forma larga para prosa. */
  fechaLarga: "el 10 de octubre",
  formato: "Experiencia en vivo",
} as const;

/** Texto del FAQ sobre el plazo de inscripción. */
export const FECHA_LIMITE_INSCRIPCION = "9 de octubre a las 23:59";

export type Horario = {
  pais: string;
  hora: string;
};

/** Se renderiza como texto real: editable, accesible e indexable. */
export const HORARIOS: Horario[] = [
  { pais: "España", hora: "19:00 hs" },
  { pais: "Argentina", hora: "14:00 hs" },
  { pais: "México", hora: "11:00 hs" },
  { pais: "Colombia", hora: "12:00 hs" },
];

/**
 * Enlaces de conversión. `registro` es el mismo redirector que usa
 * /activacion: el registro y su página de gracias viven de ese lado, así que
 * cambiar esta URL rompe el embudo, no sólo el botón.
 */
export const LINKS = {
  registro: "https://pixelbridge-theta.vercel.app/go",
  soporte: "https://wa.link/insiui",
} as const;

/** Grupo de WhatsApp de la experiencia (página de gracias). */
export const GRUPO_WHATSAPP = "https://chat.whatsapp.com/CXDD2XxJkJkBE90CEMjZeX";

export const CTA_LABEL = "Quiero reservar mi lugar";

/**
 * Los cuatro momentos de octubre. `protagonista` marca el día del encuentro,
 * el único que la sección destaca.
 */
export type MomentoOctubre = {
  dia: string;
  nombre: string;
  protagonista?: boolean;
};

export const OCTUBRE: MomentoOctubre[] = [
  { dia: "01", nombre: "Apertura" },
  { dia: "10", nombre: "Activación", protagonista: true },
  { dia: "19", nombre: "Integración" },
  { dia: "28", nombre: "Cierre" },
];

/**
 * Precio. La moneda es el EURO. `tachado` vacío oculta la línea de precio
 * de referencia: un tachado que nadie ha pagado no persuade, molesta.
 */
export const PRECIO = {
  actual: "33€",
  tachado: "",
  nota: "Pago único",
} as const;
