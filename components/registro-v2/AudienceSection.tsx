import { RotateCcw, BookOpen, Signpost, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRevealLight } from "@/hooks/useRevealLight";

// Estas cards ya no usan LearnCard: la sección de arriba ("Un entrenamiento
// en el que comprenderás") tiene las mismas, y repetirlas hacía que las dos
// secciones se leyeran como una sola. Aquí van en vidrio esmerilado, más
// sobrias, con numeración para darles un aire más formal.
const items = [
  {
    icon: RotateCcw,
    text: (
      <>
        Llevan tiempo trabajando en sí mismas, pero siguen encontrándose con los
        mismos bloqueos en sus relaciones, su dinero, su trabajo o sus
        decisiones.
      </>
    ),
  },
  {
    icon: BookOpen,
    text: (
      <>
        Conocen mucha teoría sobre espiritualidad, pero en los momentos
        difíciles vuelven a reaccionar como antes.
      </>
    ),
  },
  {
    icon: Signpost,
    text: (
      <>
        Sienten que su forma de vivir ya no encaja con quienes son hoy, pero no
        tienen claro qué cambiar ni por dónde empezar.
      </>
    ),
  },
  {
    icon: Sparkles,
    text: (
      <>
        Han vivido momentos de claridad y conexión, pero les cuesta sostenerlos
        cuando vuelven a las exigencias del día a día.
      </>
    ),
  },
];

export default function AudienceSection() {
  const ref = useScrollReveal<HTMLElement>();
  useRevealLight(ref);

  return (
    <section ref={ref} className="audience audience--ent" aria-labelledby="audience-title">
      <div className="audience-bg" aria-hidden="true" />

      <div className="audience-shell">
        <h2 id="audience-title" className="audience-title" data-reveal="title">
          Las personas que más se benefician de esta experiencia suelen tener
          algo en común
        </h2>

        {/* GSAP sólo funde (data-reveal-fade): la subida la hace la
            animación de luz en CSS. Si GSAP también movía la card, dejaba un
            transform en línea que anulaba el levante del hover. */}
        <ul className="ent-glass-grid" data-reveal-group data-reveal-fade data-light-group>
          {items.map(({ icon: Icon, text }, i) => (
            <li key={i} className="ent-glass-card">
              <div className="ent-glass-card__head">
                <span className="ent-glass-card__icon">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="ent-glass-card__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="ent-glass-card__text">{text}</p>
            </li>
          ))}
        </ul>

        <div className="audience-cta" data-reveal>
          <a href="#registro" className="pearl-btn pearl-btn--scroll">
            <div className="pearl-wrap">
              <p>
                <span className="pearl-star" aria-hidden="true">✦</span>
                <span className="pearl-label">Haz clic aquí para registrarte gratis</span>
                <span className="pearl-star" aria-hidden="true">✦</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
