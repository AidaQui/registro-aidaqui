import Head from "next/head";
import HeroSection from "@/components/frecuencia/HeroSection";
import PainSection from "@/components/frecuencia/PainSection";
import Section3 from "@/components/frecuencia/Section3";
import Section4 from "@/components/frecuencia/Section4";
import Section5 from "@/components/frecuencia/Section5";
import Section6 from "@/components/frecuencia/Section6";
import FinalSection from "@/components/frecuencia/FinalSection";

export default function Home() {
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
      <main>
        <HeroSection />
        <PainSection />
        <Section3 />
        <Section4 />
        <div className="s4-s5-divider" aria-hidden="true" />
        <Section5 />
        <Section6 />
        <FinalSection />
      </main>
    </>
  );
}
