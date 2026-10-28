import { Heart, HeartCrack } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Macbook from "@/components/activacion-v4/Av4Macbook";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Experiencia: texto, MacBook, preguntas y lista de cambios. Copy en contenido.tsx. */

/** Un icono por pregunta, en el mismo orden que `experiencia.preguntas`. */
const ICONOS_PREGUNTA = [Heart, HeartCrack];


export default function Av4Experiencia() {
  const ref = useScrollReveal<HTMLElement>();
  const { experiencia: c, ctaPrincipal } = useContenido();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--oscuro av4-exp"
      aria-labelledby="av4-exp-title"
    >
      <div className="av4-wrap av4-dos">
        <div className="av4-dos__copy">
          <div data-reveal>
            <Av4Tag>{c.etiqueta}</Av4Tag>
          </div>
          <h2 id="av4-exp-title" className="av4-title av4-title--izq" data-reveal>
            {c.titular}
          </h2>
          <p className="av4-texto av4-texto--izq" data-reveal>
            {c.texto}
          </p>
        </div>

        <div data-reveal="right">
          <Av4Macbook />
        </div>
      </div>

      <div className="av4-wrap av4-exp__lista">
        <div className="av4-exp__preguntas" data-reveal-group data-reveal-fade>
          {c.preguntas.map(({ pregunta, respuesta }, i) => {
            const Icono = ICONOS_PREGUNTA[i % ICONOS_PREGUNTA.length];
            return (
            <article key={respuesta} className="av4-pregunta">
              <span className="av4-pregunta__icono" aria-hidden="true">
                <Icono size={22} strokeWidth={1.8} />
              </span>
              <h3 className="av4-pregunta__titulo">{pregunta}</h3>
              <p>{respuesta}</p>
            </article>
            );
          })}
        </div>

        <h3 className="av4-subtitulo av4-exp__pregunta" data-reveal>
          {c.tituloCambios}
        </h3>

        <ul className="av4-borde av4-exp__cambios" data-reveal-group data-reveal-fade>
          {c.cambios.map(([area, cambio]) => (
            <li key={area}>
              <span>
                <strong>{area}:</strong> {cambio}
              </span>
            </li>
          ))}
        </ul>

        <div className="av4-cta-fila av4-cta-fila--centro" data-reveal>
          <Av4Cta href="#av4-precio" label={ctaPrincipal} />
        </div>
      </div>
    </section>
  );
}
