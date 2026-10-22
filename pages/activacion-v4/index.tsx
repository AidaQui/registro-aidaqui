import Head from "next/head";
import Av4Hero from "@/components/activacion-v4/Av4Hero";
import Av4Marquee from "@/components/activacion-v4/Av4Marquee";
import Av4Video from "@/components/activacion-v4/Av4Video";
import Av4Modulos from "@/components/activacion-v4/Av4Modulos";
import Av4Recibiras from "@/components/activacion-v4/Av4Recibiras";
import Av4Testimonios from "@/components/activacion-v4/Av4Testimonios";
import Av4Bio from "@/components/activacion-v4/Av4Bio";
import Av4Precio from "@/components/activacion-v4/Av4Precio";
import Av4Faq from "@/components/activacion-v4/Av4Faq";
import Av4Cierre from "@/components/activacion-v4/Av4Cierre";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

export default function ActivacionV4() {
  return (
    <>
      <Head>
        <title>Activación del Ser Multidimensional — Aida Qui</title>
        <meta
          name="description"
          content="Una preparación energética para aumentar tu capacidad de integrar y sostener mayores niveles de información y consciencia."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SmoothScroll />
      {/*
       * Orden de la referencia (DermaPro): hero · banda · vídeo ▾ carrusel
       * oscuro · cintas cruzadas · "lo que vas a recibir" ▾ oscuro (quién te
       * acompaña + precio) · banda · FAQ · CTA final y pie. Sin tarjeta de
       * garantía: /activacion no promete ninguna.
       */}
      <main className="av4">
        <Av4Hero />
        <Av4Marquee />
        <Av4Video />
        <Av4Modulos />
        <Av4Marquee variante="cruzada" />
        <Av4Recibiras />
        {/* Vacía mientras no haya testimonios de esta experiencia. */}
        <Av4Testimonios />
        <Av4Bio />
        <Av4Precio />
        <Av4Marquee />
        <Av4Faq />
        <Av4Cierre />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
