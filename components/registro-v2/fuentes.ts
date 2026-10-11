import { DM_Serif_Display, DM_Sans } from "next/font/google";

/*
 * Tipografía de registro-v2: DM Serif Display para títulos y DM Sans para
 * textos. Se cargan sólo en las páginas de la v2 (no en _app) para no
 * sumarle peso al resto del sitio.
 *
 * En globals.css (bloque REGISTRO V2), .rv2 redefine --font-fraunces y
 * --font-jost con estas variables: así todas las reglas heredadas de la
 * masterclass y de la v1 toman las fuentes nuevas sin tocarlas una por una.
 *
 * DM Serif Display tiene un solo peso (400) y lleva su itálica real: los
 * acentos en itálica ("cambios reales", "Aida Qui") la usan.
 */
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-serif",
});

// Variable, como Jost en _app: sin `weight` cubre todo el rango
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

/** Clases que definen las dos variables; van en el <main> de cada página */
export const fuentesV2 = `${dmSerif.variable} ${dmSans.variable}`;
