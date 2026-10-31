import "@/styles/legacy.module.css";
import Head from "next/head";
import AnnouncementBar from "@/components/registro-v1/AnnouncementBar";
import HeroSectionMC from "@/components/registro-v1/HeroSectionMC";
import ClassContentSection from "@/components/registro-v1/ClassContentSection";
import AccessPassSection from "@/components/registro-v1/AccessPassSection";
import TestimonialsSection from "@/components/registro-v1/TestimonialsSection";
import AudienceSection from "@/components/registro-v1/AudienceSection";
import AboutAidaSection from "@/components/registro-v1/AboutAidaSection";
import ClosingSection from "@/components/registro-v1/ClosingSection";
import StarDivider from "@/components/registro-v1/StarDivider";

// Copia de /masterclass con otra promesa y la paleta de la terraza
// mediterránea. La clase "ent" del <main> es la que activa esa paleta en
// styles/legacy.module.css (bloque ENTRENAMIENTO), así que /masterclass no se entera.
export default function Entrenamiento() {
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
      <main className="ent">
        <AnnouncementBar />
        <HeroSectionMC />
        <StarDivider />
        <ClassContentSection />
        {/* Pase y testimonios comparten un único fondo marrón: el fundido
            hacia la sección clara de abajo lo hace el final de testimonios. */}
        <div className="ent-dark-band">
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
