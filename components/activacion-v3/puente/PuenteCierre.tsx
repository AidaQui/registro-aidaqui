import { CalendarDays, Check, Video } from "lucide-react";
import LightPillar from "@/components/activacion-v3/LightPillar";
import CheckoutCta from "@/components/activacion-v3/CheckoutCta";
import { CHECKOUT_URL, EVENTO, PRECIO } from "@/components/activacion-v3/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * La card de compra: la pieza de conversión más fuerte de la página.
 *
 * ── POR QUÉ REPITE LA LISTA DEL PRINCIPIO ──
 *
 * En una página corta repetir suele sobrar, pero aquí no: quien llega hasta
 * abajo lo hace decidido y no va a volver arriba a comprobar qué incluía. La
 * lista es la misma en versión breve, para que el botón final no quede solo
 * con un precio al lado.
 *
 * ── LA COLUMNA DE LUZ ──
 *
 * Es la misma de la tarjeta de precio de la landing, con los mismos valores.
 * Repetirla es lo que hace que esta card se lea como la misma oferta y no
 * como una segunda distinta.
 */

const RESUMEN = [
  "Activación energética en vivo",
  "Trabajo multidimensional",
  "Grabación completa",
  "Activaciones complementarias",
  "Preparación previa al encuentro",
];

export default function PuenteCierre() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="puente-cierre"
      aria-labelledby="puente-cierre-title"
    >
      <div className="frec-shell">
        <div className="puente-cierre__card" data-reveal>
          <div className="frec-precio__glow" aria-hidden="true" />

          <div className="puente-cierre__body">
            <LightPillar
              className="frec-precio__pillar"
              topColor="#9b7ec8"
              bottomColor="#d4a020"
              intensity={0.85}
              rotationSpeed={0.22}
              glowAmount={0.004}
              pillarWidth={2.4}
              pillarHeight={0.35}
              noiseIntensity={0.35}
              pillarRotation={180}
            />

            <h2 id="puente-cierre-title" className="puente-cierre__title">
              Tu lugar para la <em>{EVENTO.titulo}</em>
            </h2>

            <div className="puente-cierre__cuando">
              <span>
                <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
                10 de octubre
              </span>
              <span>
                <Video size={15} strokeWidth={2} aria-hidden="true" />
                En vivo por Zoom
              </span>
            </div>

            <ul className="puente-cierre__lista">
              {RESUMEN.map((item) => (
                <li key={item}>
                  <Check size={15} strokeWidth={2.8} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="puente-cierre__cifra">
              <span className="puente-cierre__monto">{PRECIO.actual}</span>
              <span className="puente-cierre__nota">{PRECIO.nota}</span>
            </div>

            <CheckoutCta variant="gold" label="Reservar mi lugar ahora" />

            {/* El aviso sólo aparece mientras falte la URL. Va junto al botón
                y no en un comentario del código para que la falta se vea al
                abrir la página, no al leerla. */}
            {!CHECKOUT_URL && (
              <p id="checkout-pendiente" className="puente-cierre__pendiente">
                Falta configurar la URL del checkout en{" "}
                <code>components/activacion-v3/config.ts</code> (
                <code>CHECKOUT_URL</code>). Hasta entonces los botones quedan
                deshabilitados.
              </p>
            )}

            <p className="puente-cierre__micro">
              El siguiente paso te llevará al checkout seguro para completar tu
              inscripción.
            </p>
          </div>
        </div>
      </div>

      <footer className="puente-footer">
        <p>
          © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos
          los derechos reservados
        </p>
      </footer>
    </section>
  );
}
