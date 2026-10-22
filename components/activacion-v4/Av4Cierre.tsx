import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4WhatsAppIcon from "@/components/activacion-v4/Av4WhatsAppIcon";
import { EVENTO, LINKS } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** CTA final y pie mínimo. Mismo copy que CierreFrecuencia de /activacion. */
export default function Av4Cierre() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <>
      <section
        ref={ref}
        className="av4-sec av4-sec--oscuro av4-cierre"
        aria-labelledby="av4-cierre-title"
      >
        <div className="av4-oct__glow" aria-hidden="true" />

        <div className="av4-shell av4-cierre__shell">
          <p className="av4-eyebrow" data-reveal>
            {EVENTO.fechaCorta}
          </p>

          <h2 id="av4-cierre-title" className="av4-title" data-reveal="title">
            Quizás tu próximo nivel no necesita que incorpores{" "}
            <span className="av4-serif av4-acento">más información</span>.
          </h2>

          <p className="av4-lead" data-reveal>
            Quizás necesita que tu sistema esté preparado para sostener todo lo
            que ya estás descubriendo.
          </p>

          <p className="av4-cierre__texto" data-reveal>
            Este {EVENTO.fechaCorta} vamos a crear un espacio para trabajar
            profundamente sobre tu capacidad de procesar, integrar y sostener
            una nueva etapa.
          </p>

          <div data-reveal>
            <Av4Horarios />
          </div>

          <div className="av4-cierre__actions" data-reveal>
            <Av4Cta href="#av4-precio" label="Quiero vivir esta experiencia" />

            <a
              href={LINKS.soporte}
              className="av4-soporte"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Av4WhatsAppIcon />
              Contacta con soporte
            </a>
          </div>
        </div>
      </section>

      <footer className="av4-footer">
        <p>
          © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos
          los derechos reservados
        </p>
      </footer>
    </>
  );
}
