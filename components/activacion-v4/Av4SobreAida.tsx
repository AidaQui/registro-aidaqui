import Image from "next/image";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Quién guía la experiencia. Mismo copy que SobreAida de /activacion. */
export default function Av4SobreAida() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-aida"
      aria-labelledby="av4-aida-title"
    >
      <div className="av4-shell av4-aida__grid">
        <div className="av4-aida__media" data-reveal="left">
          {/* Tamaño nativo 1070x1470. Foto limpia: la de /activacion trae marco y rótulo quemados que chocan con el marco dorado. */}
          <Image
            src="/aida/quien-es-aida-v3.png"
            alt="Aida Qui"
            width={1070}
            height={1470}
            sizes="(max-width: 900px) 80vw, 420px"
            quality={90}
            className="av4-aida__foto"
          />
        </div>

        <div className="av4-aida__copy">
          <p className="av4-eyebrow" data-reveal="right">
            ¿Quién guiará esta experiencia?
          </p>
          <h2 id="av4-aida-title" className="av4-title" data-reveal="title">
            <span className="av4-serif av4-acento">Aida Qui</span>
          </h2>

          <div className="av4-aida__body" data-reveal="right">
            <p className="av4-aida__entrada">
              Aida Qui es una de las referentes más reconocidas en
              transformación energética y espiritualidad práctica en habla
              hispana.
            </p>
            <p>
              Es creadora de la <em>Academia ADN</em>, un movimiento y escuela
              de transformación diseñado para ayudar a las personas a elevar su
              consciencia, vivir desde una mayor coherencia y transformar todas
              las áreas de su vida.
            </p>
            <p>
              Durante años ha acompañado a miles de personas en procesos de
              transformación profunda, ayudándolas a cambiar su realidad desde
              la raíz: su energía, su identidad y la forma en la que habitan su
              vida.
            </p>
            <p>
              Su trabajo une espiritualidad práctica, maestría energética,
              sistema emocional y transformación profunda para ayudar a las
              personas a dejar atrás viejas versiones de sí mismas y comenzar a
              vivir desde una frecuencia más auténtica, consciente y alineada.
            </p>
          </div>
        </div>
      </div>

      <Av4Notch tono="claro" />
    </section>
  );
}
