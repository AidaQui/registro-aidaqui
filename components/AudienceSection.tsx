import { Waves, Sun, TrendingUp, HeartHandshake } from "lucide-react";
import LearnCard, { type LearnItem } from "@/components/LearnCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const items: LearnItem[] = [
  {
    icon: <Waves size={26} strokeWidth={2} aria-hidden="true" />,
    variant: "violet",
    text: <>Sienten que están atravesando una transición profunda.</>,
  },
  {
    icon: <Sun size={26} strokeWidth={2} aria-hidden="true" />,
    variant: "violet",
    text: (
      <>
        Ya no quieren sobrevivir, sino aprender a vivir desde su verdadera
        esencia.
      </>
    ),
  },
  {
    icon: <TrendingUp size={26} strokeWidth={2} aria-hidden="true" />,
    variant: "violet",
    text: (
      <>
        Saben que están listas para el siguiente nivel de su evolución.
      </>
    ),
  },
  {
    icon: <HeartHandshake size={26} strokeWidth={2} aria-hidden="true" />,
    variant: "violet",
    text: (
      <>
        Quieren aportar al mundo desde el desarrollo de su potencial.
      </>
    ),
  },
];

export default function AudienceSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="audience" aria-labelledby="audience-title">
      <div className="audience-bg" aria-hidden="true" />

      <div className="audience-shell">
        <h2 id="audience-title" className="audience-title" data-reveal="title">
          Las personas que más se benefician de esta experiencia suelen tener
          algo en común
        </h2>

        <ul className="learn-grid learn-grid--2col" data-reveal-group data-reveal-fade>
          {items.map((item, i) => (
            <LearnCard key={i} item={item} />
          ))}
        </ul>

        <div className="audience-cta" data-reveal>
          <a href="#registro" className="pearl-btn">
            <div className="pearl-wrap">
              <p>
                <span aria-hidden="true">✧</span>
                <span aria-hidden="true">✦</span>
                Haz clic aquí para registrarte gratis
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
