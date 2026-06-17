import Head from "next/head";
import GraciasSectionMC from "@/components/GraciasSectionMC";

export default function GraciasMasterclass() {
  return (
    <>
      <Head>
        <title>¡Lugar reservado! — Masterclass Gratuita | Aida Qui</title>
        <meta
          name="description"
          content="Tu lugar en la masterclass gratuita está reservado. Unite al WhatsApp para recibir el enlace de acceso a la sesión en vivo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <GraciasSectionMC />
      </main>
    </>
  );
}
