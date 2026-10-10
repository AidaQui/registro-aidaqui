import Head from "next/head";
import HeroSectionMC from "@/components/registro-v2/HeroSectionMC";
import ClassContentSection from "@/components/registro-v2/ClassContentSection";
import AccessPassSection from "@/components/registro-v2/AccessPassSection";
import AudienceSection from "@/components/registro-v2/AudienceSection";
import AboutAidaSection from "@/components/registro-v2/AboutAidaSection";
import ClosingSection from "@/components/registro-v2/ClosingSection";
import FloatingWhatsApp from "@/components/registro-v2/FloatingWhatsApp";
import StarDivider from "@/components/registro-v2/StarDivider";

// Copia de /masterclass con otra promesa y la paleta de la terraza
// mediterránea. La clase "ent" del <main> es la que activa esa paleta en
// globals.css (bloque ENTRENAMIENTO), así que /masterclass no se entera.
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
        <HeroSectionMC />
        <StarDivider />
        <ClassContentSection />
        <AccessPassSection />
        <AudienceSection />
        <AboutAidaSection />
        <ClosingSection />
        <FloatingWhatsApp />
      </main>
    </>
  );
}
