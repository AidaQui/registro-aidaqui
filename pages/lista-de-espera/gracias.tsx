import Head from "next/head";
import GraciasSectionEspera from "@/components/academia-lista-de-espera/GraciasSectionEspera";

export default function GraciasAcademiaEspera() {
  return (
    <>
      <Head>
        <title>¡Estás en la lista! | Aida Qui</title>
        <meta
          name="description"
          content="Ya estás en la lista de espera de la próxima Academia ADN. Te avisaremos en cuanto abramos las plazas."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <GraciasSectionEspera />
      </main>
    </>
  );
}
