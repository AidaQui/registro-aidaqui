import FrecuenciaBadge from "@/components/frecuencia/FrecuenciaBadge";
import FrecuenciaCta from "@/components/frecuencia/FrecuenciaCta";
import { EVENTO, HORARIOS } from "@/components/frecuencia/config";

export default function HeroFrecuencia() {
  return (
    <section className="frec-hero" aria-labelledby="frec-hero-title">
      <div className="frec-hero__bg" aria-hidden="true" />

      <div className="frec-hero__shell">
        <div className="frec-hero__copy">
          <FrecuenciaBadge>
            {EVENTO.formato} · {EVENTO.fechaCorta}
          </FrecuenciaBadge>

          <h1 id="frec-hero-title" className="frec-hero__title">
            Hay una parte de ti que ya no puede seguir viviendo{" "}
            <em className="frec-hero__accent">desconectada de su verdad</em>.
          </h1>

          <p className="frec-hero__lead">
            Una experiencia profunda diseñada para liberar bloqueos energéticos,
            reconectar con tu intuición y volver a sentirte alineada contigo.
          </p>

          <FrecuenciaCta />

          <ul className="frec-schedules" aria-label="Horarios por país">
            {HORARIOS.map(({ pais, hora }) => (
              <li key={pais} className="frec-schedule">
                <span className="frec-schedule__country">{pais}</span>
                <span className="frec-schedule__time">{hora}</span>
              </li>
            ))}
          </ul>

          <p className="frec-hero__note">
            Plazas limitadas · Acceso en vivo con acompañamiento
          </p>
        </div>
      </div>
    </section>
  );
}
