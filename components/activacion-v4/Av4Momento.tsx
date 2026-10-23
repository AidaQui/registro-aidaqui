import { CircleCheck } from "lucide-react";
import Av4Monograma from "@/components/activacion-v4/Av4Monograma";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** "Es momento": sección clara con las cuatro intenciones y el cierre grande. */

const INTENCIONES = [
  "Que puedas escucharte con más honestidad.",
  "Que reconozcas dónde estás eligiendo por miedo, por costumbre o por la necesidad de aprobación.",
  "Que vuelvas a dar valor a tus deseos y encuentres un paso concreto para empezar a honrarlos.",
  "Y que recuperes tu poder para sostener lo que sabes que es verdad para ti: tomar esa decisión, expresar lo que necesitas y dar forma a la vida que de verdad quieres vivir.",
];

export default function Av4Momento() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-momento"
      aria-labelledby="av4-momento-title"
    >
      <Av4Monograma variante="momento" />

      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">Es momento</p>
          <h2 id="av4-momento-title" className="av4-title">
            <b>Es momento de darle a lo que sientes</b>{" "}
            <em className="av4-brand">un lugar en la vida que estás creando</em>.
          </h2>
        </div>

        <div className="av4-parrafos av4-parrafos--centro" data-reveal>
          <p>Quizá llevas tiempo esperando a sentirte completamente preparada.</p>
          <p>
            A tener más seguridad. A que desaparezca el miedo. A que los demás
            entiendan lo que quieres hacer.
          </p>
          <p>
            Puedes empezar hoy por <strong>escucharte con honestidad</strong> y
            reconocer qué decisión estás dejando en manos de esa espera.
          </p>
        </div>

        <h3 className="av4-subtitle av4-subtitle--claro" data-reveal>
          Mi intención para este encuentro es:
        </h3>

        <ul className="av4-intenciones" data-reveal-group data-reveal-fade>
          {INTENCIONES.map((t) => (
            <li key={t} className="av4-intencion">
              <CircleCheck size={20} strokeWidth={1.6} aria-hidden="true" />
              <p>{t}</p>
            </li>
          ))}
        </ul>

        <p className="av4-gran-cierre" data-reveal>
          <b>Tu corazón tiene una voz.</b>{" "}
          <em className="av4-brand">
            Es momento de darle espacio en tus decisiones.
          </em>
        </p>
      </div>

      <Av4Notch />
    </section>
  );
}
