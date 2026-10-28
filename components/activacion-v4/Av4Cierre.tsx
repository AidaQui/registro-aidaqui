import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import {
  CierreCodigo,
  CierreRespira,
  CierreSobre,
} from "@/components/activacion-v4/Av4CierreVisual";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import {
  EVENTO,
  HORARIOS,
  LINKS,
  PRECIO,
} from "@/components/activacion-v4/config";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Cierre con una entrada de evento: cuerpo y talón separados por una
 * perforación, con muescas troqueladas. Quieta: sólo entra al hacer scroll y
 * un brillo muy suave la barre de vez en cuando (se apaga con
 * prefers-reduced-motion).
 */
export default function Av4Cierre() {
  const ref = useScrollReveal<HTMLElement>();
  const { cierre: c, disenio } = useContenido();
  const visual = disenio?.cierreVisual;
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
          {c.titular && (
            <div className="av4-head av4-cierre__cabeza" data-reveal>
              <h2 className="av4-title">{c.titular}</h2>
              {c.subtitulo && <p className="av4-texto">{c.subtitulo}</p>}
            </div>
          )}

          {visual === "respira" && <CierreRespira cta={c.cta} />}
          {visual === "codigo" && <CierreCodigo cta={c.cta} />}
          {visual === "sobre" && <CierreSobre cta={c.cta} />}

          {!visual && (
          <div className="av4-et" data-reveal>
            <div className="av4-et__sombra">
              <div>
                <div className="av4-et__forma">
                  <div className="av4-et__cuerpo">
                    <Av4Lockup
                      tamano="grande"
                      sello
                      className="av4-lockup--centro"
                    />

                    <p className="av4-et__fecha">
                      {EVENTO.fechaCorta} · {principal.hora} {principal.pais}{" "}
                      peninsular
                    </p>

                    <Av4Horarios
                      oscuro
                      sinPrimero
                      nombres={{ México: "Ciudad de México" }}
                    />

                    <p className="av4-et__formato">
                      {EVENTO.formato} · {PRECIO.actual.replace("€", " €")}
                    </p>

                    <Av4Cta
                      href={LINKS.registro}
                      ubicacion="cierre"
                      {...(c.cta && { label: c.cta })}
                    />
                  </div>

                  <div className="av4-et__talon" aria-hidden="true">
                    <span className="av4-et__admite">ENTRADA · 1 PERSONA</span>
                    <span className="av4-et__barras" />
                    <Av4Sello size={64} className="av4-et__sello" />
                  </div>

                  <span className="av4-et__brillo" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
          )}

          <p className="av4-despedida" data-reveal>
            {c.despedida}
          </p>

          <div className="av4-soporte-fila" data-reveal>
            <Av4Cta
              href={LINKS.soporte}
              label={c.ctaSoporte}
              variante="verde"
            />
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
