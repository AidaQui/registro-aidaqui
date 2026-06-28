import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const images = [
  "/testimonios/testimonio-01.webp",
  "/testimonios/testimonio-02.webp",
  "/testimonios/testimonio-03.webp",
  "/testimonios/testimonio-04.png",
  "/testimonios/testimonio-05.png",
  "/testimonios/testimonio-06.jpg",
  "/testimonios/testimonio-07.jpg",
  "/testimonios/testimonio-08.webp",
  "/testimonios/testimonio-09.webp",
  "/testimonios/testimonio-10.png",
  "/testimonios/testimonio-11.webp",
  "/testimonios/testimonio-12.png",
  "/testimonios/testimonio-13.jpg",
  "/testimonios/testimonio-14.png",
  "/testimonios/testimonio-15.webp",
  "/testimonios/testimonio-16.webp",
  "/testimonios/testimonio-17.png",
  "/testimonios/testimonio-18.webp",
  "/testimonios/testimonio-19.jpg",
  "/testimonios/testimonio-20.webp",
  "/testimonios/testimonio-21.webp",
  "/testimonios/testimonio-22.jpg",
  "/testimonios/testimonio-23.webp",
  "/testimonios/testimonio-24.webp",
  "/testimonios/testimonio-25.webp",
  "/testimonios/testimonio-26.jpg",
];

// Cuántos slides a cada lado del activo se muestran (el resto se oculta)
const VISIBLE_SIDE = 2;
// Cuántos slides a cada lado se precargan aunque estén ocultos
const PRELOAD_SIDE = 3;

export default function TestimonialsSection() {
  const ref = useScrollReveal<HTMLElement>();
  const [active, setActive] = useState(0);
  const total = images.length;

  function go(dir: -1 | 1) {
    setActive((prev) => (prev + dir + total) % total);
  }

  return (
    <section ref={ref} className="testi" aria-labelledby="testi-title">
      <div className="testi-bg" aria-hidden="true" />

      <div className="testi-shell">
        <h2 id="testi-title" className="testi-title" data-reveal="title">
          LO QUE DICEN ALGUNAS PERSONAS SOBRE LA{" "}
          <em>PRIMERA y SEGUNDA EDICIÓN</em>
        </h2>

        <div className="testi-stage" data-reveal>
          <div className="testi-track">
            {images.map((src, i) => {
              // Distancia circular más corta entre este slide y el activo
              let offset = i - active;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const abs = Math.abs(offset);
              const hidden = abs > VISIBLE_SIDE;

              // Pasos acumulados (con tope) y dirección. El tamaño del paso lateral
              // lo define --testi-step en CSS, así es responsive (menor en mobile).
              const steps = Math.sign(offset) * Math.min(abs, VISIBLE_SIDE);
              const scale = offset === 0 ? 1 : 0.84;

              const style: React.CSSProperties = {
                transform: `translate(-50%, -50%) translateX(calc(${steps} * var(--testi-step))) translateZ(${
                  -abs * 160
                }px) rotateY(${offset * -34}deg) scale(${scale})`,
                zIndex: total - abs,
                opacity: hidden ? 0 : 1,
                visibility: hidden ? "hidden" : "visible",
                pointerEvents: offset === 0 ? "auto" : "none",
              };

              const shouldRenderImg = abs <= PRELOAD_SIDE;

              return (
                <figure
                  key={src}
                  className={`testi-slide${offset === 0 ? " is-active" : ""}${shouldRenderImg ? " img-loaded" : ""}`}
                  style={style}
                  aria-hidden={offset !== 0}
                >
                  {shouldRenderImg && (
                    <img
                      src={src}
                      alt={`Testimonio ${i + 1} sobre la Academia ADN`}
                      loading={abs <= 1 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  )}
                </figure>
              );
            })}
          </div>

          {/* Flechas — mismo estilo que la landing de activación */}
          <div className="testi-nav" aria-label="Navegación de testimonios">
            <button
              className="s4-nav__btn"
              type="button"
              aria-label="Anterior"
              onClick={() => go(-1)}
            >
              <div className="s4-nav__outline" />
              <div className="s4-nav__face">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
            <button
              className="s4-nav__btn"
              type="button"
              aria-label="Siguiente"
              onClick={() => go(1)}
            >
              <div className="s4-nav__outline" />
              <div className="s4-nav__face">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>

          <p className="testi-hint">Desliza para ver más testimonios</p>
        </div>
      </div>
    </section>
  );
}
