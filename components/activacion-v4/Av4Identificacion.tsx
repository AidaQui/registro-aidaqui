import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Identificación: título centrado y seis tarjetas con icono. Cada afirmación
 * del cliente se parte en su primera cláusula (título) y el resto (texto),
 * sin añadir palabras. Copy literal.
 */

const SENALES = [
  {
    titulo: "Te cuesta reconocer qué quieres de verdad,",
    texto:
      "entre lo que esperan los demás y lo que te has acostumbrado a elegir.",
  },
  {
    titulo: "Sientes que necesitas un cambio,",
    texto: "pero el miedo a equivocarte te mantiene en el mismo lugar.",
  },
  {
    titulo: "Buscas respuestas y aprobación fuera,",
    texto:
      "aunque hay algo dentro de ti que lleva tiempo pidiendo ser escuchado.",
  },
  {
    titulo: "Has trabajado mucho en ti,",
    texto:
      "pero sigues aplazando decisiones, callando lo que necesitas o dejando tus deseos para después.",
  },
  {
    titulo: "Quieres vivir con propósito,",
    texto:
      "compartir tus dones y sentir que la vida que estás construyendo tiene sentido para ti.",
  },
];

export default function Av4Identificacion() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-ident"
      aria-labelledby="av4-ident-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <Av4Tag>Para ti</Av4Tag>
          <h2 id="av4-ident-title" className="av4-title">
            Sientes que algo tiene que cambiar.
            <br />
            <span className="av4-oro">Y ya no quieres seguir ignorándolo.</span>
          </h2>
          <p className="av4-texto">
            Por fuera sigues con tu vida. Pero por dentro reconoces que hay
            decisiones, relaciones o formas de vivir que ya no se corresponden
            con lo que <strong>de verdad quieres</strong>.
          </p>
        </div>

        <ul className="av4-cards" data-reveal-group data-reveal-fade>
          {SENALES.map(({ titulo, texto }, i) => (
            <li key={titulo} className="av4-card">
              <div className="av4-card__in">
                <span className="av4-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              
              </div>
            </li>
          ))}
        </ul>

        <div className="av4-pie-fila" data-reveal>
          <p>
            Esta activación es un espacio para{" "}
            <strong>reconectar con la verdad de tu corazón</strong> y recuperar
            el poder interior para empezar a actuar en coherencia con ella.
          </p>
          <Av4Cta href="#av4-precio" />
        </div>
      </div>
    </section>
  );
}
