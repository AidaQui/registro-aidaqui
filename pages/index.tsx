import Head from "next/head";
import HeroSectionMC from "@/components/HeroSectionMC";
import ClassContentSection from "@/components/ClassContentSection";
import AccessPassSection from "@/components/AccessPassSection";
import AudienceSection from "@/components/AudienceSection";
import AboutAidaSection from "@/components/AboutAidaSection";
import ClosingSection from "@/components/ClosingSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Masterclass Gratuita — Los 3 pasos para acceder a tu potencial | Aida Qui</title>
        <meta
          name="description"
          content="Aprende a sostener la energía, la claridad y la confianza necesarias para convertir tu potencial en tu nueva realidad. Masterclass gratuita online por Zoom."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <HeroSectionMC />
        <ClassContentSection />
        <AccessPassSection />
        <AudienceSection />
        <AboutAidaSection />
        <ClosingSection />
      </main>
    </>
  );
}
