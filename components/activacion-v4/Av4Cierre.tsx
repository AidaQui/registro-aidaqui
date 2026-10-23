import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4WhatsAppIcon from "@/components/activacion-v4/Av4WhatsAppIcon";
import {
  EVENTO,
  HORARIOS,
  LINKS,
  PRECIO,
} from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Tarjeta final tipo entrada, en el estilo de la tarjeta de precio (borde
 * dorado sobre degradado oscuro-oliva), el cierre en serif cursiva y el pie.
 */
export default function Av4Cierre() {
  const ref = useScrollReveal<HTMLElement>();
  const principal = HORARIOS[0];

  return (
    <>
      <section
        ref={ref}
        className="av4-sec av4-sec--oscuro av4-cierre"
        aria-label="Reserva tu plaza"
      >
        <div className="av4-cierre__fondo" aria-hidden="true" />

        <div className="av4-wrap">
          <div className="av4-ticket" data-reveal>
            <Av4Lockup tamano="grande" sello className="av4-lockup--centro" />

            <p className="av4-ticket__fecha">
              {EVENTO.fechaCorta} · {principal.hora} {principal.pais}{" "}
              peninsular
            </p>

            <Av4Horarios oscuro sinPrimero nombres={{ México: "Ciudad de México" }} />

            <p className="av4-ticket__formato">
              {EVENTO.formato} · {PRECIO.actual.replace("€", " €")}
            </p>

            <Av4Cta href="#av4-precio" tono="claro" />
          </div>

          <p className="av4-despedida av4-cursiva" data-reveal>
            Te espero, alma bella.
          </p>

          <a
            href={LINKS.soporte}
            className="av4-soporte av4-soporte--claro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Av4WhatsAppIcon />
            Contacta con soporte
          </a>
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
