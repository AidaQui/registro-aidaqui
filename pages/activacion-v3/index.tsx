import Head from "next/head";
import HeroSection from "@/components/activacion-v3/HeroSection";
import PainSection from "@/components/activacion-v3/PainSection";
import Section4 from "@/components/activacion-v3/Section4";
import Section5 from "@/components/activacion-v3/Section5";
import Section6 from "@/components/activacion-v3/Section6";
import FinalSection from "@/components/activacion-v3/FinalSection";

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
        {/* El vídeo de venta vivía aquí en su propia sección y ahora va dentro
            del hero, junto a la promesa, así que Section3 sale de la página. */}
        <HeroSection />
        <PainSection />
        <Section4 />
        <div className="s4-s5-divider" aria-hidden="true" />
        <Section5 />
        <Section6 />
        <FinalSection />
      </main>
    </>
  );
}
