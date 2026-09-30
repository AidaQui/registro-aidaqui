import { Sparkles } from "lucide-react";
import { OCTUBRE } from "@/components/activacion-v3/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Por qué el 10/10, en corto.
 *
 * ── REUTILIZA EL TIMELINE DE LA LANDING ──
 *
 * Mismas clases .frec-octubre__linea y derivadas, mismos datos de OCTUBRE:
 * es deliberado que se vea idéntico. Quien llega aquí acaba de ver ese
 * recorrido y reconocerlo confirma que sigue en el mismo sitio; un timeline
 * con otro aspecto diciendo lo mismo haría dudar de si es lo mismo.
 *
 * Lo que cambia es todo lo demás: allí la sección argumenta durante cuatro
 * bloques por qué octubre importa, y aquí sólo recuerda el porqué de la
 * fecha. El párrafo del "código del 1" queda fuera a propósito —ya se leyó—.
 *
 * ── LO QUE SIGUE SIN ESTAR ──
 *
 * Tampoco aquí se afirma que la configuración no se repite en nueve años.
 * Sigue pendiente de que el cliente explique de dónde sale.
 */
export default function PuenteOctubre() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-octubre puente-octubre"
      aria-labelledby="puente-octubre-title"
    >
      <div className="frec-octubre__glow" aria-hidden="true" />

      <div className="frec-shell">
        <div className="frec-octubre__intro">
          <h2
            id="puente-octubre-title"
            className="frec-octubre__title"
            data-reveal="title"
          >
            No elegimos el 10 de octubre <em>al azar</em>.
          </h2>

          <p className="frec-octubre__lead" data-reveal>
            Dentro del enfoque energético de Aida, octubre se trabaja como un
            recorrido compuesto por cuatro momentos principales.
          </p>
        </div>

        <ol className="frec-octubre__linea" data-reveal-group data-reveal-fade>
          {OCTUBRE.map(({ dia, nombre, protagonista }) => (
            <li
              key={dia}
              className="frec-octubre__hito"
              data-protagonista={protagonista ? "si" : undefined}
            >
              <span className="frec-octubre__punto" aria-hidden="true" />

              <span className="frec-octubre__dia">
                {dia}
                <span className="frec-octubre__mes">/10</span>
              </span>

              <span className="frec-octubre__nombre">{nombre}</span>

              {protagonista && (
                <span className="frec-octubre__sello">
                  <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
                  Tu encuentro
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="frec-octubre__remate" data-reveal>
          <p className="frec-octubre__remate-texto">
            La Activación del Ser Multidimensional sucede en uno de los puntos
            centrales de este recorrido, para ayudarte a preparar tu sistema y
            atravesar conscientemente lo que continúa durante el resto del mes.
          </p>
        </div>

        <div className="frec-octubre__previa" data-reveal>
          <p className="frec-octubre__previa-titulo">
            Tu proceso empieza desde que te registras.
          </p>
          <p className="frec-octubre__previa-texto">
            Desde tu inscripción comenzaremos a acompañarte para que llegues al
            10/10 con mayor consciencia, claridad y dirección.
          </p>
        </div>
      </div>
    </section>
  );
}
