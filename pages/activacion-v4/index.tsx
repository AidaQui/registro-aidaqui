import Head from "next/head";
import { Cormorant_Garamond } from "next/font/google";
import Av4Hero from "@/components/activacion-v4/Av4Hero";
import Av4Identificacion from "@/components/activacion-v4/Av4Identificacion";
import Av4Experiencia from "@/components/activacion-v4/Av4Experiencia";
import Av4Contexto from "@/components/activacion-v4/Av4Contexto";
import Av4Precio from "@/components/activacion-v4/Av4Precio";
import Av4Bio from "@/components/activacion-v4/Av4Bio";
import Av4Momento from "@/components/activacion-v4/Av4Momento";
import Av4Cierre from "@/components/activacion-v4/Av4Cierre";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

/* Serif de alto contraste para titulares; sólo se carga en las páginas v4. */
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
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
      <main className={`av4 ${serif.variable}`}>
        <Av4Hero />
        <Av4Identificacion />
        <Av4Experiencia />
        <Av4Contexto />
        <Av4Precio />
        <Av4Bio />
        <Av4Momento />
        <Av4Cierre />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
