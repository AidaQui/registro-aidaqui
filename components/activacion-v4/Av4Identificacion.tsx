import Av4Divisor from "@/components/activacion-v4/Av4Divisor";
import Av4Marco from "@/components/activacion-v4/Av4Marco";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Identificación (layout "Para quem é indicada" de Tayná): titular con
 * palabra resaltada, párrafo y foto con sello a la izquierda; seis tarjetas
 * numeradas a la derecha. Copy literal del cliente.
 */

const SENALES = [
  "Tu corazón te pide un cambio, pero cuando intentas dar el paso aparecen las dudas.",
  "Te cuesta reconocer qué quieres de verdad, entre lo que esperan los demás y lo que te has acostumbrado a elegir.",
  "Sientes que necesitas un cambio, pero el miedo a equivocarte te mantiene en el mismo lugar.",
  "Buscas respuestas y aprobación fuera, aunque hay algo dentro de ti que lleva tiempo pidiendo ser escuchado.",
  "Has trabajado mucho en ti, pero sigues aplazando decisiones, callando lo que necesitas o dejando tus deseos para después.",
  "Quieres vivir con propósito, compartir tus dones y sentir que la vida que estás construyendo tiene sentido para ti.",
];

export default function Av4Identificacion() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-ident"
      aria-labelledby="av4-ident-title"
    >
      <div className="av4-wrap av4-ident__grid">
        <div className="av4-ident__izq">
          <h2 id="av4-ident-title" className="av4-title av4-title--izq" data-reveal="title">
            <b>Sientes que algo</b> tiene que{" "}
            <span className="av4-sel">
              <span className="av4-sel__texto">cambiar</span>
            </span>
            .<br />
            Y ya no quieres seguir ignorándolo.
          </h2>

          <p className="av4-texto av4-texto--izq" data-reveal>
            Por fuera sigues con tu vida. Pero por dentro reconoces que hay
            decisiones, relaciones o formas de vivir que ya no se corresponden
            con lo que <strong>de verdad quieres</strong>.
          </p>

          <div data-reveal>
            <Av4Marco
              src="/activacion-v4/identificacion.jpg"
              alt="Aida Qui caminando al atardecer"
              sizes="(max-width: 900px) 80vw, 440px"
              bloque="ninguno"
              proporcion="4 / 5"
              sello={
                <Av4Sello
                  className="av4-marco__sello av4-marco__sello--izq"
                  size={110}
                />
              }
            />
          </div>
        </div>

        <div className="av4-ident__der">
          <ol className="av4-tarjetas" data-reveal-group data-reveal-fade>
            {SENALES.map((texto, i) => (
              <li key={texto} className="av4-tarjeta">
                <span className="av4-num">{String(i + 1).padStart(2, "0")}</span>
                <p>{texto}</p>
              </li>
            ))}
          </ol>

          <p className="av4-cierre-texto" data-reveal>
            Esta activación es un espacio para{" "}
            <strong>reconectar con la verdad de tu corazón</strong> y recuperar
            el poder interior para empezar a actuar en coherencia con ella.
          </p>
        </div>
      </div>

      <Av4Divisor />
    </section>
  );
}
