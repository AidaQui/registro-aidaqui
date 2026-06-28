import { useRef } from "react";
import { Sparkles, Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SupportCard from "@/components/academia/SupportCard";

const MAX_TILT = 7; // grados

export default function PricingTicketSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <section
      id="precio"
      ref={sectionRef}
      className="ticket-section"
      aria-labelledby="ticket-title"
    >
      <div className="ticket-bg" aria-hidden="true" />
      <div className="ticket-orb ticket-orb--gold" aria-hidden="true" />
      <div className="ticket-orb ticket-orb--violet" aria-hidden="true" />

      <div className="ticket-shell">
        <p className="ticket-eyebrow" data-reveal>
          <Sparkles size={15} strokeWidth={2.2} aria-hidden="true" />
          Tu acceso a la Academia
        </p>
        <h2 id="ticket-title" className="ticket-heading" data-reveal="title">
          Una inversión, una <em>transformación de por vida</em>
        </h2>

        <div className="ticket-stage" data-reveal>
          <div
            ref={ref}
            className="ticket-card"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            {/* Stub lateral dorado */}
            <div className="ticket-stub" aria-hidden="true">
              <span className="ticket-stub__label">ACADEMIA ADN 3.0</span>
              <div className="ticket-stub__barcode">
                <svg viewBox="0 0 36 200" preserveAspectRatio="none" role="presentation">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const h = (i * 37) % 5 < 2 ? 2 : i % 3 === 0 ? 4 : 1;
                    return (
                      <rect
                        key={i}
                        x={0}
                        y={i * 5}
                        width={36}
                        height={h}
                        fill="currentColor"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Perforación con dientes */}
            <div className="ticket-perf" aria-hidden="true" />

            {/* Cuerpo del ticket */}
            <div className="ticket-body">
              <div className="ticket-prices">
                <div className="ticket-price ticket-price--old">
                  <span className="ticket-price__label">PRECIO REAL</span>
                  <span className="ticket-price__amount">EUR 3.997</span>
                </div>

                <div className="ticket-price ticket-price--new">
                  <span className="ticket-price__label">PRECIO LANZAMIENTO</span>
                  <span className="ticket-price__amount">EUR 369</span>
                </div>
              </div>

              <div className="ticket-note">
                <p className="ticket-note__title">Este programa es único:</p>
                <p className="ticket-note__body">
                  Es la última vez que se hará en directo, por eso queremos darte
                  la facilidad de que accedas ahora facilitándole el pago del
                  programa en{" "}
                  <strong>2 cuotas de 197$</strong>
                </p>
              </div>

              <div className="ticket-actions">
                <a href="https://buy.stripe.com/aFa28j4081eK1MK9MK2400H" className="ticket-cta ticket-cta--solid" target="_blank" rel="noopener noreferrer">
                  <span className="ticket-cta__main">QUIERO SER PARTE</span>
                  <span className="ticket-cta__sub">
                    <Check size={14} strokeWidth={2.6} aria-hidden="true" />
                    PAGO ÚNICO — EUR 369
                  </span>
                </a>
                <a href="https://buy.stripe.com/14AeV50NW6z47749MK2400I" className="ticket-cta ticket-cta--ghost" target="_blank" rel="noopener noreferrer">
                  <span className="ticket-cta__main">QUIERO SER PARTE</span>
                  <span className="ticket-cta__sub">2 PAGOS DE EUR 197</span>
                </a>
              </div>
            </div>

            {/* Brillo que sigue al cursor */}
            <div className="ticket-glare" aria-hidden="true" />
          </div>
        </div>

        {/* Card de soporte */}
        <div data-reveal>
          <SupportCard />
        </div>
      </div>
    </section>
  );
}
