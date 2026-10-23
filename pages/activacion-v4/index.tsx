import Head from "next/head";
import Av4Hero from "@/components/activacion-v4/Av4Hero";
import Av4Marquee from "@/components/activacion-v4/Av4Marquee";
import Av4Identificacion from "@/components/activacion-v4/Av4Identificacion";
import Av4Modulos from "@/components/activacion-v4/Av4Modulos";
import Av4Contexto from "@/components/activacion-v4/Av4Contexto";
import Av4Precio from "@/components/activacion-v4/Av4Precio";
import Av4Bio from "@/components/activacion-v4/Av4Bio";
import Av4Momento from "@/components/activacion-v4/Av4Momento";
import Av4Cierre from "@/components/activacion-v4/Av4Cierre";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

export default function ActivacionV4() {
  return (
    <>
      <Head>
        <title>Activación del Corazón y el Poder Interior — Aida Qui</title>
        <meta
          name="description"
          content="Una experiencia guiada en directo para reconectar con la verdad de tu corazón, reconocer los miedos que te frenan y activar tu poder interior para empezar a crear una vida que ames todos los días."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SmoothScroll />
      {/*
       * Orden: hero · banda · identificación ▾ experiencia (oscura) · cintas
       * cruzadas · contexto ▾ precio y quién guiará (oscuras) · banda · es
       * momento ▾ tarjeta final (oscura) · pie. Sin vídeo, sin FAQ y sin
       * testimonios: el copy de esta edición no los incluye.
       */}
      <main className="av4">
        <Av4Hero />
        <Av4Marquee />
        <Av4Identificacion />
        <Av4Modulos />
        <Av4Marquee variante="cruzada" />
        <Av4Contexto />
        <Av4Precio />
        <Av4Bio />
        <Av4Marquee />
        <Av4Momento />
        <Av4Cierre />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
