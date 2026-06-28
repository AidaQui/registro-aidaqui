import Head from "next/head";
import GraciasSectionAcademia from "@/components/academia/GraciasSection";

export default function GraciasAcademia() {
  return (
    <>
      <Head>
        <title>¡Bienvenida a la Academia ADN 3.0! — Aida Qui</title>
        <meta
          name="description"
          content="Tu lugar en la Academia ADN 3.0 está confirmado. Únete al grupo privado para recibir toda la información de acceso."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <GraciasSectionAcademia />
      </main>
    </>
  );
}
