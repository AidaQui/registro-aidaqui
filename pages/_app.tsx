import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fraunces, Jost, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Clarity from "@/components/Clarity";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
});

/*
 * Lora se carga junto a Fraunces, no en su lugar.
 *
 * --font-fraunces aparece en 93 reglas repartidas por las cinco landings, y
 * este archivo es global: sustituirla aquí cambiaría también /academia,
 * /activacion, /masterclass, /lista-de-espera y /diagnostico.
 *
 * Así que Lora entra como variable propia y sólo /frecuencia la usa —ver
 * .frec-lora en globals.css—. Si al verla convence, el paso siguiente es
 * decidir si se lleva al resto del sitio.
 */
const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  style: ["normal", "italic"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${fraunces.variable} ${jost.variable} ${lora.variable}`}>
      <Component {...pageProps} />
      <Analytics />
      <Clarity />
    </main>
  );
}
