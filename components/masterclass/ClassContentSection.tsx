import { KeyRound, Layers, Footprints } from "lucide-react";
import LearnCard, { type LearnItem } from "@/components/masterclass/LearnCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const items: LearnItem[] = [
  {
    icon: <KeyRound size={26} strokeWidth={2} aria-hidden="true" />,
    variant: "violet",
    text: (
      <>
        Qué está bloqueando el acceso a tu verdadero potencial y por qué tener
        información no es suficiente para crear una transformación real.
      </>
    ),
  },
  {
    icon: <Layers size={26} strokeWidth={2} aria-hidden="true" />,
    variant: "violet",
    text: (
      <>
        Cómo construir la estructura interna necesaria para sostener una nueva
        energía, una nueva identidad y una nueva forma de vivir.
      </>
    ),
  },
  {
    icon: <Footprints size={26} strokeWidth={2} aria-hidden="true" />,
    variant: "violet",
    text: (
      <>
        Los 3 pasos para atravesar esta transición sin perderte en el ruido
        mental, las dudas o los patrones que te mantienen atrapado en la misma
        realidad.
      </>
    ),
  },
];

export default function ClassContentSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="class-content" aria-labelledby="class-content-title">
      <div className="class-content-bg" aria-hidden="true" />

      <div className="class-content-shell">
        <h2 id="class-content-title" className="class-content-title" data-reveal="title">
          Una única clase en la que aprenderás
        </h2>

        <ul className="learn-grid" data-reveal-group data-reveal-fade>
          {items.map((item, i) => (
            <LearnCard key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
