import Head from "next/head";
import HeroFrecuencia from "@/components/frecuencia/HeroFrecuencia";
import DolorSection from "@/components/frecuencia/DolorSection";
import ExperienciaSection from "@/components/frecuencia/ExperienciaSection";
import RecibirasSection from "@/components/frecuencia/RecibirasSection";
import SobreAida from "@/components/frecuencia/SobreAida";
import CierreFrecuencia from "@/components/frecuencia/CierreFrecuencia";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

export default function Frecuencia() {
  return (
    <>
      <Head>
        <title>Activación de la Frecuencia Original — Aida Qui</title>
        <meta
          name="description"
          content="Una experiencia profunda diseñada para liberar bloqueos energéticos, reconectar con tu intuición y volver a sentirte alineada contigo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SmoothScroll />
      <main>
        <HeroFrecuencia />
        <DolorSection />
        <ExperienciaSection />
        <RecibirasSection />
        <SobreAida />
        <CierreFrecuencia />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
