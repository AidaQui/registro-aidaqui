/**
 * Single source of truth for everything that changes between editions:
 * dates, schedules and conversion links.
 *
 * Previous version hardcoded the date in two components ("22 de mayo" in the
 * hero badge, "06 de Junio" in the closing) and shipped the per-country
 * schedules as .webp images, so updating an edition meant editing components
 * and re-exporting assets. Keep every edition-specific value here.
 *
 * TODO: replace the "X" placeholders once the edition details are confirmed.
 */

export const EVENTO = {
  /** Short label for badges and chips, e.g. "12 de junio". */
  fechaCorta: "X",
  /** Long form used in prose, e.g. "este 12 de junio". */
  fechaLarga: "X",
  formato: "En vivo vía Zoom",
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
  { pais: "España", hora: "X" },
  { pais: "Argentina", hora: "X" },
  { pais: "México", hora: "X" },
  { pais: "Colombia", hora: "X" },
];

/**
 * Conversion links. The sales page sends visitors to an external checkout,
 * matching how the original Frecuencia Original landing worked.
 */
export const LINKS = {
  /** TODO: point to the real checkout/registration URL. */
  registro: "#",
  soporte: "https://wa.link/insiui",
} as const;

export const CTA_LABEL = "Reservar mi lugar";
