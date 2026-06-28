import { AlertCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

// ⚠️ Cambiar este número manualmente cuando quieras actualizar las plazas
const PLAZAS_RESTANTES = 57;

const TOTAL = 250;
const PCT = Math.round(((TOTAL - PLAZAS_RESTANTES) / TOTAL) * 100);

export default function ScarcitySection() {
  const ref = useScrollReveal<HTMLElement>();
  const remainingRef = useCountUp<HTMLSpanElement>(PLAZAS_RESTANTES);
  const pctRef = useCountUp<HTMLSpanElement>(PCT);

  return (
    <section ref={ref} className="scarcity" aria-labelledby="scarcity-title">
      <div className="scarcity-bg" aria-hidden="true" />
      <div className="scarcity-orb scarcity-orb--gold" aria-hidden="true" />
      <div className="scarcity-orb scarcity-orb--violet" aria-hidden="true" />

      <div className="scarcity-shell">
        <p className="scarcity-eyebrow" data-reveal>
          <AlertCircle size={15} strokeWidth={2.2} aria-hidden="true" />
          Cupos limitados
        </p>

        <h2 id="scarcity-title" className="scarcity-title" data-reveal="title">
          250 ALUMNOS POR EDICIÓN — YA QUEDAN POCAS PLAZAS
        </h2>

        <div className="scarcity-hero-number" data-reveal>
          <p className="scarcity-hero-label">SOLAMENTE QUEDAN</p>
          <div className="scarcity-count">
            <span className="scarcity-count__num" ref={remainingRef}>
              {PLAZAS_RESTANTES}
            </span>
            <span className="scarcity-count__unit">PLAZAS DISPONIBLES</span>
          </div>
        </div>

        <div className="scarcity-progress-block" data-reveal>
          <div className="scarcity-progress-head">
            <span className="scarcity-progress-head__label">
              Ocupación actual
            </span>
            <span className="scarcity-progress-head__pct">
              <span ref={pctRef}>{PCT}</span>%
            </span>
          </div>
          <div
            className="scarcity-progress"
            role="progressbar"
            aria-valuenow={PCT}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Plazas ocupadas"
          >
            <div
              className="scarcity-progress__fill"
              style={{ width: `${PCT}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
