import { useState } from "react";
import { useRouter } from "next/router";
import { CalendarDays, Video } from "lucide-react";
import MasterclassBadge from "@/components/MasterclassBadge";

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
        body: JSON.stringify({ name, email }),
      });

      if (!resp.ok) {
        throw new Error("No se pudo completar el registro");
      }

      router.push("/gracias-masterclass");
    } catch {
      setError("Hubo un problema. Por favor, intentá de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <section className="hero-section hero-section--mc" aria-labelledby="hero-title-mc">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">

          <MasterclassBadge />

          <h1 id="hero-title-mc" className="hero-title">
            Los 3 pasos para acceder al potencial que aún no estás viviendo
          </h1>

          <p className="hero-description">
            Y aprender a sostener la energía, la claridad y la confianza
            necesarias para convertirlo en tu nueva realidad.
          </p>

          <div className="mc-event-chips" aria-label="Fecha y formato">
            <span className="mc-chip">
              <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
              28 DE JUNIO
            </span>
            <span className="mc-chip">
              <Video size={15} strokeWidth={2} aria-hidden="true" />
              ONLINE POR ZOOM
            </span>
          </div>
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
                  <span aria-hidden="true">✧</span>
                  <span aria-hidden="true">✦</span>
                  {submitting ? "Reservando..." : "Reservar mi plaza ahora"}
                </p>
              </div>
            </button>
            {error && <p className="mc-error" role="alert">{error}</p>}
          </form>

        </div>
      </div>
    </section>
  );
}
