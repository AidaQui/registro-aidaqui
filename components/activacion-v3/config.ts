/**
 * Single source of truth for everything that changes between editions:
 * title, dates, schedules and conversion links.
 *
 * Previous version hardcoded the date in two components ("22 de mayo" in the
 * hero badge, "06 de Junio" in the closing) and shipped the per-country
 * schedules as .webp images, so updating an edition meant editing components
 * and re-exporting assets. Keep every edition-specific value here.
 */

export const EVENTO = {
  /** Headline name of the experience, shown as the hero h1. */
  titulo: "Activación del Ser Multidimensional",
  /** Badge label. Spelled out: "10/10" reads as a ratio at a glance. */
  fechaCorta: "10 de octubre",
  /** Long form used in prose. */
  fechaLarga: "el 10 de octubre",
  formato: "Experiencia en vivo",
} as const;

export type Horario = {
  pais: string;
  hora: string;
};

/**
 * Rendered as real text (not images) so the copy is editable, accessible and
 * indexable.
 */
export const HORARIOS: Horario[] = [
  { pais: "España", hora: "19:00 hs" },
  { pais: "Argentina", hora: "14:00 hs" },
  { pais: "México", hora: "11:00 hs" },
  { pais: "Colombia", hora: "12:00 hs" },
];

/**
 * Conversion links. The sales page sends visitors to an external checkout,
 * matching how the original Frecuencia Original landing worked.
 *
 * `registro` is the same redirector /activacion already points at, and it must
 * stay that way: the registration flow and its thank-you page live on that
 * side, so changing this URL would break the funnel, not just this button.
 */
export const LINKS = {
  registro: "https://pixelbridge-theta.vercel.app/go",
  soporte: "https://wa.link/insiui",
} as const;

export const CTA_LABEL = "Quiero reservar mi lugar";

/**
 * Los cuatro momentos de octubre.
 *
 * `protagonista` marca el 10/10, que es la fecha del encuentro y la única que
 * la sección destaca. Va como dato y no como índice fijo porque si una
 * edición futura cambia de fecha, el destacado se mueve con ella.
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
 * Precio de la edición.
 *
 * `tachado` es el valor de referencia que se muestra cruzado sobre el precio
 * real. Dejarlo vacío oculta esa línea: un precio tachado que nadie ha pagado
 * nunca no persuade, molesta.
 */
export const PRECIO = {
  actual: "USD 33",
  tachado: "",
  nota: "Pago único",
} as const;
