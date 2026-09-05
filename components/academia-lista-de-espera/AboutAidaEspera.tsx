import { useScrollReveal } from "@/hooks/useScrollReveal";
import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";

export default function AboutAidaEspera() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="aida-espera" aria-labelledby="aida-espera-name">
      <div className="aida-espera__bg" aria-hidden="true" />

      <div className="aida-espera__shell">
        <div className="aida-espera__media" data-reveal>
          <img
            src="/lista-de-espera/aida.png"
            alt="Aida Qui"
            width={870}
            height={1080}
            className="aida-espera__img"
          />
        </div>

        <div className="aida-espera__copy" data-reveal-group>
          <AcademiaBadge />

          <h2 id="aida-espera-name" className="aida-espera__name">
            Aida Qui
          </h2>

          <p className="aida-espera__lead">
            Referente en transformación energética y consciencia aplicada en{" "}
            <em>habla hispana</em>.
          </p>

          <div className="aida-espera__body">
            <p>
              Es creadora de la <strong>Academia ADN</strong>, un movimiento y
              escuela de transformación diseñado para ayudar a las personas a
              elevar su consciencia, transformar su realidad y vivir desde una
              mayor coherencia entre energía, identidad y vida.
            </p>
            <p>
              Durante años ha acompañado a miles de personas en procesos de
              transformación profunda, ayudándolas a cambiar su realidad desde
              la raíz: su energía, su identidad y la forma en la que habitan su
              vida.
            </p>
            <p>
              Su trabajo une espiritualidad práctica, energía, sistema
              emocional y transformación profunda para ayudar a las personas a
              dejar atrás viejas versiones de sí mismas y comenzar a vivir
              desde una frecuencia más auténtica, consciente y alineada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
