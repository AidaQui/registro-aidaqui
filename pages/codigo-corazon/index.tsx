import Head from "next/head";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_CODIGO_CORAZON, DESCRIPCION_CODIGO_CORAZON } from "@/components/activacion-v4/variantes/codigo-corazon";

/* El Código Corazón (dinero y abundancia). Tema en globals.css (.av4--arcilla); copy en
   components/activacion-v4/variantes/codigo-corazon.tsx.
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

export default function CodigoCorazon() {
  return (
    <>
      <Head>
        {/* Landing de anuncios: no compite en buscadores con la v4. */}
        <meta name="robots" content="noindex" />
        <title>El Código Corazón — Aida Qui</title>
        <meta name="description" content={DESCRIPCION_CODIGO_CORAZON} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Av4Pagina
        contenido={CONTENIDO_CODIGO_CORAZON}
        tema="av4--arcilla"
        estructura="areas"
        fuentes={`${sans.variable} ${serif.variable}`}
      />
    </>
  );
}
