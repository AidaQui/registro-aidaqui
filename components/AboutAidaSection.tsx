import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutAidaSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="about-aida" aria-labelledby="about-aida-title">
      <div className="about-aida-bg" aria-hidden="true" />

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
            <a href="#registro" className="pearl-btn">
              <div className="pearl-wrap">
                <p>
                  <span aria-hidden="true">✧</span>
                  <span aria-hidden="true">✦</span>
                  Haz clic aquí para registrarte gratis
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
