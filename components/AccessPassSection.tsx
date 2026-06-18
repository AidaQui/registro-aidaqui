import { useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MAX_TILT = 9; // grados

export default function AccessPassSection() {
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
    <section ref={sectionRef} className="access-pass" aria-labelledby="access-pass-title">
      <div className="access-pass-bg" aria-hidden="true" />

      <div className="access-pass-shell">
        <p className="access-pass-eyebrow" data-reveal>Al final de esta Masterclass</p>
        <h2 id="access-pass-title" className="access-pass-title" data-reveal="title">
          Abriremos una oportunidad única para que formes parte de la{" "}
          <span className="access-pass-brand">Academia ADN 3.0</span>
        </h2>

        <div className="pass-stage" data-reveal>
          <div
            ref={ref}
            className="pass-card"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            {/* Banda lateral dorada */}
            <div className="pass-stub" aria-hidden="true">
              <span className="pass-stub-vertical">ACCESO EXCLUSIVO</span>
            </div>

            {/* Perforación entre stub y cuerpo */}
            <div className="pass-perf" aria-hidden="true" />

            {/* Cuerpo del carnet */}
            <div className="pass-body">
              <div className="pass-body-top">
                <img src="/favicon.png" alt="" className="pass-body-logo" />
                <span className="pass-status">
                  <ShieldCheck size={13} strokeWidth={2.2} aria-hidden="true" />
                  Reservado
                </span>
              </div>

              <div className="pass-tier">
                <p className="pass-tier-label">Tu acceso</p>
                <p className="pass-tier-value">Academia ADN 3.0</p>
              </div>

              <div className="pass-meta">
                <div className="pass-meta-item">
                  <p className="pass-meta-label">Nivel</p>
                  <p className="pass-meta-value">Transformación</p>
                </div>
                <div className="pass-meta-item">
                  <p className="pass-meta-label">Acceso</p>
                  <p className="pass-meta-value">Completo</p>
                </div>
                <div className="pass-meta-item">
                  <p className="pass-meta-label">Pase</p>
                  <p className="pass-meta-value">Nº 0001</p>
                </div>
              </div>

              {/* Código de barras decorativo, en SVG (sin imágenes) */}
              <div className="pass-barcode" aria-hidden="true">
                <svg viewBox="0 0 240 36" preserveAspectRatio="none" role="presentation">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const w = (i * 37) % 5 < 2 ? 2 : (i % 3 === 0 ? 4 : 1);
                    return (
                      <rect
                        key={i}
                        x={i * 5}
                        y={0}
                        width={w}
                        height={36}
                        fill="currentColor"
                      />
                    );
                  })}
                </svg>
                <span className="pass-barcode-code">ADN-3.0 · AIDA QUI</span>
              </div>
            </div>

            {/* Brillo que sigue al cursor */}
            <div className="pass-glare" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
