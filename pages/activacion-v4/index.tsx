import Head from "next/head";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_V4 } from "@/components/activacion-v4/contenido";

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

export default function ActivacionV4() {
  return (
    <>
      <Head>
        <title>Experiencia Energética — Aida Qui</title>
        <meta
          name="description"
          content="Una experiencia guiada en directo para reconectar con la verdad de tu corazón, reconocer los miedos que te frenan y activar tu poder interior para empezar a crear una vida que ames todos los días."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Av4Pagina
        contenido={CONTENIDO_V4}
        fuentes={`${sans.variable} ${serif.variable}`}
      />
    </>
  );
}
