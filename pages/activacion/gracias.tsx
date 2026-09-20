import Head from "next/head";
import GraciasActivacion from "@/components/activacion/GraciasActivacion";

export default function GraciasActivacionPage() {
  return (
    <>
      <Head>
        <title>¡Tu lugar está reservado! — Activación del Ser Multidimensional</title>
        <meta
          name="description"
          content="Ya eres parte de la Activación del Ser Multidimensional. Únete al grupo de WhatsApp para recibir el enlace de la sesión en vivo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* noindex como el resto de páginas de gracias: no tiene sentido que
            alguien llegue aquí desde un buscador sin haber pasado por el
            registro. */}
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <GraciasActivacion />
      </main>
    </>
  );
}
