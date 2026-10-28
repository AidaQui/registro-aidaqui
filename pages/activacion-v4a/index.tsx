import Head from "next/head";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_A } from "@/components/activacion-v4/variantes/a";

/* Variante A (arcilla) de la prueba de concepto de v4. Tema en globals.css
   (.av4--arcilla); copy en components/activacion-v4/variantes/a.tsx.
   Sin `weight` en las variables: listar pesos las pide como estáticas (ver _app.tsx). */
const serif = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-av4-serif",
});
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-av4-sans",
});

export default function ActivacionV4A() {
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
        contenido={CONTENIDO_A}
        tema="av4--arcilla"
        fuentes={`${sans.variable} ${serif.variable}`}
      />
    </>
  );
}
