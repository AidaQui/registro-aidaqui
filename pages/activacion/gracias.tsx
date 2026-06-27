import Head from "next/head";
import GraciasSection from "@/components/activacion/GraciasSection";

export default function Gracias() {
  return (
    <>
      <Head>
        <title>¡Bienvenido! — Activación de la Frecuencia Original</title>
        <meta
          name="description"
          content="Ya eres parte de la Activación a la Frecuencia Original. Únete al grupo de WhatsApp para recibir el enlace de la sesión en vivo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <GraciasSection />
      </main>
    </>
  );
}
