import { useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { gsap } from "gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useScarcityCounter } from "@/hooks/useScarcityCounter";
import ScarcityToast from "@/components/academia/ScarcityToast";

export default function ScarcitySection() {
  const ref = useScrollReveal<HTMLElement>();
  const { seats, total, pct, active } = useScarcityCounter();

  // Initial scroll-triggered count-up (fires once on scroll-in)
  const remainingRef = useCountUp<HTMLSpanElement>(seats);
  const pctRef = useCountUp<HTMLSpanElement>(pct);

  // When the live counter changes, tween the displayed number smoothly
  const liveSeatsRef = useRef(seats);
  const livePctRef = useRef(pct);

  useEffect(() => {
    if (!active) return;
    const el = remainingRef.current;
    if (!el) return;
    const obj = { v: liveSeatsRef.current };
    gsap.to(obj, {
      v: seats,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
    });
    liveSeatsRef.current = seats;
  }, [seats, active, remainingRef]);

  useEffect(() => {
    if (!active) return;
    const el = pctRef.current;
    if (!el) return;
    const obj = { v: livePctRef.current };
    gsap.to(obj, {
      v: pct,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
    });
    livePctRef.current = pct;
  }, [pct, active, pctRef]);

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
              {seats}
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
              <span ref={pctRef}>{pct}</span>%
            </span>
          </div>
          <div
            className="scarcity-progress"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Plazas ocupadas"
          >
            <div
              className="scarcity-progress__fill"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <ScarcityToast currentSeats={seats} active={active} />
    </section>
  );
}
