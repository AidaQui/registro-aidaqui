import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MAX_TILT = 10; // grados

export default function AboutAidaSection() {
  const ref = useScrollReveal<HTMLElement>();
  const frameRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = frameRef.current;
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
    const el = frameRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <section ref={ref} className="about-aida" aria-labelledby="about-aida-title">
      <div className="about-aida-shell">
        <div className="about-aida-copy" data-reveal-group>
          <h2 id="about-aida-title" className="about-aida-eyebrow">
            ¿Quién es Aida Qui?
          </h2>

          <p className="about-aida-text">
            Aida Qui es una de las referentes más reconocidas en transformación
            energética y consciencia aplicada en habla hispana.
          </p>
          <p className="about-aida-text">
            Es creadora de la <strong>Academia ADN</strong>, un movimiento y
            escuela de transformación diseñado para ayudar a las personas a
            elevar su consciencia, transformar su realidad y vivir desde una
            mayor coherencia entre energía, identidad y vida.
          </p>
          <p className="about-aida-text">
            Durante años ha acompañado a miles de personas en procesos de
            transformación profunda, ayudándolas a cambiar su realidad desde la
            raíz: su energía, su identidad y la forma en la que habitan su vida.
          </p>
          <p className="about-aida-text">
            Su trabajo une espiritualidad práctica, energía, sistema emocional y
            transformación profunda para ayudar a las personas a dejar atrás
            viejas versiones de sí mismas y comenzar a vivir desde una frecuencia
            más auténtica, consciente y alineada.
          </p>
          <p className="about-aida-text">
            Más que enseñar espiritualidad, Aida guía procesos de integración y
            transformación profunda que ayudan a las personas a cambiar su
            energía, su realidad y todas las áreas de su vida.
          </p>

          <div className="about-aida-cta">
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

        <div className="about-aida-media">
          <div
            ref={frameRef}
            className="aida-frame"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <div className="aida-frame__glow" aria-hidden="true" />
            <div className="aida-frame__inner">
              <Image
                src="/masterclass/aida-foto-.png"
                alt="Aida Qui"
                width={520}
                height={620}
                className="aida-frame__img"
                priority
              />
              <div className="aida-frame__shine" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
