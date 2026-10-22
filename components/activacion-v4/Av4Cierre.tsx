import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4WhatsAppIcon from "@/components/activacion-v4/Av4WhatsAppIcon";
import { LINKS } from "@/components/activacion-v4/config";

/**
 * CTA final centrado, línea divisoria y pie. Copy de CierreFrecuencia de
 * /activacion (los horarios por país se conservan aquí, que es donde alguien
 * comprueba la hora antes de decidir).
 */
export default function Av4Cierre() {
  return (
    <>
      <section className="av4-sec av4-cierre" aria-label="Reserva tu lugar">
        <div className="av4-wrap">
          <Av4Horarios />

          <div className="av4-cierre__actions">
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
