import { CalendarDays, Check, Clock, Video } from "lucide-react";
import LightPillar from "@/components/frecuencia/LightPillar";
import FrecuenciaCta from "@/components/frecuencia/FrecuenciaCta";
import { EVENTO, HORARIOS, PRECIO } from "@/components/frecuencia/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * La sección de decisión: qué incluye y cuánto cuesta.
 *
 * Va detrás de "quién es Aida" porque ése es el punto en el que alguien ya
 * sabe qué recibe y de quién: lo único que falta es el precio.
 *
 * ── POR QUÉ ROMPE EL RITMO ──
 *
 * Todo lo anterior son bloques claros sobre blanco. Ésta es la única pieza
 * oscura de su zona, y ese corte es deliberado: una tarjeta de precio que se
 * parece al resto de la página se lee como una sección más, y ésta es donde
 * se decide.
 *
 * ── LO QUE VA DEBAJO DEL BOTÓN ──
 *
 * Fecha, horario propio, formato y grabación. Son las cuatro preguntas que
 * alguien se hace con el dedo sobre el botón —cuándo es, a qué hora me toca,
 * dónde, y qué pasa si no puedo ir— y responderlas ahí quita la excusa para
 * dejarlo para después.
 */

const INCLUYE = [
  "Encuentro en vivo con Aida Qui",
  "Canalización personalizada para el grupo",
  "Conexión en comunidad",
  "La grabación completa del encuentro",
  "Dos activaciones guiadas para integrar",
];

export default function PrecioSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-precio"
      aria-labelledby="frec-precio-title"
    >
      <div className="frec-shell">
        <div className="frec-precio__intro">
          <p className="frec-precio__eyebrow" data-reveal>
            Tu acceso a la experiencia
          </p>

          <h2
            id="frec-precio-title"
            className="frec-precio__title"
            data-reveal="title"
          >
            Todo lo que acabas de ver forma parte de una{" "}
            <em>única experiencia en vivo</em>.
          </h2>
        </div>

        <div className="frec-precio__card" data-reveal>
          <div className="frec-precio__glow" aria-hidden="true" />

          <div className="frec-precio__body">
            {/* LA COLUMNA DE LUZ, DENTRO DE LA TARJETA.

                Los colores son los de la marca —violeta arriba, dorado
                abajo—, no los del ejemplo. El giro es lento y el resplandor
                bajo: detrás de una lista y un precio, una columna a plena
                intensidad los deja ilegibles.

                pillarRotation 180 la pone del revés, con la boca ancha
                arriba: así la luz se abre hacia el nombre de la experiencia y
                se estrecha al llegar al botón. */}
            <LightPillar
              className="frec-precio__pillar"
              topColor="#9b7ec8"
              bottomColor="#d4a020"
              intensity={0.85}
              rotationSpeed={0.22}
              glowAmount={0.004}
              pillarWidth={2.4}
              pillarHeight={0.35}
              noiseIntensity={0.35}
              pillarRotation={180}
            />
            <p className="frec-precio__nombre">{EVENTO.titulo}</p>

            <ul className="frec-precio__lista">
              {INCLUYE.map((item) => (
                <li key={item} className="frec-precio__item">
                  <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="frec-precio__cifra">
              {PRECIO.tachado && (
                <span className="frec-precio__tachado">{PRECIO.tachado}</span>
              )}
              <span className="frec-precio__hoy">Hoy</span>
              <span className="frec-precio__monto">{PRECIO.actual}</span>
            </div>

            <p className="frec-precio__nota">{PRECIO.nota}</p>

            <FrecuenciaCta variant="gold" />

            {/* Reducción de fricción: las cuatro dudas de último momento,
                resueltas donde se decide. */}
            <ul className="frec-precio__datos">
              <li>
                <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
                {EVENTO.fechaCorta}
              </li>
              <li>
                <Clock size={15} strokeWidth={2} aria-hidden="true" />
                {HORARIOS[0].hora} {HORARIOS[0].pais}
              </li>
              <li>
                <Video size={15} strokeWidth={2} aria-hidden="true" />
                En vivo por Zoom
              </li>
              <li>
                <Check size={15} strokeWidth={2} aria-hidden="true" />
                Grabación incluida
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
