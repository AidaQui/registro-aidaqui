import { Check, Video } from "lucide-react";
import Av4Conector from "@/components/activacion-v4/Av4Conector";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import Av4WhatsAppIcon from "@/components/activacion-v4/Av4WhatsAppIcon";
import {
  EVENTO,
  GRUPO_WHATSAPP,
  HORARIOS,
  LINKS,
  PRECIO,
} from "@/components/activacion-v4/config";

/**
 * Página de gracias: mismo sistema que la landing. Quien llega aquí ya pagó,
 * así que no hay CTA de compra: el paso clave es el grupo de WhatsApp, donde
 * se reparte el enlace de la sesión. Todo sale de datos que ya tenemos.
 */
export default function Av4Gracias() {
  const principal = HORARIOS[0];
  const PASOS = [
    "Únete al grupo de WhatsApp",
    "Recibe el enlace de Zoom y los avisos en el grupo",
    `Conéctate ${EVENTO.fechaLarga} a las ${principal.hora} (${principal.pais})`,
  ];

  return (
    <>
      <section
        className="av4-sec av4-sec--oscuro av4-gr"
        aria-labelledby="av4-gracias-title"
      >
        <div className="av4-gr__foto" aria-hidden="true" />

        <div className="av4-wrap av4-gr__in">
          <Av4Lockup sello className="av4-lockup--centro" />

          <span className="av4-gr__check" aria-hidden="true">
            <svg viewBox="0 0 52 52" width="44" height="44">
              <path
                d="M13 27 L22 36 L40 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
              />
            </svg>
          </span>

          <h1 id="av4-gracias-title" className="av4-title">
            Tu lugar está <span className="av4-oro">reservado</span>.
          </h1>

          <p className="av4-texto">
            Ya eres parte de la experiencia. Nos vemos {EVENTO.fechaLarga} en
            directo.
          </p>

          {/* El paso clave: tarjeta troquelada, es la acción principal. */}
          <div className="av4-gp">
            <div className="av4-gp__forma">
              <span className="av4-gp__tag">
                Paso 1 de 1 · Sólo te falta un paso
              </span>
              <p className="av4-gp__texto">
                Únete al grupo de WhatsApp: allí compartimos el enlace de la
                sesión en vivo y los avisos previos al encuentro.
              </p>
              <div className="av4-gp__perf" aria-hidden="true" />
              <div className="av4-gp__cta">
                <Av4Cta
                  href={GRUPO_WHATSAPP}
                  label="Unirme al grupo"
                  icono={<Av4WhatsAppIcon />}
                />
              </div>
            </div>
          </div>

          {/* Tu entrada: la misma del cierre de la landing, sin CTA de compra. */}
          <div className="av4-et av4-gr__et">
            <div className="av4-et__sombra">
              <div>
                <div className="av4-et__forma">
                  <div className="av4-et__cuerpo">
                    <p className="av4-gr__etiqueta">Tu entrada</p>
                    <Av4Lockup tamano="grande" className="av4-lockup--centro" />
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
                    <p className="av4-gr__guarda">
                      Guárdalo en tu calendario para no perdértelo.
                    </p>
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
        </div>
      </section>

      <Av4Conector color="#fbf6f1" />

      <section
        className="av4-sec av4-sec--claro av4-gr2"
        aria-labelledby="av4-ahora-title"
      >
        <div className="av4-wrap">
          <div className="av4-head">
            <span className="av4-tag">Qué pasa ahora</span>
            <h2 id="av4-ahora-title" className="av4-title">
              Tres pasos y <span className="av4-oro">todo listo</span>
            </h2>
          </div>
          <ol className="av4-pasos">
            {PASOS.map((t, i) => (
              <li key={t} className="av4-paso3">
                <span className="av4-paso3__n">{i + 1}</span>
                <p>{t}</p>
                {i === 2 ? (
                  <Video size={20} strokeWidth={1.8} aria-hidden="true" />
                ) : (
                  <Check size={20} strokeWidth={2} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Av4Conector color="#4a1426" />

      <section className="av4-sec av4-sec--oscuro av4-gr3" aria-label="Soporte">
        <div className="av4-wrap av4-gr3__in">
          <p className="av4-gracias__soporte">¿Algún problema?</p>
          <Av4Cta
            href={LINKS.soporte}
            label="Contacta con soporte"
            variante="verde"
          />
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
