import { CalendarDays, Clock, Video } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import { EVENTO, HORARIOS, PRECIO } from "@/components/activacion-v4/config";

/**
 * Hero a sangre: la foto de Aida es el fondo y un velo desde la izquierda
 * deja leer el texto. Los chips flotantes llevan datos reales de config.
 */
export default function Av4Hero() {
  const principal = HORARIOS[0];

  return (
    <section className="av4-hero" aria-labelledby="av4-hero-title">
      <div className="av4-hero__bg" aria-hidden="true" />
      <div className="av4-hero__wash" aria-hidden="true" />

      <div className="av4-shell av4-hero__shell">
        <div className="av4-hero__copy">
          <p className="av4-hero__marca">
            <span className="av4-hero__marca-sello" aria-hidden="true">
              ✦
            </span>
            <span className="av4-serif">{EVENTO.titulo}</span>
            <span className="av4-hero__marca-fecha">{EVENTO.fechaCorta}</span>
          </p>

          <h1 id="av4-hero-title" className="av4-hero__title">
            ¿Sientes que estás atravesando{" "}
            <strong>muchos cambios internos</strong> y todavía te cuesta
            procesar todo lo que está pasando?
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

          <ul className="av4-hero__trust" aria-label="Datos de la experiencia">
            <li>En vivo por Zoom</li>
            <li>Grabación incluida</li>
            <li>
              {PRECIO.nota} · {PRECIO.actual}
            </li>
          </ul>
        </div>

        {/* Chips con datos reales de config: fecha, formato y horario. Nada
            de notificaciones de compra inventadas. */}
        <ul className="av4-hero__chips" aria-label="Fecha, formato y horario">
          <li className="av4-chip">
            <span className="av4-chip__icono" aria-hidden="true">
              <CalendarDays size={16} strokeWidth={2} />
            </span>
            <span className="av4-chip__texto">
              <strong>{EVENTO.fechaCorta}</strong>
              <span>{EVENTO.formato}</span>
            </span>
          </li>
          <li className="av4-chip">
            <span className="av4-chip__icono" aria-hidden="true">
              <Clock size={16} strokeWidth={2} />
            </span>
            <span className="av4-chip__texto">
              <strong>{principal.hora}</strong>
              <span>Hora de {principal.pais}</span>
            </span>
          </li>
          <li className="av4-chip">
            <span className="av4-chip__icono" aria-hidden="true">
              <Video size={16} strokeWidth={2} />
            </span>
            <span className="av4-chip__texto">
              <strong>En vivo por Zoom</strong>
              <span>Grabación incluida</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
