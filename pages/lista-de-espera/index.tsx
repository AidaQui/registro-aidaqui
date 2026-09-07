import { useCallback, useState } from "react";
import Head from "next/head";
import HeroSectionEspera from "@/components/academia-lista-de-espera/HeroSectionEspera";
import GapSection from "@/components/academia-lista-de-espera/GapSection";
import WaitlistBenefitsSection from "@/components/academia-lista-de-espera/WaitlistBenefitsSection";
import TestimonialsSection from "@/components/academia-lista-de-espera/TestimonialsSection";
import AboutAidaEspera from "@/components/academia-lista-de-espera/AboutAidaEspera";
import ClosingEspera from "@/components/academia-lista-de-espera/ClosingEspera";
import WaitlistModal from "@/components/academia-lista-de-espera/WaitlistModal";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

export default function AcademiaEspera() {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);

  return (
    <>
      <Head>
        <title>Lista de Espera — Academia ADN | Aida Qui</title>
        <meta
          name="description"
          content="El conocimiento abre puertas, pero en la integración está la transformación. Entra en la lista de espera de Academia ADN y accede antes, con condiciones exclusivas y un regalo de bienvenida."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SmoothScroll />
      <main>
        <HeroSectionEspera onOpenForm={openForm} />
        <GapSection />
        <WaitlistBenefitsSection onOpenForm={openForm} />
        <TestimonialsSection />
        <AboutAidaEspera />
        <ClosingEspera onOpenForm={openForm} />
      </main>
      <GradualBlur height="7rem" strength={2} divCount={6} />
      <WaitlistModal open={formOpen} onClose={closeForm} />
    </>
  );
}
