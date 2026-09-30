import Image from "next/image";
import { CalendarDays, Video } from "lucide-react";
import LightRays from "@/components/masterclass/LightRays";
import CheckoutCta from "@/components/activacion-v3/CheckoutCta";
import { EVENTO, PRECIO } from "@/components/activacion-v3/config";

/**
 * Hero de la página puente: confirmar, no volver a vender.
 *
 * ── POR QUÉ NO REUTILIZA EL HERO DE LA LANDING ──
 *
 * Aquél abre con una pregunta —"¿sientes que estás atravesando...?"— porque
 * habla con alguien que todavía no sabe qué es esto. Quien llega aquí ya lo
 * sabe y ya dijo que sí: repetirle la pregunta lo devuelve a una decisión que
 * ya tomó, que es la forma más cara de perder una conversión.
 *
 * Así que el orden se invierte. Arriba los datos de la transacción —fecha,
 * formato, precio— y el botón; el argumento queda debajo por si hace falta.
 *
 * ── EL LOGOTIPO SE MANTIENE ──
 *
 * Mismo sello y mismo nombre que el hero de la landing. Es lo que dice que no
 * se cambió de sitio ni de marca al pulsar el botón.
 */
export default function PuenteHero() {
  return (
    <section className="puente-hero" aria-labelledby="puente-hero-title">
      <div className="puente-hero__bg" aria-hidden="true" />

      {/* Los mismos rayos del cierre de la landing, con sus valores sin tocar.
          Quien llega aquí acaba de pulsar el botón de esa sección, y repetir
          su luz dice que sigue dentro del mismo recorrido. */}
      <div className="frec-cierre__rays puente-hero__rays" aria-hidden="true">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffd9a0"
          raysSpeed={0.6}
          lightSpread={0.55}
          rayLength={2.2}
          fadeDistance={1.6}
          saturation={1}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.04}
          distortion={0.02}
        />
      </div>

      <div className="puente-hero__shell">
        <div className="frec-hero__marca puente-hero__marca">
          <Image
            src="/favicon.png"
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
            className="frec-hero__sello"
            priority
          />
          <span className="frec-hero__title">{EVENTO.titulo}</span>
        </div>

        <p className="puente-hero__eyebrow">
          Tu lugar para el <strong>10/10</strong> está a un paso
        </p>

        <h1 id="puente-hero-title" className="puente-hero__title">
          Prepara tu sistema para vivir conscientemente uno de los{" "}
          <em>momentos centrales</em> del recorrido energético de octubre.
        </h1>

        <p className="puente-hero__lead">
          Una experiencia en vivo junto a Aida Qui para trabajar sobre tu
          sistema mental, emocional, físico y energético.
        </p>

        {/* LOS TRES DATOS DE LA TRANSACCIÓN, JUNTOS.
            Cuándo, dónde y cuánto es lo único que queda por confirmar, y
            separarlos en distintas zonas de la página obliga a buscarlos. */}
        <div className="puente-hero__datos">
          <div className="puente-hero__dato">
            <CalendarDays size={17} strokeWidth={2} aria-hidden="true" />
            <span>
              <span className="puente-hero__dato-fuerte">10 de octubre</span>
              <span className="puente-hero__dato-pie">{EVENTO.formato}</span>
            </span>
          </div>

          <div className="puente-hero__dato">
            <Video size={17} strokeWidth={2} aria-hidden="true" />
            <span>
              <span className="puente-hero__dato-fuerte">En vivo por Zoom</span>
              <span className="puente-hero__dato-pie">
                Desde cualquier lugar
              </span>
            </span>
          </div>

          <div className="puente-hero__dato puente-hero__dato--precio">
            <span>
              <span className="puente-hero__precio">{PRECIO.actual}</span>
              <span className="puente-hero__dato-pie">
                {PRECIO.nota} · Grabación incluida
              </span>
            </span>
          </div>
        </div>

        <div className="puente-hero__cta">
          <CheckoutCta variant="gold" label="Quiero reservar mi lugar" />
        </div>
      </div>
    </section>
  );
}
