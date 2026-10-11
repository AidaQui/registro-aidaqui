import Head from "next/head";
import AnnouncementBar from "@/components/registro-v2/AnnouncementBar";
import HeroSectionMC from "@/components/registro-v2/HeroSectionMC";
import ClassContentSection from "@/components/registro-v2/ClassContentSection";
import AccessPassSection from "@/components/registro-v2/AccessPassSection";
import TestimonialsSection from "@/components/registro-v2/TestimonialsSection";
import AudienceSection from "@/components/registro-v2/AudienceSection";
import AboutAidaSection from "@/components/registro-v2/AboutAidaSection";
import ClosingSection from "@/components/registro-v2/ClosingSection";
import StarDivider from "@/components/registro-v2/StarDivider";
import { fuentesV2 } from "@/components/registro-v2/fuentes";

// Copia de /registro-v1 para la siguiente variante del test de promesas
// (misma estructura; cambian tipografía, paleta y algunos detalles). La
// clase "rv2" del <main> activa su bloque REGISTRO V2 en globals.css, así
// que /registro-v1 y /masterclass no se enteran de sus cambios.
export default function RegistroV2() {
  return (
    <>
      <Head>
        <title>Entrenamiento Práctico Gratuito — De la teoría espiritual a cambios reales | Aida Qui</title>
        <meta
          name="description"
          content="Entrenamiento práctico para llevar tus años de conocimiento espiritual a cambios reales en tus decisiones, tus relaciones y tu vida cotidiana. 17 de octubre, online por Zoom."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`rv2 ${fuentesV2}`}>
        <AnnouncementBar />
        <HeroSectionMC />
        <StarDivider />
        <ClassContentSection />
        {/* Pase y testimonios comparten un único fondo marrón: el fundido
            hacia la sección clara de abajo lo hace el final de testimonios. */}
        <div className="rv2-dark-band">
          <AccessPassSection />
          <TestimonialsSection />
        </div>
        <AudienceSection />
        <AboutAidaSection />
        <ClosingSection />
      </main>
    </>
  );
}
