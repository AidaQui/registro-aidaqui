import LearnCard from "@/components/registro-v2/LearnCard";
import { aprendizajes } from "@/components/registro-v2/contenido";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRevealLight } from "@/hooks/useRevealLight";

export default function ClassContentSection() {
  const ref = useScrollReveal<HTMLElement>();
  useRevealLight(ref);

  return (
    <section ref={ref} className="class-content" aria-labelledby="class-content-title">
      <div className="class-content-bg" aria-hidden="true" />

      <div className="class-content-shell">
        <h2 id="class-content-title" className="class-content-title" data-reveal="title">
          Un entrenamiento en el que comprenderás
        </h2>

        <ul className="learn-grid" data-reveal-group data-reveal-fade data-light-group>
          {aprendizajes.map(({ icon: Icon, text }, i) => (
            <LearnCard
              key={i}
              item={{
                icon: <Icon size={26} strokeWidth={2} aria-hidden="true" />,
                variant: "terra",
                text,
              }}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
