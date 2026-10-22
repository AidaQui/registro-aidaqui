import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Av4Monograma from "@/components/activacion-v4/Av4Monograma";
import { FECHA_LIMITE_INSCRIPCION } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Preguntas frecuentes: barras oscuras estrechas sobre fondo claro. Copy de
 * FaqSection de /activacion. Botón + aria-expanded; pueden quedar varias
 * abiertas a la vez.
 */

const PREGUNTAS = [
  {
    pregunta: "¿Necesito experiencia previa?",
    respuesta:
      "No. La experiencia está diseñada para que puedas atravesarla aunque sea tu primer acercamiento a este tipo de trabajo.",
  },
  {
    pregunta: "¿Qué pasa si no puedo conectarme en vivo?",
    respuesta:
      "Vas a recibir la grabación completa para vivir la experiencia posteriormente.",
  },
  {
    pregunta: "¿Las clases quedan grabadas?",
    respuesta:
      "Sí. Cada encuentro queda grabado y vas a tener el acceso a las grabaciones.",
  },
  {
    pregunta: "¿Cómo accedo después de comprar?",
    respuesta:
      "Al confirmar tu inscripción vas a recibir acceso a un grupo privado de WhatsApp mediante email (revisa spam o promociones) y mediante WhatsApp, donde te compartimos las fechas, los accesos y todo lo que necesitas para el encuentro.",
  },
  {
    pregunta: "¿Cuánto tiempo tengo para inscribirme?",
    respuesta: `Las inscripciones están abiertas hasta el ${FECHA_LIMITE_INSCRIPCION}.`,
  },
  {
    pregunta: "¿Desde qué país puedo participar?",
    respuesta:
      "Desde cualquier lugar. La experiencia se realiza online mediante Zoom.",
  },
];

export default function Av4Faq() {
  const ref = useScrollReveal<HTMLElement>();
  const [abiertas, setAbiertas] = useState<number[]>([]);

  const alternar = (i: number) =>
    setAbiertas((prev) =>
      prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i],
    );

  return (
    <section
      ref={ref}
      className="av4-sec av4-faq"
      aria-labelledby="av4-faq-title"
    >
      <Av4Monograma variante="faq" />

      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">¿Te quedó alguna duda?</p>
          <h2 id="av4-faq-title" className="av4-title">
            Preguntas <b>frecuentes</b>
          </h2>
        </div>

        <div className="av4-faq__lista" data-reveal-group data-reveal-fade>
          {PREGUNTAS.map(({ pregunta, respuesta }, i) => {
            const abierta = abiertas.includes(i);
            return (
              <div key={pregunta} className="av4-faq__item" data-abierta={abierta}>
                <h3>
                  <button
                    type="button"
                    id={`av4-faq-btn-${i}`}
                    className="av4-faq__pregunta"
                    aria-expanded={abierta}
                    aria-controls={`av4-faq-panel-${i}`}
                    onClick={() => alternar(i)}
                  >
                    <span>{pregunta}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className="av4-faq__chevron"
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`av4-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`av4-faq-btn-${i}`}
                  className="av4-faq__cuerpo"
                >
                  <div className="av4-faq__cuerpo-in">
                    <p>{respuesta}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
