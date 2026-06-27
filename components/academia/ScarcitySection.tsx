import { AlertCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const TOTAL_PLAZAS = 300;
const PLAZAS_RESTANTES = 42;
const PLAZAS_OCUPADAS = TOTAL_PLAZAS - PLAZAS_RESTANTES;
const PCT_OCUPADO = Math.round((PLAZAS_OCUPADAS / TOTAL_PLAZAS) * 100);

export default function ScarcitySection() {
  const ref = useScrollReveal<HTMLElement>();
  const remainingRef = useCountUp<HTMLSpanElement>(PLAZAS_RESTANTES);
  const pctRef = useCountUp<HTMLSpanElement>(PCT_OCUPADO);

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
          300 PLAZAS DISPONIBLES
        </h2>

        {/* Número gigante — el golpe de escasez */}
        <div className="scarcity-hero-number" data-reveal>
          <p className="scarcity-hero-label">SOLAMENTE QUEDAN</p>
          <div className="scarcity-count">
            <span className="scarcity-count__num" ref={remainingRef}>
              0
            </span>
            <span className="scarcity-count__unit">PLAZAS DISPONIBLES</span>
          </div>
        </div>

        {/* Barra de ocupación */}
        <div className="scarcity-progress-block" data-reveal>
          <div className="scarcity-progress-head">
            <span className="scarcity-progress-head__label">
              Ocupación actual
            </span>
            <span className="scarcity-progress-head__pct">
              <span ref={pctRef}>0</span>%
            </span>
          </div>
          <div
            className="scarcity-progress"
            role="progressbar"
            aria-valuenow={PCT_OCUPADO}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Plazas ocupadas"
          >
            <div
              className="scarcity-progress__fill"
              style={{ width: `${PCT_OCUPADO}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
