import Image from "next/image";
import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección oscura con tarjetas blancas al estilo de las de testimonios de la
 * referencia. NO son testimonios: es la biografía de Aida (SobreAida de
 * /activacion), un párrafo por tarjeta. Los testimonios reales siguen
 * pendientes (ver Av4Testimonios).
 */

const PARRAFOS = [
  <>
    Aida Qui es una de las referentes más reconocidas en{" "}
    <strong>transformación energética</strong> y espiritualidad práctica en
    habla hispana.
  </>,
  <>
    Es creadora de la <em>Academia ADN</em>, un movimiento y escuela de
    transformación diseñado para ayudar a las personas a elevar su
    consciencia, vivir desde una mayor coherencia y transformar todas las
    áreas de su vida.
  </>,
  <>
    Durante años ha acompañado a miles de personas en procesos de
    transformación profunda, ayudándolas a cambiar su realidad{" "}
    <strong>desde la raíz</strong>: su energía, su identidad y la forma en la
    que habitan su vida.
  </>,
  <>
    Su trabajo une espiritualidad práctica, maestría energética, sistema
    emocional y transformación profunda para ayudar a las personas a dejar
    atrás viejas versiones de sí mismas y comenzar a vivir desde una frecuencia
    más auténtica, consciente y alineada.
  </>,
];

export default function Av4Bio() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--oscuro av4-bio"
      aria-labelledby="av4-bio-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">Aida Qui</p>
          <h2 id="av4-bio-title" className="av4-title">
            ¿Quién guiará
            <br />
            <b>esta</b> <em className="av4-brand">experiencia</em>?
          </h2>
        </div>
      </div>

      <ul className="av4-bio__fila" data-reveal-group data-reveal-fade>
        {PARRAFOS.map((p, i) => (
          <li key={i} className="av4-bio__card">
            <span className="av4-bio__comillas" aria-hidden="true">
              <Quote size={13} strokeWidth={2.4} />
            </span>
            <p>{p}</p>
            <div className="av4-bio__firma">
              <Image
                src="/aida/quien-es-aida-v3.png"
                alt=""
                width={64}
                height={64}
                sizes="32px"
                className="av4-bio__avatar"
              />
              <span>Aida Qui</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
