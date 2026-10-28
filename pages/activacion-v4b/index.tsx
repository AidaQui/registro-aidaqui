import Head from "next/head";
import { Instrument_Serif, Onest } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_B } from "@/components/activacion-v4/variantes/b";

/* Variante B (lavanda) de la prueba de concepto de v4. Tema en globals.css
   (.av4--lavanda); copy en components/activacion-v4/variantes/b.tsx.
   Sin `weight` en las variables: listar pesos las pide como estáticas (ver _app.tsx). */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-av4-serif",
});
const sans = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-av4-sans",
});

export default function ActivacionV4B() {
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
        contenido={CONTENIDO_B}
        tema="av4--lavanda"
        fuentes={`${sans.variable} ${serif.variable}`}
      />
    </>
  );
}
