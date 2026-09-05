import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";
import {
  startSmoothScroll,
  stopSmoothScroll,
} from "@/components/academia-lista-de-espera/SmoothScroll";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function WaitlistModal({ open, onClose }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Cierre con Escape y bloqueo del scroll de fondo mientras el modal está abierto
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lenis maneja el scroll por su cuenta e ignora overflow:hidden
    stopSmoothScroll();
    document.addEventListener("keydown", handleKeyDown);
    firstFieldRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      startSmoothScroll();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError("");

    if (!phone || !isValidPhoneNumber(phone)) {
      setError("Revisá el número de teléfono.");
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
          source: "academia-lista-de-espera",
        }),
      });

      if (!resp.ok) {
        throw new Error("No se pudo completar el registro");
      }

      router.push("/lista-de-espera/gracias");
    } catch {
      setError("Hubo un problema. Por favor, intentá de nuevo.");
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="espera-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="espera-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="espera-modal__panel">
        <button
          type="button"
          className="espera-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={20} strokeWidth={2} aria-hidden="true" />
        </button>

        <AcademiaBadge />

        <h2 id="espera-modal-title" className="espera-modal__title">
          Entra en la <em>lista de espera</em>
        </h2>

        <p className="espera-modal__lead">
          Déjanos tus datos y sé de las primeras personas en acceder cuando
          abramos la próxima edición.
        </p>

        <form className="mc-form espera-modal__form" onSubmit={handleSubmit}>
          <input
            ref={firstFieldRef}
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
          <PhoneInput
            international
            defaultCountry="ES"
            placeholder="Tu número de teléfono"
            className="espera-phone"
            value={phone}
            onChange={setPhone}
          />
          <button type="submit" className="pearl-btn espera-cta" disabled={submitting}>
            <div className="pearl-wrap">
              <p>
                <span className="pearl-star" aria-hidden="true">✦</span>
                {submitting ? "Enviando..." : "QUIERO ACCEDER"}
                <span className="pearl-star" aria-hidden="true">✦</span>
              </p>
            </div>
          </button>
          {error && <p className="mc-error" role="alert">{error}</p>}
        </form>
      </div>
    </div>
  );
}
