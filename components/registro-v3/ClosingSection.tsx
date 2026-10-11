import { CalendarDays } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
// LightRays se toma de /masterclass a propósito: es un efecto genérico que se
// configura sólo por props, así que compartirlo no ata una landing a la otra.
import LightRays from "@/components/masterclass/LightRays";
import { evento } from "@/components/registro-v3/contenido";
import { soporteUrl, WhatsAppIcon } from "@/components/registro-v3/whatsapp";

/** Fila de la landing: CTA al formulario y, al lado, el botón redondo de
 *  WhatsApp a soporte (el grupo se comparte recién en la página de gracias) */
function CtaLanding() {
  return (
    <>
      <a href="#registro" className="pearl-btn pearl-btn--scroll">
        <div className="pearl-wrap">
          <p>
            <span className="pearl-star" aria-hidden="true">✦</span>
            Quiero registrarme
            <span className="pearl-star" aria-hidden="true">✦</span>
          </p>
        </div>
      </a>

      {/* Mismo botón perla que el CTA, en versión redonda: así los dos
          se leen como un par y no como dos estilos distintos. */}
      <a
        href={soporteUrl}
        className="pearl-btn rv3-wa-pearl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar con soporte por WhatsApp"
      >
        <div className="pearl-wrap">
          <p>
            <WhatsAppIcon />
          </p>
        </div>
      </a>
    </>
  );
}

export default function ClosingSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="cierre" className="closing" aria-labelledby="closing-title">
      <div className="closing-bg" aria-hidden="true" />
      <div className="closing-orb closing-orb--gold" aria-hidden="true" />
      <div className="closing-orb closing-orb--violet" aria-hidden="true" />
      <div className="closing-rays" aria-hidden="true">
        <LightRays
          raysOrigin="top-center"
          raysColor="#f3c79a"
          raysSpeed={0.8}
          lightSpread={1.1}
          rayLength={1.3}
          fadeDistance={1.2}
          saturation={0.9}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.06}
          distortion={0.03}
        />
      </div>

      {/* Dos bloques, que en escritorio van en dos columnas: el evento
          (fecha y horarios, a la derecha) y la invitación (pregunta, párrafo
          y botones, a la izquierda). En mobile se disuelven y cada pieza toma
          su lugar por CSS, con la pregunta y el párrafo antes de los
          horarios. */}
      <div className="closing-shell">
        <div className="rv3-closing-main">
          <p className="closing-eyebrow" data-reveal>
            <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
            {evento.nombre}
          </p>

          <h2 id="closing-title" className="closing-title" data-reveal="title">
            {evento.fecha}
          </h2>

          <ul className="closing-times" aria-label="Horarios por país" data-reveal-group>
            {evento.horarios.map(({ hora, pais }) => (
              <li key={pais}>
                <span className="closing-time-h">{hora}</span>
                <span className="closing-time-c">{pais}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rv3-closing-action">
          <div className="rv3-closing-copy" data-reveal>
            <p className="rv3-closing-question">¿Cuántos años llevas trabajando en ti?</p>
            <p className="rv3-closing-lead">
              Ahora dedica 3 horas a identificar qué te está frenando y sal con
              un <strong>paso a paso</strong> claro para dejar de reaccionar como
              siempre y empezar a tomar decisiones diferentes cuando aparezcan el
              miedo, las dudas o los mismos problemas de siempre.
            </p>
          </div>

          <div className="closing-cta rv3-closing-cta">
            <CtaLanding />
          </div>
        </div>
      </div>

      <footer className="closing-footer">
        <p className="closing-footer-copy">
          © 2026 Aida Qui · Divine Alignment LLC · Todos los derechos reservados
        </p>
      </footer>
    </section>
  );
}
