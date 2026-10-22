import { CalendarDays } from "lucide-react";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4WhatsAppIcon from "@/components/activacion-v4/Av4WhatsAppIcon";
import {
  EVENTO,
  GRUPO_WHATSAPP,
  LINKS,
} from "@/components/activacion-v4/config";

/**
 * Página de gracias. Quien llega aquí ya pagó: el único botón es el grupo de
 * WhatsApp, donde se reparte el enlace de la sesión.
 */
export default function Av4Gracias() {
  return (
    <>
      <section
        className="av4-sec av4-sec--oscuro av4-gracias"
        aria-labelledby="av4-gracias-title"
      >
        <div className="av4-oct__glow" aria-hidden="true" />
        <span className="av4-monograma av4-monograma--gracias" aria-hidden="true">
          A
        </span>

        <div className="av4-shell av4-gracias__shell">
          <p className="av4-hero__marca av4-hero__marca--centro">
            <span className="av4-hero__marca-sello" aria-hidden="true">
              ✦
            </span>
            <span className="av4-serif">{EVENTO.titulo}</span>
          </p>

          <h1 id="av4-gracias-title" className="av4-title">
            Tu lugar está{" "}
            <span className="av4-serif av4-acento">reservado</span>.
          </h1>

          <p className="av4-lead">
            Ya eres parte de la experiencia. Nos vemos {EVENTO.fechaLarga} en
            directo.
          </p>

          <div className="av4-paso">
            <p className="av4-eyebrow">Sólo te falta un paso</p>
            <p className="av4-paso__texto">
              Únete al grupo de WhatsApp: allí compartimos el enlace de la
              sesión en vivo y los avisos previos al encuentro.
            </p>
            <a
              href={GRUPO_WHATSAPP}
              className="av4-soporte av4-soporte--solido"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Av4WhatsAppIcon />
              Unirme al grupo
            </a>
          </div>

          <div className="av4-gracias__cita">
            <p className="av4-gracias__cita-rotulo">
              <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
              El encuentro empieza el {EVENTO.fechaCorta}
            </p>
            <Av4Horarios />
          </div>

          <p className="av4-gracias__soporte">
            ¿Algún problema?{" "}
            <a href={LINKS.soporte} target="_blank" rel="noopener noreferrer">
              Escríbenos por WhatsApp
            </a>
          </p>
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
