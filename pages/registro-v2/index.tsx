import "@/styles/legacy.module.css";
import Head from "next/head";
import AnnouncementBar from "@/components/registro-v2/AnnouncementBar";
import HeroSectionMC from "@/components/registro-v2/HeroSectionMC";
import ForYouSection from "@/components/registro-v2/ForYouSection";
import ClassContentSection from "@/components/registro-v2/ClassContentSection";
import AudienceSection from "@/components/registro-v2/AudienceSection";
import AboutAidaSection from "@/components/registro-v2/AboutAidaSection";
import ClosingSection from "@/components/registro-v2/ClosingSection";
import StarDivider from "@/components/registro-v2/StarDivider";
import { fuentesV2 } from "@/components/registro-v2/fuentes";

// Copia de /registro-v1 para la siguiente variante del test de promesas
// (misma estructura; cambian tipografía, paleta y algunos detalles). La
// clase "rv2" del <main> activa su bloque REGISTRO V2 en styles/legacy.module.css, así
// que /registro-v1 y /masterclass no se enteran de sus cambios.
export default function RegistroV2() {
  return (
    <>
      <Head>
        <title>Entrenamiento Práctico Gratuito — 3 horas para llevar a la práctica años de trabajo interior | Aida Qui</title>
        <meta
          name="description"
          content="3 horas para que lo que ya sabes sobre tus miedos, heridas y patrones empiece a cambiar cómo decides y cómo te relacionas. Entrenamiento práctico y gratuito, 17 de octubre, online por Zoom."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`rv2 ${fuentesV2}`}>
        <AnnouncementBar />
        <HeroSectionMC />
        <StarDivider />
        <ForYouSection />
        <ClassContentSection />
        <StarDivider />
        <AudienceSection />
        <AboutAidaSection />
        <ClosingSection />
      </main>
    </>
  );
}
