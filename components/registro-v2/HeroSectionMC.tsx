import { useState } from "react";
import { useRouter } from "next/router";
import { CalendarDays, Video } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import MasterclassBadge from "@/components/registro-v2/MasterclassBadge";
import { evento, VARIANTE } from "@/components/registro-v2/contenido";

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

/** Para cuando el link no trae UTM: el sitio que mandó a la persona y el
 *  fbclid que Meta agrega a los clics desde Facebook e Instagram */
function leerOrigen(): { referrer: string; fbclid: string | null } {
  return {
    referrer: document.referrer,
    fbclid: new URLSearchParams(window.location.search).get("fbclid"),
  };
}

export default function HeroSectionMC() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError("");

    if (!phone || !isValidPhoneNumber(phone)) {
      setError("Revisa el número de teléfono.");
      return;
    }

    setSubmitting(true);

    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: VARIANTE,
          utm: leerUtm(),
          origen: leerOrigen(),
        }),
      });

      if (!resp.ok) {
        throw new Error("No se pudo completar el registro");
      }

      // Conversión en GA4, con la variante para comparar landings
      const { gtag } = window as unknown as { gtag?: (...args: unknown[]) => void };
      gtag?.("event", "registro_completado", { variante: VARIANTE });

      router.push("/registro-v2/gracias");
    } catch {
      setError("Hubo un problema. Por favor, intentá de nuevo.");
      setSubmitting(false);
    }
  }

  return (
    <section id="registro" className="hero-section hero-section--mc hero-section--rv2" aria-labelledby="hero-title-rv2">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">

          <MasterclassBadge />

          {/* La promesa es el h1. Va en mayúsculas por CSS: escrita así en el
              código, los lectores de pantalla no la deletrean. "Años de
              trabajo interior" lleva el reflejo de luz. */}
          <h1 id="hero-title-rv2" className="hero-title rv2-promise">
            3 horas para llevar a la práctica{" "}
            <em className="rv2-promise__accent">años de trabajo interior</em>
          </h1>

          <p className="hero-description rv2-hero-description">
            Para que lo que ya sabes sobre tus miedos, heridas y patrones empiece
            a cambiar cómo decides, cómo te relacionas y qué haces cuando vuelves
            a enfrentarte a las mismas situaciones.
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
            {/* mc-input le da el estilo de los otros campos de esta landing */}
            <PhoneInput
              international
              defaultCountry="ES"
              placeholder="Tu número de teléfono"
              className="mc-input mc-phone"
              value={phone}
              onChange={setPhone}
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
