import { Compass, Eye, Heart, Sparkles } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Divisor from "@/components/activacion-v4/Av4Divisor";
import Av4Marco from "@/components/activacion-v4/Av4Marco";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Experiencia (layout "5 camadas" de Tayná). Copy literal del cliente. */

const PUNTOS = [
  { Icono: Sparkles, texto: "Reconectar con lo que de verdad deseas." },
  { Icono: Eye, texto: "Reconocer qué te está frenando." },
  { Icono: Heart, texto: "Conectar con tu corazón y tu poder interior." },
  { Icono: Compass, texto: "Dar una dirección concreta a lo que descubras." },
];

export default function Av4Experiencia() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-exp"
      aria-labelledby="av4-exp-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <span className="av4-pildora">La experiencia</span>
          <h2 id="av4-exp-title" className="av4-title">
            <b>Una experiencia energética</b> para reconectar con la{" "}
            <span className="av4-acento">verdad de tu corazón</span>.
          </h2>
          <p className="av4-texto">
            Diseñada para ayudarte a reconocer lo que deseas de verdad,
            trabajar los miedos que te frenan y activar tu poder interior para
            crear una vida alineada con tu alma.
          </p>
          <p className="av4-lema">
            Escucha tu verdad. Recupera la confianza para vivirla.
          </p>
        </div>

        <div className="av4-exp__grid">
          <div data-reveal="left">
            <Av4Marco
              src="/activacion-v4/experiencia.jpg"
              alt="Aida Qui sonriendo ante su portátil"
              sizes="(max-width: 900px) 80vw, 440px"
              bloque="sup-izq"
              proporcion="4 / 5"
            />
          </div>

          <div className="av4-exp__der">
            <h3 className="av4-subtitulo" data-reveal>
              Lo que <span className="av4-acento">experimentarás</span> dentro
            </h3>
            <p className="av4-texto av4-texto--izq" data-reveal>
              A través de la meditación y una activación energética guiada:
            </p>

            <ul className="av4-chips" data-reveal-group data-reveal-fade>
              {PUNTOS.map(({ Icono, texto }) => (
                <li key={texto} className="av4-chip">
                  <span className="av4-chip__icono" aria-hidden="true">
                    <Icono size={15} strokeWidth={1.6} />
                  </span>
                  {texto}
                </li>
              ))}
            </ul>

            <p className="av4-texto av4-texto--izq" data-reveal>
              Llevaremos esa conexión a tu realidad: tus relaciones, tus
              proyectos y las decisiones que tienes delante para reconocer{" "}
              <strong>un siguiente paso</strong> y comprometerte contigo para
              darlo.
            </p>

            <div data-reveal>
              <Av4Cta href="#av4-precio" />
            </div>
          </div>
        </div>
      </div>

      <Av4Divisor />
    </section>
  );
}
