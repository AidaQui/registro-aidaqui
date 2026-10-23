import { CalendarDays, Check } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4WhatsAppIcon from "@/components/activacion-v4/Av4WhatsAppIcon";
import {
  EVENTO,
  GRUPO_WHATSAPP,
  LINKS,
} from "@/components/activacion-v4/config";

/**
 * Página de gracias, en el mismo sistema: fondo claro, centrada, con el
 * logotipo y el check salvia. Quien llega aquí ya pagó: el único botón es el
 * grupo de WhatsApp, donde se reparte el enlace de la sesión.
 */
export default function Av4Gracias() {
  return (
    <>
      <section className="av4-sec av4-gracias" aria-labelledby="av4-gracias-title">

        <div className="av4-wrap av4-gracias__in">
          <Av4Lockup sello className="av4-lockup--centro" />

          <span className="av4-gracias__check" aria-hidden="true">
            <Check size={30} strokeWidth={2.4} />
          </span>

          <h1 id="av4-gracias-title" className="av4-title">
            Tu lugar está <span className="av4-oro">reservado</span>.
          </h1>

          <p className="av4-texto">
            Ya eres parte de la experiencia. Nos vemos {EVENTO.fechaLarga} en
            directo.
          </p>

          <div className="av4-paso">
            <p className="av4-tag av4-tag--bloque">Sólo te falta un paso</p>
            <p className="av4-paso__texto">
              Únete al grupo de WhatsApp: allí compartimos el enlace de la
              sesión en vivo y los avisos previos al encuentro.
            </p>
            <Av4Cta
              href={GRUPO_WHATSAPP}
              label="Unirme al grupo"
              icono={<Av4WhatsAppIcon />}
            />
          </div>

          <p className="av4-gracias__cita">
            <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
            El encuentro empieza el {EVENTO.fechaCorta}
          </p>
          <Av4Horarios />

          <p className="av4-gracias__soporte">
            ¿Algún problema?{" "}
            <a href={LINKS.soporte} target="_blank" rel="noopener noreferrer">
              Escríbenos por WhatsApp
            </a>
          </p>
        </div>
      </section>

      <footer className="av4-footer">
        <div className="av4-footer__in">
          <Av4Lockup tamano="chico" />
          <p>
            © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC ·
            Todos los derechos reservados
          </p>
        </div>
      </footer>
    </>
  );
}
