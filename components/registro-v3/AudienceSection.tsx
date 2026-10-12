import { RotateCcw, BookOpen, Signpost, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRevealLight } from "@/hooks/useRevealLight";

// Las cuatro frases tienen la misma forma: lo que la persona ya tiene, un
// "pero", y lo que todavía le falta. Esa distancia entre saber y hacer es la
// promesa de la v3, así que cada card de vidrio se parte en dos en el "pero":
// arriba, suave, lo que ya tienen; abajo, sobre un tinte salvia y en pino, lo
// que falta. Arriba, montado sobre el borde, un medallón con un ícono por
// rasgo (sin números: no son pasos, son rasgos).
const items = [
  {
    icon: RotateCcw,
    ya: "Llevan tiempo trabajando en sí mismas,",
    falta:
      "siguen encontrándose con los mismos bloqueos en sus relaciones, su dinero, su trabajo o sus decisiones.",
  },
  {
    icon: BookOpen,
    ya: "Conocen mucha teoría sobre espiritualidad,",
    falta: "en los momentos difíciles vuelven a reaccionar como antes.",
  },
  {
    icon: Signpost,
    ya: "Sienten que su forma de vivir ya no encaja con quienes son hoy,",
    falta: "no tienen claro qué cambiar ni por dónde empezar.",
  },
  {
    icon: Sparkles,
    ya: "Han vivido momentos de claridad y conexión,",
    falta: "les cuesta sostenerlos cuando vuelven a las exigencias del día a día.",
  },
];

export default function AudienceSection() {
  const ref = useScrollReveal<HTMLElement>();
  useRevealLight(ref);

  return (
    <section ref={ref} className="audience audience--rv3" aria-labelledby="audience-title">
      <div className="audience-bg" aria-hidden="true" />

      <div className="audience-shell">
        <h2 id="audience-title" className="audience-title" data-reveal="title">
          {/* "algo en común" va unido: en mobile "en común" quedaba sola abajo */}
          Las personas que más se benefician de esta experiencia suelen tener
          algo&nbsp;en&nbsp;común
        </h2>

        {/* GSAP sólo funde (data-reveal-fade): la subida la hace la
            animación de luz en CSS. Si GSAP también movía la card, dejaba un
            transform en línea que anulaba el levante del hover.
            Las tres partes van sueltas en el <li> (y no en un <p>) para
            alinearse por subgrid: así los "pero" de una fila quedan a la
            misma altura. Leídas en orden, forman la frase original. */}
        <ul className="rv3-glass-grid" data-reveal-group data-reveal-fade data-light-group>
          {items.map(({ icon: Icon, ya, falta }, i) => (
            <li key={i} className="rv3-glass-card">
              <span className="rv3-glass-card__icon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.6} />
              </span>
              <span className="rv3-glass-card__ya">{ya}</span>{" "}
              <span className="rv3-glass-card__pero"><span>pero</span></span>{" "}
              <span className="rv3-glass-card__falta">{falta}</span>
            </li>
          ))}
        </ul>

        <div className="audience-cta" data-reveal>
          <a href="#registro" className="pearl-btn pearl-btn--scroll">
            <div className="pearl-wrap">
              <p>
                <span className="pearl-label">Haz clic aquí para registrarte gratis</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
