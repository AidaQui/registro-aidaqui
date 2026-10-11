import { useState } from "react";
import { useRouter } from "next/router";
import { CalendarDays, Video } from "lucide-react";
import MasterclassBadge from "@/components/registro-v1/MasterclassBadge";
import { evento, VARIANTE } from "@/components/registro-v1/contenido";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/** UTM con los que la persona llegó a la landing (se guardan con el registro) */
function leerUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const valor = params.get(key);
      return valor ? [[key, valor]] : [];
    })
  );
}

export default function HeroSectionMC() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);

    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: VARIANTE, utm: leerUtm() }),
      });

      if (!resp.ok) {
        throw new Error("No se pudo completar el registro");
      }

      // Conversión en GA4, con la variante para comparar landings
      const { gtag } = window as unknown as { gtag?: (...args: unknown[]) => void };
      gtag?.("event", "registro_completado", { variante: VARIANTE });

      router.push("/registro-v1/gracias");
    } catch {
      setError("Hubo un problema. Por favor, intentá de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <section id="registro" className="hero-section hero-section--mc hero-section--ent" aria-labelledby="hero-title-ent">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">

          <MasterclassBadge />

          {/* La promesa entera es el h1. "Entrenamiento Espiritual Práctico" va
              arriba en grande como gancho, y el resto de la frase la completa. */}
          <h1 id="hero-title-ent" className="hero-title ent-promise">
            <span className="ent-promise__kicker">Entrenamiento Espiritual Práctico</span>{" "}
            para llevar tus años de conocimiento espiritual a{" "}
            <em className="ent-promise__accent">cambios reales</em> en tus
            decisiones, tus relaciones y tu vida cotidiana.
          </h1>

          <p className="hero-description ent-hero-description">
            Ya no necesitas más información o teoría. Necesitas ser la persona
            capaz de <strong>SOSTENER</strong> los cambios que pides.
          </p>

          <form className="mc-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tu nombre completo"
              className="mc-input"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Tu correo"
              className="mc-input"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="pearl-btn" disabled={submitting}>
              <div className="pearl-wrap">
                <p>
                  <span className="pearl-star" aria-hidden="true">✦</span>
                  {submitting ? "Reservando..." : "Reservar mi plaza ahora"}
                  <span className="pearl-star" aria-hidden="true">✦</span>
                </p>
              </div>
            </button>
            {error && <p className="mc-error" role="alert">{error}</p>}
          </form>

          <div className="mc-event-chips" aria-label="Fecha y formato">
            <span className="mc-chip">
              <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
              {evento.fecha.toUpperCase()}
            </span>
            <span className="mc-chip">
              <Video size={15} strokeWidth={2} aria-hidden="true" />
              {evento.formato.toUpperCase()}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
