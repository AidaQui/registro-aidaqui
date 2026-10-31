import { Instrument_Serif, DM_Sans } from "next/font/google";

/*
 * Tipografía de registro-v3: Instrument Serif para títulos y DM Sans para
 * textos. Se cargan sólo en las páginas de la v3 (no en _app) para no
 * sumarle peso al resto del sitio.
 *
 * En styles/legacy.module.css (bloque REGISTRO V3), .rv3 redefine --font-fraunces y
 * --font-jost con estas variables: así todas las reglas heredadas de la
 * masterclass y de la v1 toman las fuentes nuevas sin tocarlas una por una.
 *
 * Instrument Serif tiene un solo peso (400) y lleva su itálica real: los
 * acentos en itálica ("años de trabajo interior", "Aida Qui") la usan. Es
 * más angosta que DM Serif Display, la de la v2: con el mismo tamaño se ve
 * más chica, por eso los títulos de la v3 van más grandes.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

// Variable, como Jost en _app: sin `weight` cubre todo el rango
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

/** Clases que definen las dos variables; van en el <main> de cada página */
export const fuentesV3 = `${instrumentSerif.variable} ${dmSans.variable}`;
