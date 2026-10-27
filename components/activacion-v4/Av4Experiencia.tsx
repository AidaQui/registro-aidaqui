import { Heart, HeartCrack } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Macbook from "@/components/activacion-v4/Av4Macbook";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Experiencia: texto, MacBook, preguntas y lista de cambios. Copy literal. */

/** Dos preguntas en tarjetas: lo que guarda el corazón y lo que cuesta ignorarlo. */
const PREGUNTAS = [
  {
    icono: Heart,
    pregunta: (
      <>
        ¿Qué se guarda en <span className="av4-oro">tu corazón</span>?
      </>
    ),
    respuesta:
      "Lo que deseas de verdad, antes de que lo filtren el miedo y las expectativas de los demás. Las heridas que te hicieron cerrarte. Tu intuición. La sabiduría de tu alma.",
  },
  {
    icono: HeartCrack,
    pregunta: (
      <>
        ¿Qué pasa cuando vives <span className="av4-oro">desconectada</span> de él?
      </>
    ),
    respuesta:
      "Decides con la cabeza y te arrepientes con el cuerpo. Buscas aprobación fuera. Aguantas relaciones, trabajos y rutinas que ya no son tuyas.",
  },
];

const CAMBIOS = [
  ["Decisiones", "dejas de dar vueltas y eliges sin necesitar permiso."],
  ["Relaciones", "pones límites sin culpa y atraes vínculos que te nutren."],
  ["Trabajo y propósito", "reconoces tus dones y te atreves a compartirlos."],
  ["Dinero y abundancia", "te abres a recibir sin sentir que no lo mereces."],
  ["Cuerpo y energía", "sueltas la tensión de vivir en contra de ti."],
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
            Tu mente sabe lo que debería hacer. Tu corazón sabe{" "}
            <span className="av4-oro">lo que quieres de verdad</span>.
          </h2>
          <p className="av4-texto av4-texto--izq" data-reveal>
            El corazón no es solo un músculo. Tiene su propio sistema nervioso,
            con miles de neuronas, y envía constantemente información a tu
            cerebro. Por eso lo has sentido tantas veces: esa certeza en el
            pecho antes de que la mente encuentre las palabras.
          </p>
        </div>

        <div data-reveal="right">
          <Av4Macbook />
        </div>
      </div>

      <div className="av4-wrap av4-exp__lista">
        <div className="av4-exp__preguntas" data-reveal-group data-reveal-fade>
          {PREGUNTAS.map(({ icono: Icono, pregunta, respuesta }) => (
            <article key={respuesta} className="av4-pregunta">
              <span className="av4-pregunta__icono" aria-hidden="true">
                <Icono size={22} strokeWidth={1.8} />
              </span>
              <h3 className="av4-pregunta__titulo">{pregunta}</h3>
              <p>{respuesta}</p>
            </article>
          ))}
        </div>

        <h3 className="av4-subtitulo av4-exp__pregunta" data-reveal>
          ¿Qué cambia cuando te activas{" "}
          <span className="av4-oro">desde el corazón</span>?
        </h3>

        <ul className="av4-borde av4-exp__cambios" data-reveal-group data-reveal-fade>
          {CAMBIOS.map(([area, cambio]) => (
            <li key={area}>
              <span>
                <strong>{area}:</strong> {cambio}
              </span>
            </li>
          ))}
        </ul>

        <div className="av4-cta-fila av4-cta-fila--centro" data-reveal>
          <Av4Cta href="#av4-precio" />
        </div>
      </div>
    </section>
  );
}
