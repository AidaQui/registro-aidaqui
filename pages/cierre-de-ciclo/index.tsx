import "@/styles/av4.module.css";
import Head from "next/head";
import { Instrument_Serif, Onest } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_CIERRE_DE_CICLO, DESCRIPCION_CIERRE_DE_CICLO } from "@/components/activacion-v4/variantes/cierre-de-ciclo";

/* El Cierre de Ciclo (relaciones). Tema en styles/av4.module.css (.av4--lavanda); copy en
   components/activacion-v4/variantes/cierre-de-ciclo.tsx.
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

export default function CierreDeCiclo() {
  return (
    <>
      <Head>
        {/* Landing de anuncios: no compite en buscadores con la v4. */}
        <meta name="robots" content="noindex" />
        <title>El Cierre de Ciclo — Aida Qui</title>
        <meta name="description" content={DESCRIPCION_CIERRE_DE_CICLO} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Av4Pagina
        contenido={CONTENIDO_CIERRE_DE_CICLO}
        tema="av4--lavanda"
        estructura="areas"
        fuentes={`${sans.variable} ${serif.variable}`}
      />
    </>
  );
}
