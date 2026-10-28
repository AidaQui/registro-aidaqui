import Head from "next/head";
import { Brygada_1918, Albert_Sans } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_MISION_ALMA, DESCRIPCION_MISION_ALMA } from "@/components/activacion-v4/variantes/mision-alma";

/* Misión Alma (propósito). Tema en globals.css (.av4--amanecer); copy en
   components/activacion-v4/variantes/mision-alma.tsx.
   Sin `weight` en las variables: listar pesos las pide como estáticas (ver _app.tsx). */
const serif = Brygada_1918({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-av4-serif",
});
const sans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-av4-sans",
});

export default function MisionAlma() {
  return (
    <>
      <Head>
        {/* Landing de anuncios: no compite en buscadores con la v4. */}
        <meta name="robots" content="noindex" />
        <title>Misión Alma — Aida Qui</title>
        <meta name="description" content={DESCRIPCION_MISION_ALMA} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Av4Pagina
        contenido={CONTENIDO_MISION_ALMA}
        tema="av4--amanecer"
        estructura="areas"
        fuentes={`${sans.variable} ${serif.variable}`}
      />
    </>
  );
}
