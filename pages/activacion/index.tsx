import Head from "next/head";
import HeroFrecuencia from "@/components/activacion/HeroFrecuencia";
import IdentificacionSection from "@/components/activacion/IdentificacionSection";
import DolorSection from "@/components/activacion/DolorSection";
import ExperienciaSection from "@/components/activacion/ExperienciaSection";
import RecibirasSection from "@/components/activacion/RecibirasSection";
import OctubreSection from "@/components/activacion/OctubreSection";
import SobreAida from "@/components/activacion/SobreAida";
import TestimoniosSection from "@/components/activacion/TestimoniosSection";
import PrecioSection from "@/components/activacion/PrecioSection";
import FaqSection from "@/components/activacion/FaqSection";
import CierreFrecuencia from "@/components/activacion/CierreFrecuencia";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

export default function Frecuencia() {
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
       * EL ORDEN ES EL ARGUMENTO.
       *
       * La página recibe tráfico frío, así que va de lo que la persona ya
       * siente a lo que le ofrecemos, y no al revés:
       *
       *   reconocimiento → identificación → explicación → mecanismo →
       *   experiencia → el 10/10 → confianza → oferta.
       *
       * Antes arrancaba en las cuatro dimensiones y el marco espiritual, que
       * dan por supuesto un contexto que quien llega por primera vez no
       * tiene. Ahora eso llega cuando ya hay una pregunta propia que
       * responder.
       *
       * CambioSection y CambioTexto salieron del render. Eran el bloque largo
       * sobre consciencia planetaria, y OctubreSection dice lo concreto que
       * ese bloque rodeaba: qué pasa en octubre y por qué el encuentro es el
       * 10. Los archivos siguen en el repo por si hay frases que rescatar.
       */}
      <main>
        <HeroFrecuencia />
        <IdentificacionSection />
        <DolorSection />
        <ExperienciaSection />
        <RecibirasSection />
        <OctubreSection />
        <SobreAida />
        {/* Vacía mientras no haya testimonios de esta experiencia: el
            componente devuelve null y no deja hueco. */}
        <TestimoniosSection />
        <PrecioSection />
        <FaqSection />
        <CierreFrecuencia />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
