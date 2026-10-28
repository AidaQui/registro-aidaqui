import Head from "next/head";
import { Newsreader, Familjen_Grotesk } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_C } from "@/components/activacion-v4/variantes/c";

/* Variante C (esmeralda) de la prueba de concepto de v4. Tema en globals.css
   (.av4--esmeralda); copy en components/activacion-v4/variantes/c.tsx.
   Sin `weight` en las variables: listar pesos las pide como estáticas (ver _app.tsx). */
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-av4-serif",
});
const sans = Familjen_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-av4-sans",
});

export default function ActivacionV4C() {
  return (
    <>
      <Head>
        {/* Variante de test: no compite en buscadores con la v4. */}
        <meta name="robots" content="noindex" />
        <title>Activación del Corazón y el Poder Interior — Aida Qui</title>
        <meta
          name="description"
          content="Una experiencia guiada en directo para reconectar con la verdad de tu corazón, reconocer los miedos que te frenan y activar tu poder interior para empezar a crear una vida que ames todos los días."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Av4Pagina
        contenido={CONTENIDO_C}
        tema="av4--esmeralda"
        fuentes={`${sans.variable} ${serif.variable}`}
      />
    </>
  );
}
