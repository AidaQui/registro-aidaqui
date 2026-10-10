import { CalendarDays } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
// LightRays se toma de /masterclass a propósito: es un efecto genérico que se
// configura sólo por props, así que compartirlo no ata una landing a la otra.
import LightRays from "@/components/masterclass/LightRays";
import { evento } from "@/components/registro-v2/contenido";
import { whatsappGroupUrl, WhatsAppIcon } from "@/components/registro-v2/whatsapp";

/** Fila de la landing: CTA al formulario y, al lado, el botón redondo de WhatsApp */
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
        href={whatsappGroupUrl}
        className="pearl-btn ent-wa-pearl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Unirme al grupo de WhatsApp"
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
    // id="cierre": FloatingWhatsApp lo observa para retirarse aquí
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

      <div className="closing-shell">
        <p className="closing-eyebrow" data-reveal>
          <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
          {evento.nombre}
        </p>

        <h2 id="closing-title" className="closing-title" data-reveal="title">
          {evento.fecha}
        </h2>

        <div className="ent-closing-copy" data-reveal>
          <p className="ent-closing-lead">{evento.bajada}</p>
          <p className="ent-closing-punch">{evento.remate}</p>
        </div>

        <ul className="closing-times" aria-label="Horarios por país" data-reveal-group>
          {evento.horarios.map(({ hora, pais }) => (
            <li key={pais}>
              <span className="closing-time-h">{hora}</span>
              <span className="closing-time-c">{pais}</span>
            </li>
          ))}
        </ul>

        <div className="closing-cta ent-closing-cta" data-reveal>
          <CtaLanding />
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
