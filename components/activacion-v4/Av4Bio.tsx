import Image from "next/image";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Quién guía la experiencia (layout "Sobre sua mentora" de Tayná): etiqueta,
 * titular y biografía a la izquierda; collage de tres fotos con el sello a la
 * derecha. NO son testimonios: es la biografía de Aida (SobreAida de
 * /activacion).
 */
export default function Av4Bio() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-bio"
      aria-labelledby="av4-bio-title"
    >
      <div className="av4-wrap av4-bio__grid">
        <div className="av4-bio__copy">
          <span className="av4-pildora" data-reveal>
            Aida Qui
          </span>
          <h2
            id="av4-bio-title"
            className="av4-title av4-title--izq"
            data-reveal="title"
          >
            ¿Quién guiará <b>esta</b>{" "}
            <span className="av4-acento">experiencia</span>?
          </h2>

          <div className="av4-parrafos" data-reveal>
            <p>
              Aida Qui es una de las referentes más reconocidas en{" "}
              <strong>transformación energética</strong> y espiritualidad
              práctica en habla hispana.
            </p>
            <p>
              Es creadora de la <em>Academia ADN</em>, un movimiento y escuela
              de transformación diseñado para ayudar a las personas a elevar su
              consciencia, vivir desde una mayor coherencia y transformar todas
              las áreas de su vida.
            </p>
            <p>
              Durante años ha acompañado a miles de personas en procesos de
              transformación profunda, ayudándolas a cambiar su realidad{" "}
              <strong>desde la raíz</strong>: su energía, su identidad y la
              forma en la que habitan su vida.
            </p>
            <p>
              Su trabajo une espiritualidad práctica, maestría energética,
              sistema emocional y transformación profunda para ayudar a las
              personas a dejar atrás viejas versiones de sí mismas y comenzar a
              vivir desde una frecuencia más auténtica, consciente y alineada.
            </p>
          </div>
        </div>

        <div className="av4-collage" data-reveal="right">
          <div className="av4-collage__alta">
            <Image
              src="/activacion-v4/bio-1.jpg"
              alt="Aida Qui meditando en un sendero"
              fill
              sizes="(max-width: 900px) 45vw, 260px"
              className="av4-cover"
            />
          </div>
          <div className="av4-collage__a">
            <Image
              src="/activacion-v4/bio-2.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 200px"
              className="av4-cover"
            />
          </div>
          <div className="av4-collage__b">
            <Image
              src="/activacion-v4/bio-3.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 200px"
              className="av4-cover"
            />
          </div>
          <Av4Sello className="av4-collage__sello" size={110} />
        </div>
      </div>
    </section>
  );
}
