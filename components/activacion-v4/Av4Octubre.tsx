import { Sparkles } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { OCTUBRE } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Octubre como recorrido, con el día del encuentro como punto central.
 * Sección oscura. Mismo copy que OctubreSection de /activacion.
 *
 * No se afirma que el momento "no se repite en nueve años": es el dato más
 * persuasivo y el único que no se puede sostener todavía, así que queda fuera
 * hasta que el cliente confirme de dónde sale.
 */
export default function Av4Octubre() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--oscuro av4-oct"
      aria-labelledby="av4-oct-title"
    >
      <div className="av4-oct__glow" aria-hidden="true" />

      <div className="av4-shell">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">El recorrido de octubre</p>
          <h2 id="av4-oct-title" className="av4-title">
            Octubre no es{" "}
            <span className="av4-serif av4-acento">un mes más</span> dentro de
            este recorrido energético.
          </h2>
          <p className="av4-lead">
            Durante octubre existen cuatro momentos principales.
          </p>
        </div>

        <ol className="av4-linea" data-reveal-group data-reveal-fade>
          {OCTUBRE.map(({ dia, nombre, protagonista }) => (
            <li
              key={dia}
              className="av4-hito"
              data-protagonista={protagonista ? "si" : undefined}
            >
              <span className="av4-hito__punto" aria-hidden="true" />
              <span className="av4-hito__dia">
                {dia}
                <span className="av4-hito__mes">/10</span>
              </span>
              <span className="av4-hito__nombre">{nombre}</span>
              {protagonista && (
                <span className="av4-hito__sello">
                  <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
                  El encuentro
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="av4-oct__texto">
          <p data-reveal>
            Dentro del enfoque energético de Aida, estas cuatro fechas contienen
            el <strong>código del 1</strong>: una energía asociada al inicio, la
            decisión y la creación de una nueva dirección.
          </p>
          <p data-reveal>
            Por eso octubre no se vive como un único portal aislado, sino como
            un recorrido que comienza el 1, alcanza uno de sus puntos centrales
            el 10 y continúa desarrollándose hasta el 28.
          </p>
        </div>

        <div className="av4-oct__remate" data-reveal>
          <p className="av4-oct__remate-fuerte">
            La Activación del Ser Multidimensional sucede en el{" "}
            <span className="av4-serif av4-acento">corazón de ese proceso</span>.
          </p>
          <p className="av4-oct__remate-texto">
            Durante el encuentro trabajaremos para liberar desorden interno y
            preparar tu sistema mental, emocional, físico y energético para
            atravesar conscientemente el resto del recorrido de octubre.
          </p>
        </div>

        <div className="av4-oct__previa" data-reveal>
          <p className="av4-oct__previa-titulo">
            Tu preparación comienza antes del encuentro.
          </p>
          <p className="av4-oct__previa-texto">
            Desde el momento en que te registras, comenzaremos a acompañarte
            para preparar tu energía y llegar al 10/10 con mayor consciencia,
            claridad y dirección.
          </p>
        </div>

        <div className="av4-cta-fila" data-reveal>
          <Av4Cta href="#av4-precio" label="Quiero vivir la Activación" />
        </div>
      </div>

      <Av4Notch tono="oscuro" />
    </section>
  );
}
