import Head from "next/head";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Av4Gracias from "@/components/activacion-v4/Av4Gracias";

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

export default function GraciasActivacionV4() {
  return (
    <>
      <Head>
        <title>¡Tu lugar está reservado! — Inmersión Energética</title>
        <meta
          name="description"
          content="Ya eres parte de la Inmersión Energética. Únete al grupo de WhatsApp para recibir el enlace de la sesión en vivo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* noindex: nadie debería llegar aquí desde un buscador sin haber
            pasado por el registro. */}
        <meta name="robots" content="noindex" />
      </Head>
      <main className={`av4 ${sans.variable} ${serif.variable}`}>
        <Av4Gracias />
      </main>
    </>
  );
}
