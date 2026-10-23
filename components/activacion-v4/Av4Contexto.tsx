import Av4Marco from "@/components/activacion-v4/Av4Marco";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Contexto (layout "O método" de Tayná). Copy literal del cliente. */

const LINEAS = [
  "Relaciones que necesitan una nueva forma.",
  "Prioridades que han cambiado.",
  "Deseos que vuelven con fuerza.",
  "Una necesidad cada vez más profunda de vivir con verdad.",
];

export default function Av4Contexto() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-ctx"
      aria-labelledby="av4-contexto-title"
    >
      <div className="av4-wrap av4-ctx__grid">
        <div className="av4-ctx__copy">
          <span className="av4-pildora" data-reveal>
            Este momento
          </span>
          <h2
            id="av4-contexto-title"
            className="av4-title av4-title--izq"
            data-reveal="title"
          >
            <b>En medio de tanto cambio</b>, volver a tu{" "}
            <span className="av4-sel">
              <span className="av4-sel__texto">corazón</span>
            </span>{" "}
            <span className="av4-acento">cobra un nuevo sentido</span>.
          </h2>

          <div className="av4-parrafos" data-reveal>
            <p>
              Vivimos un momento de mucho ruido, información y cambios. Hay
              opiniones sobre todo: cómo deberías vivir, qué deberías conseguir
              y quién deberías ser.
            </p>
            <p>
              <strong>
                Y entre tantas voces, puedes terminar alejándote de la tuya.
              </strong>
            </p>
            <p>
              Desde mi forma de sentir este momento planetario, estamos siendo
              llamados a revisar las estructuras desde las que vivimos: lo que
              sostenemos por miedo, lo que elegimos por costumbre y lo que ya
              no se corresponde con quienes somos.
            </p>
            <p>Quizá también lo estás sintiendo.</p>
          </div>

          <ul className="av4-lineas" data-reveal-group data-reveal-fade>
            {LINEAS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <p className="av4-texto av4-texto--izq" data-reveal>
            Volver al corazón es parte de esa transformación:{" "}
            <strong>recuperar una guía interior</strong> desde la que elegir con
            más consciencia lo que queremos crear, individualmente y como
            comunidad.
          </p>
        </div>

        <div data-reveal="right">
          <Av4Marco
            src="/activacion-v4/contexto.jpg"
            alt="Aida Qui meditando"
            sizes="(max-width: 900px) 80vw, 480px"
            bloque="sup-der"
            proporcion="3 / 4"
          />
        </div>
      </div>
    </section>
  );
}
