import { CONTENIDO_V4, type Contenido } from "@/components/activacion-v4/contenido";

/**
 * Copy de la variante B (Lavanda, /activacion-v4b).
 *
 * TODO: copy del cliente. Por ahora es idéntico al de v4. Para cambiar un
 * texto, pisarlo acá debajo del spread; lo que no se pise sigue igual a v4.
 * Los campos con marcas (titulares) aceptan JSX:
 *
 *   hero: {
 *     ...CONTENIDO_V4.hero,
 *     titular: <>Un titular nuevo <span className="av4-oro">con acento</span>.</>,
 *   },
 *
 * Fecha, horarios, precio y enlaces no se tocan acá: están en config.ts.
 */
export const CONTENIDO_B: Contenido = {
  ...CONTENIDO_V4,
  hero: {
    ...CONTENIDO_V4.hero,
    // Retrato en óvalo centrado: para cambiar la foto, cambiar `src` y sus medidas.
    retrato: {
      forma: "ovalo",
      src: "/activacion-v4/hero-lavanda.webp",
      ancho: 700,
      alto: 750,
      posicion: "50% 22%",
    },
  },
};
