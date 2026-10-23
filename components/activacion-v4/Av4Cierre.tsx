import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import {
  EVENTO,
  HORARIOS,
  LINKS,
  PRECIO,
} from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Cierre con una entrada de evento: cuerpo y talón separados por una
 * perforación, con muescas troqueladas. Inclinación 3D que sigue al ratón
 * (sólo con puntero de ratón), brillo que la barre, flotación suave y entrada
 * al hacer scroll. Todo el movimiento se apaga con prefers-reduced-motion.
 */
export default function Av4Cierre() {
  const ref = useScrollReveal<HTMLElement>();
  const principal = HORARIOS[0];

  const inclinar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
  };

  const enderezar = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <>
      <section
        ref={ref}
        className="av4-sec av4-sec--oscuro av4-cierre"
        aria-label="Reserva tu plaza"
      >
        <div className="av4-cierre__fondo" aria-hidden="true" />

        <div className="av4-wrap">
          <div className="av4-et" data-reveal>
            <div className="av4-et__flota">
              <div
                className="av4-et__inclina"
                onPointerMove={inclinar}
                onPointerLeave={enderezar}
              >
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

                    <Av4Cta href="#av4-precio" />
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

          <p className="av4-despedida" data-reveal>
            Te espero, alma bella.
          </p>

          <div className="av4-soporte-fila" data-reveal>
            <Av4Cta
              href={LINKS.soporte}
              label="Contacta con soporte"
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
