import Head from "next/head";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Av4Hero from "@/components/activacion-v4/Av4Hero";
import Av4Identificacion from "@/components/activacion-v4/Av4Identificacion";
import Av4Experiencia from "@/components/activacion-v4/Av4Experiencia";
import Av4Contexto from "@/components/activacion-v4/Av4Contexto";
import Av4Precio from "@/components/activacion-v4/Av4Precio";
import Av4Bio from "@/components/activacion-v4/Av4Bio";
import Av4Momento from "@/components/activacion-v4/Av4Momento";
import Av4Testimonios from "@/components/activacion-v4/Av4Testimonios";
import Av4Conector from "@/components/activacion-v4/Av4Conector";
import Av4Cierre from "@/components/activacion-v4/Av4Cierre";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

/* Fuentes sólo para las páginas v4: sans para el texto y serif cursiva para los acentos.
   Sin `weight`: son variables, y listar pesos las pide como estáticas (ver _app.tsx). */
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-av4-sans",
});
const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
  variable: "--font-av4-serif",
});

/* Fondos exactos de cada sección (ver .av4 en globals.css). */
const MARFIL = "#fbf6f1";
const ROSA = "#f5e6e1";
const VINO = "#4a1426";

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
      {/* Más ágil que el default: la página es larga y con 2s se sentía lenta. */}
      <SmoothScroll duration={1.1} wheelMultiplier={1} />
      <main className={`av4 ${sans.variable} ${serif.variable}`}>
        <Av4Hero />
        <Av4Conector color={MARFIL} />
        <Av4Identificacion />
        <Av4Conector color={VINO} variante="onda" />
        <Av4Experiencia />
        <Av4Conector color={MARFIL} />
        <Av4Contexto />
        <Av4Conector color={VINO} />
        <Av4Precio />
        <Av4Conector color={MARFIL} variante="onda" />
        <Av4Bio />
        <Av4Conector color={ROSA} />
        <Av4Testimonios />
        <Av4Conector color={ROSA} />
        <Av4Momento />
        <Av4Conector color={VINO} />
        <Av4Cierre />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
