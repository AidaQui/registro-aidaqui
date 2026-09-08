import { useEffect } from "react";
import { X } from "lucide-react";
import type { Testimonial } from "@/components/academia-lista-de-espera/testimonials-data";
import { getInitials } from "@/components/academia-lista-de-espera/testimonials-data";
import {
  startSmoothScroll,
  stopSmoothScroll,
} from "@/components/academia-lista-de-espera/SmoothScroll";

type Props = {
  testimonial: Testimonial | null;
  onClose: () => void;
};

export default function TestimonialModal({ testimonial, onClose }: Props) {
  useEffect(() => {
    if (!testimonial) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lenis maneja el scroll por su cuenta e ignora overflow:hidden
    stopSmoothScroll();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      startSmoothScroll();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [testimonial, onClose]);

  if (!testimonial) return null;

  return (
    <div
      className="testi-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testi-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="testi-modal__panel">
        <button
          type="button"
          className="testi-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={20} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="testi-modal__header">
          <span className="testi-card__avatar" aria-hidden="true">
            {testimonial.avatar ? (
              <img
                src={`/lista-de-espera/testimonios/${encodeURIComponent(
                  testimonial.avatar
                )}`}
                alt=""
                width={56}
                height={56}
              />
            ) : (
              getInitials(testimonial.name)
            )}
          </span>

          <span className="testi-modal__who">
            <span className="testi-card__name">{testimonial.name}</span>
            <span className="testi-card__meta">
              {testimonial.country} · {testimonial.date}
            </span>
          </span>
        </div>

        <img
          src="/lista-de-espera/stars-5.svg"
          alt="5 de 5 estrellas"
          width={116}
          height={20}
          className="testi-card__stars"
        />

        <h3 id="testi-modal-title" className="testi-modal__title">
          {testimonial.title}
        </h3>

        <div className="testi-modal__body">
          {testimonial.body.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
