import Head from "next/head";
import HeroFrecuencia from "@/components/activacion/HeroFrecuencia";
import DolorSection from "@/components/activacion/DolorSection";
import ExperienciaSection from "@/components/activacion/ExperienciaSection";
import CambioSection, {
  CambioTexto,
} from "@/components/activacion/CambioSection";
import RecibirasSection from "@/components/activacion/RecibirasSection";
import SobreAida from "@/components/activacion/SobreAida";
import PrecioSection from "@/components/activacion/PrecioSection";
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
      <main>
        <HeroFrecuencia />
        <DolorSection />
        <ExperienciaSection />
        {/* La banda del amanecer y su desarrollo son una sola idea en dos
            secciones: la primera existe para que la fotografía se vea entera,
            y el texto continúa debajo sobre blanco. */}
        <CambioSection />
        <CambioTexto />
        <RecibirasSection />
        <SobreAida />
        <PrecioSection />
        <CierreFrecuencia />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
