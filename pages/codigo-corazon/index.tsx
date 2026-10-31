import Head from "next/head";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import Av4Pagina from "@/components/activacion-v4/Av4Pagina";
import { CONTENIDO_CODIGO_CORAZON, DESCRIPCION_CODIGO_CORAZON } from "@/components/activacion-v4/variantes/codigo-corazon";

/* El Código Corazón (dinero y abundancia). Tema en globals.css (.av4--arcilla); copy en
   components/activacion-v4/variantes/codigo-corazon.tsx.
   Sin `weight` en las variables: listar pesos las pide como estáticas (ver _app.tsx).
   `preload: false`: Turbopack mete estas @font-face en un chunk de CSS que cargan
   casi todas las páginas, y con preload sus woff2 se bajaban en todas las landings. */
const serif = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-av4-serif",
  preload: false,
});
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-av4-sans",
  preload: false,
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
        {/* Foto del hero (fondo CSS, LCP): se precarga por breakpoint. */}
        <link
          rel="preload"
          as="image"
          href="/activacion-v4/hero-arcilla-mobile.webp"
          media="(max-width: 640px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/activacion-v4/hero-arcilla.webp"
          media="(min-width: 641px)"
          fetchPriority="high"
        />
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
