import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Macbook from "@/components/activacion-v4/Av4Macbook";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Experiencia: texto, MacBook y lista con iconos. Copy literal. */

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
      className="av4-sec av4-sec--oscuro av4-exp"
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
        </div>

        <div data-reveal="right">
          <Av4Macbook />
        </div>
      </div>

      <div className="av4-wrap av4-exp__lista">
        <h3 className="av4-subtitulo" data-reveal>
          Lo que <span className="av4-oro">experimentarás</span> dentro
        </h3>
        <p className="av4-texto" data-reveal>
          A través de la meditación y una activación energética guiada:
        </p>

        <ul className="av4-borde av4-borde--grid" data-reveal-group data-reveal-fade>
          {PUNTOS.map((t) => (
            <li key={t}>
              {t}
            </li>
          ))}
        </ul>

        <p className="av4-texto" data-reveal>
          Llevaremos esa conexión a tu realidad: tus relaciones, tus proyectos
          y las decisiones que tienes delante para reconocer{" "}
          <strong>un siguiente paso</strong> y comprometerte contigo para darlo.
        </p>

        <div className="av4-cta-fila av4-cta-fila--centro" data-reveal>
          <Av4Cta href="#av4-precio" />
        </div>
      </div>
    </section>
  );
}
