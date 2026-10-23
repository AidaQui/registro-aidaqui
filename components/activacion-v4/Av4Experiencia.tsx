import Image from "next/image";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { EVENTO } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Experiencia: texto y lista con borde dorado a la izquierda, y un portátil
 * con una diapositiva "EN DIRECTO" a la derecha. Copy literal del cliente.
 */

const PUNTOS = [
  "Reconectar con lo que de verdad deseas.",
  "Reconocer qué te está frenando.",
  "Conectar con tu corazón y tu poder interior.",
  "Dar una dirección concreta a lo que descubras.",
];

export default function Av4Experiencia() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-exp"
      aria-labelledby="av4-exp-title"
    >
      <div className="av4-wrap av4-dos">
        <div className="av4-dos__copy">
          <div data-reveal>
            <Av4Tag>La experiencia</Av4Tag>
          </div>
          <h2 id="av4-exp-title" className="av4-title av4-title--izq" data-reveal>
            Una experiencia energética para reconectar con la{" "}
            <span className="av4-oro">verdad de tu corazón</span>.
          </h2>
          <p className="av4-texto av4-texto--izq" data-reveal>
            Diseñada para ayudarte a reconocer lo que deseas de verdad,
            trabajar los miedos que te frenan y activar tu poder interior para
            crear una vida alineada con tu alma.
          </p>
          <p className="av4-lema" data-reveal>
            Escucha tu verdad. Recupera la confianza para vivirla.
          </p>

          <h3 className="av4-subtitulo" data-reveal>
            <span className="av4-oro">Lo que experimentarás</span> dentro
          </h3>
          <p className="av4-texto av4-texto--izq" data-reveal>
            A través de la meditación y una activación energética guiada:
          </p>

          <ul className="av4-borde" data-reveal-group data-reveal-fade>
            {PUNTOS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <p className="av4-texto av4-texto--izq" data-reveal>
            Llevaremos esa conexión a tu realidad: tus relaciones, tus
            proyectos y las decisiones que tienes delante para reconocer{" "}
            <strong>un siguiente paso</strong> y comprometerte contigo para
            darlo.
          </p>

          <div className="av4-cta-fila" data-reveal>
            <Av4Cta href="#av4-precio" />
          </div>
        </div>

        <div className="av4-portatil" data-reveal="right" aria-hidden="true">
          <div className="av4-portatil__marco">
            <div className="av4-portatil__pantalla">
              <Image
                src="/activacion-v4/experiencia.jpg"
                alt=""
                fill
                sizes="(max-width: 900px) 90vw, 560px"
                className="av4-cover"
              />
              <div className="av4-portatil__texto">
                <span className="av4-portatil__vivo">EN DIRECTO</span>
                <strong>
                  Activación
                  <br />
                  del Corazón
                </strong>
                <span className="av4-portatil__zoom">{EVENTO.formato}</span>
              </div>
              <Av4Sello className="av4-portatil__sello" size={64} />
            </div>
          </div>
          <div className="av4-portatil__base" />
        </div>
      </div>
    </section>
  );
}
