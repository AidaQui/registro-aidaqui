import { CalendarDays, Clock, ShieldCheck, Video, Clapperboard, Tag } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Monograma from "@/components/activacion-v4/Av4Monograma";
import { EVENTO, HORARIOS } from "@/components/activacion-v4/config";

/**
 * Hero claro a dos columnas, como la referencia: el logotipo, el titular de
 * pesos mezclados, la bajada, el CTA bronce y una fila de confianza a la
 * izquierda; a la derecha Aida delante de una letra gigante en salvia.
 *
 * La foto no es un recorte: se enmascara con un degradado para que se funda
 * con el fondo y se lea como un retrato recortado.
 */
export default function Av4Hero() {
  const principal = HORARIOS[0];

  return (
    <section className="av4-hero" aria-labelledby="av4-hero-title">
      <div className="av4-hero__glow" aria-hidden="true" />

      <div className="av4-hero__shell">
        <div className="av4-hero__copy">
          <Av4Lockup />

          <h1 id="av4-hero-title" className="av4-hero__title">
            ¿Sientes que estás atravesando{" "}
            <b>muchos</b> <span className="av4-key">cambios internos</span> y
            todavía te cuesta <b>procesar todo lo que está pasando</b>?
          </h1>

          <p className="av4-hero__lead">
            Vive una experiencia energética guiada para{" "}
            <strong>liberar carga</strong>, recuperar claridad y preparar tu
            sistema para integrar con mayor equilibrio los cambios que estás
            viviendo.
          </p>

          {/* Va al pricing, no al checkout: saltar afuera sin ver qué incluye
              ni cuánto cuesta es la fricción que más rebota. */}
          <Av4Cta href="#av4-precio" label="Quiero vivir esta experiencia" />

          <ul className="av4-trust" aria-label="Garantías de compra">
            <li>
              <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />
              Compra segura
            </li>
            <li>
              <Tag size={15} strokeWidth={1.8} aria-hidden="true" />
              Pago único
            </li>
            <li>
              <Clapperboard size={15} strokeWidth={1.8} aria-hidden="true" />
              Grabación incluida
            </li>
          </ul>
        </div>

        <div className="av4-hero__art">
          <Av4Monograma variante="hero" />
          <div className="av4-hero__foto" role="img" aria-label="Aida Qui" />

          {/* Chips con datos reales de config. Nada de compras inventadas. */}
          <ul className="av4-chips" aria-label="Fecha, hora y formato">
            <li className="av4-chip">
              <span className="av4-chip__dot" aria-hidden="true">
                <CalendarDays size={13} strokeWidth={2} />
              </span>
              <span className="av4-chip__texto">
                <strong>{EVENTO.fechaCorta}</strong>
                <span>{EVENTO.formato}</span>
              </span>
            </li>
            <li className="av4-chip">
              <span className="av4-chip__dot" aria-hidden="true">
                <Clock size={13} strokeWidth={2} />
              </span>
              <span className="av4-chip__texto">
                <strong>{principal.hora}</strong>
                <span>Hora de {principal.pais}</span>
              </span>
            </li>
            <li className="av4-chip">
              <span className="av4-chip__dot" aria-hidden="true">
                <Video size={13} strokeWidth={2} />
              </span>
              <span className="av4-chip__texto">
                <strong>En vivo por Zoom</strong>
                <span>Grabación incluida</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
