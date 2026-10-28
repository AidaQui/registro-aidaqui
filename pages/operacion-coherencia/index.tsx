import Head from "next/head";
import { Newsreader, Familjen_Grotesk } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_COHERENCIA, DESCRIPCION_COHERENCIA } from "@/components/activacion-v4/variantes/coherencia";

/* Operación Coherencia (salud y energía). Tema en globals.css (.av4--esmeralda); copy en
   components/activacion-v4/variantes/coherencia.tsx.
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

export default function OperacionCoherencia() {
  return (
    <>
      <Head>
        {/* Landing de anuncios: no compite en buscadores con la v4. */}
        <meta name="robots" content="noindex" />
        <title>Operación Coherencia — Aida Qui</title>
        <meta name="description" content={DESCRIPCION_COHERENCIA} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Av4Pagina
        contenido={CONTENIDO_COHERENCIA}
        tema="av4--esmeralda"
        estructura="areas"
        fuentes={`${sans.variable} ${serif.variable}`}
      />
    </>
  );
}
