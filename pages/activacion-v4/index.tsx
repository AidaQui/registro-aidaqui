import Head from "next/head";
import Av4Hero from "@/components/activacion-v4/Av4Hero";
import Av4Marquee from "@/components/activacion-v4/Av4Marquee";
import Av4Reconocimiento from "@/components/activacion-v4/Av4Reconocimiento";
import Av4Experiencia from "@/components/activacion-v4/Av4Experiencia";
import Av4Recibiras from "@/components/activacion-v4/Av4Recibiras";
import Av4Octubre from "@/components/activacion-v4/Av4Octubre";
import Av4SobreAida from "@/components/activacion-v4/Av4SobreAida";
import Av4Testimonios from "@/components/activacion-v4/Av4Testimonios";
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
       * Ritmo: claro / oscuro alternados, unidos por una muesca en V.
       *
       *   hero (claro) · banda · reconocimiento (claro) ▾ experiencia (oscuro)
       *   · cintas cruzadas · recibirás (claro) ▾ octubre (oscuro) ▾ Aida
       *   (claro) ▾ precio (oscuro) · banda · FAQ (claro) ▾ cierre (oscuro)
       *
       * Mismo orden y copy que /activacion, con otra piel.
       */}
      <main className="av4">
        <Av4Hero />
        <Av4Marquee />
        <Av4Reconocimiento />
        <Av4Experiencia />
        <Av4Marquee variante="cruzada" />
        <Av4Recibiras />
        <Av4Octubre />
        <Av4SobreAida />
        {/* Vacía mientras no haya testimonios de esta experiencia: devuelve
            null y no deja hueco. */}
        <Av4Testimonios />
        <Av4Precio />
        <Av4Marquee />
        <Av4Faq />
        <Av4Cierre />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
