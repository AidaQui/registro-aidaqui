import Head from "next/head";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Av4Hero from "@/components/activacion-v4/Av4Hero";
import Av4Identificacion from "@/components/activacion-v4/Av4Identificacion";
import Av4Experiencia from "@/components/activacion-v4/Av4Experiencia";
import Av4Contexto from "@/components/activacion-v4/Av4Contexto";
import Av4Precio from "@/components/activacion-v4/Av4Precio";
import Av4Bio from "@/components/activacion-v4/Av4Bio";
import Av4Momento from "@/components/activacion-v4/Av4Momento";
import Av4Mosaico from "@/components/activacion-v4/Av4Mosaico";
import Av4Cierre from "@/components/activacion-v4/Av4Cierre";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

/* Fuentes sólo para las páginas v4: sans para el texto y serif cursiva para los acentos. */
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-av4-sans",
});
const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  display: "swap",
  variable: "--font-av4-serif",
});

export default function ActivacionV4() {
  return (
    <>
      <Head>
        <title>Activación del Corazón y el Poder Interior — Aida Qui</title>
        <meta
          name="description"
          content="Una experiencia guiada en directo para reconectar con la verdad de tu corazón, reconocer los miedos que te frenan y activar tu poder interior para empezar a crear una vida que ames todos los días."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SmoothScroll />
      <main className={`av4 ${sans.variable} ${serif.variable}`}>
        <Av4Hero />
        <Av4Identificacion />
        <Av4Experiencia />
        <Av4Contexto />
        <Av4Precio />
        <Av4Bio />
        <Av4Mosaico />
        <Av4Momento />
        <Av4Cierre />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
