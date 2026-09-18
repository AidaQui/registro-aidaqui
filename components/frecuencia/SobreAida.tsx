import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function SobreAida() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="frec-aida" aria-labelledby="frec-aida-title">
      <div className="frec-shell frec-aida__shell">
        <div className="frec-aida__media" data-reveal>
          {/* Native size is 870x1068 */}
          <Image
            src="/lista-de-espera/aida.webp"
            alt="Aida Qui"
            width={870}
            height={1068}
            sizes="(max-width: 1023px) 80vw, 420px"
            quality={90}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <div className="frec-aida__copy">
          <p className="frec-aida__eyebrow" data-reveal>
            ¿Quién guiará esta experiencia?
          </p>

          <h2 id="frec-aida-title" className="frec-aida__name" data-reveal="title">
            AIDA QUI
          </h2>

          <div className="frec-aida__body" data-reveal>
            <p>
              Aida Qui es una de las referentes más reconocidas en transformación
              energética y espiritualidad práctica en habla hispana.
            </p>
            <p>
              Es creadora de la <em>Academia ADN</em>, un movimiento y escuela de
              transformación diseñado para ayudar a las personas a elevar su
              consciencia, vivir desde una mayor coherencia y transformar todas
              las áreas de su vida.
            </p>
            <p>
              Durante años ha acompañado a miles de personas en procesos de
              transformación profunda, ayudándolas a cambiar su realidad desde la
              raíz: su energía, su identidad y la forma en la que habitan su
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
    </section>
  );
}
