import Head from "next/head";
import HeroSectionADN from "@/components/academia/HeroSectionADN";
import ScarcitySection from "@/components/academia/ScarcitySection";
import PricingTicketSection from "@/components/academia/PricingTicketSection";
import IncludedSection from "@/components/academia/IncludedSection";
import TransformationSection from "@/components/academia/TransformationSection";
import TestimonialsSection from "@/components/academia/TestimonialsSection";
import VideoTestimonialsSection from "@/components/academia/VideoTestimonialsSection";
import ClosingSupport from "@/components/academia/ClosingSupport";

export default function Academia() {
  return (
    <>
      <Head>
        <title>Academia ADN 3.0 — Alineamiento Divino Natural | Aida Qui</title>
        <meta
          name="description"
          content="6 semanas para ordenar tu energía y crear resultados reales. Un entrenamiento experiencial para integrar tu espiritualidad y sostener coherencia en salud, relaciones, propósito y abundancia."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <HeroSectionADN />
        <ScarcitySection />
        <PricingTicketSection />
        <IncludedSection />
        <TransformationSection />
        <TestimonialsSection />
        <VideoTestimonialsSection />
        <ClosingSupport />
      </main>
    </>
  );
}
