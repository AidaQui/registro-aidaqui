import { useState } from "react";
import { useRouter } from "next/router";
import { Sparkles, CalendarDays, Video } from "lucide-react";

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
    <section className="hero-section" aria-labelledby="hero-title-mc">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">

          <div className="mc-badge" aria-label="Tipo de evento">
            <Sparkles size={14} strokeWidth={2.2} aria-hidden="true" />
            MASTERCLASS GRATUITA
          </div>

          <h1 id="hero-title-mc" className="hero-title">
            Los 3 pasos para acceder al potencial que aún no estás viviendo
          </h1>

          <p className="hero-description">
            Y aprender a sostener la energía, la claridad y la confianza
            necesarias para convertirlo en tu nueva realidad.
          </p>

          <form className="mc-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="tu nombre completo"
              className="mc-input"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="tu correo"
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

          <div className="mc-date-info" aria-label="Fecha y formato">
            <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
            <span>28 de junio</span>
            <span className="mc-date-sep" aria-hidden="true">·</span>
            <Video size={15} strokeWidth={2} aria-hidden="true" />
            <span>online por zoom</span>
          </div>

        </div>
      </div>
    </section>
  );
}
