import { Heart } from "lucide-react";
import Av4Monograma from "@/components/activacion-v4/Av4Monograma";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Identificación: titular centrado, párrafo y seis afirmaciones en tarjetas
 * blancas al estilo de las de testimonios de la referencia. Copy literal
 * del cliente.
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
      <Av4Monograma variante="ident" />

      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <h2 id="av4-ident-title" className="av4-title">
            <b>Sientes que algo</b> <span className="av4-key">tiene que cambiar</span>.
            <br />
            Y ya no quieres seguir ignorándolo.
          </h2>

          <p className="av4-texto">
            Por fuera sigues con tu vida. Pero por dentro reconoces que hay
            decisiones, relaciones o formas de vivir que ya no se corresponden
            con lo que <strong>de verdad quieres</strong>.
          </p>
        </div>

        <ul className="av4-senales" data-reveal-group data-reveal-fade>
          {SENALES.map((texto) => (
            <li key={texto} className="av4-senal">
              <span className="av4-senal__icono" aria-hidden="true">
                <Heart size={13} strokeWidth={2.2} />
              </span>
              <p>{texto}</p>
            </li>
          ))}
        </ul>

        <p className="av4-texto av4-texto--cierre" data-reveal>
          Esta activación es un espacio para <strong>reconectar con la verdad
          de tu corazón</strong> y recuperar el poder interior para empezar a
          actuar en coherencia con ella.
        </p>
      </div>

      <Av4Notch />
    </section>
  );
}
