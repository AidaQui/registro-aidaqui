import Image from "next/image";
import { CalendarDays, Check, Video } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import { EVENTO, LINKS, PRECIO } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección OSCURA de decisión: imagen a la izquierda y tarjeta con borde dorado
 * a la derecha. Mismo contenido que PrecioSection de /activacion.
 *
 * No lleva sello de garantía: el copy de /activacion no promete ninguna.
 */

const INCLUYE = [
  "Experiencia energética en vivo",
  "Trabajo mental, emocional, físico y energético",
  "Canalización y acompañamiento",
  "Experiencia en comunidad",
  "Grabación completa",
  "Activación complementaria #1",
  "Activación complementaria #2",
  "Preparación previa al 10/10",
];

export default function Av4Precio() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="av4-precio"
      className="av4-sec av4-sec--oscuro av4-precio"
      aria-labelledby="av4-precio-title"
    >
      <div className="av4-shell">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">Tu acceso a la experiencia</p>
          <h2 id="av4-precio-title" className="av4-title">
            Todo lo que necesitas para vivir esta experiencia, en un{" "}
            <span className="av4-serif av4-acento">único acceso</span>.
          </h2>
        </div>

        <div className="av4-precio__grid">
          <div className="av4-precio__media" data-reveal="left" aria-hidden="true">
            <Image
              src="/activacion-v2/item6.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 80vw, 420px"
              className="av4-cover"
            />
            <span className="av4-precio__media-sello">
              <span className="av4-serif">{EVENTO.titulo}</span>
            </span>
          </div>

          <div className="av4-precio__card" data-reveal="right">
            <p className="av4-precio__nombre">{EVENTO.titulo}</p>

            <ul className="av4-precio__lista">
              {INCLUYE.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="av4-precio__cifra">
              {PRECIO.tachado && (
                <span className="av4-precio__tachado">{PRECIO.tachado}</span>
              )}
              <span className="av4-precio__hoy">Hoy</span>
              <span className="av4-precio__monto">{PRECIO.actual}</span>
            </div>
            <p className="av4-precio__nota">{PRECIO.nota}</p>

            {/* El único botón que sale de la página: aquí se paga, con lo que
                incluye y cuánto cuesta a la vista. */}
            <Av4Cta href={LINKS.registro} className="av4-cta--block" />

            <ul className="av4-precio__datos">
              <li>
                <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
                {EVENTO.fechaCorta}
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
