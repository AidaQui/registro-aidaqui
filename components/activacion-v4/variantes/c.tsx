import { CONTENIDO_V4, type Contenido } from "@/components/activacion-v4/contenido";

/**
 * Copy de la variante C (Esmeralda, /activacion-v4c).
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
export const CONTENIDO_C: Contenido = {
  ...CONTENIDO_V4,
  hero: {
    ...CONTENIDO_V4.hero,
    // Retrato en arco, a la derecha del texto: para cambiar la foto, cambiar `src` y sus medidas.
    retrato: {
      forma: "arco",
      src: "/activacion-v4/hero-esmeralda.webp",
      ancho: 680,
      alto: 750,
      posicion: "50% 20%",
    },
  },
};
