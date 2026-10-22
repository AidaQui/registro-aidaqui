import { ArrowDownRight } from "lucide-react";
import { CTA_LABEL, LINKS } from "@/components/activacion-v4/config";

type Props = {
  label?: string;
  /** Un ancla hace scroll en la página; por defecto va al checkout externo. */
  href?: string;
  /** "pildora" es el botón de las secciones; "caja" el de la tarjeta de precio. */
  forma?: "pildora" | "caja";
  className?: string;
  /** Sustituye la flecha ↘ (p. ej. por el icono de WhatsApp). */
  icono?: React.ReactNode;
};

/** CTA bronce con texto en mayúsculas y flecha ↘, como en la referencia. */
export default function Av4Cta({
  label = CTA_LABEL,
  href = LINKS.registro,
  forma = "pildora",
  className = "",
  icono,
}: Props) {
  const interno = href.startsWith("#") || href.startsWith("/");

  return (
    <a
      href={href}
      className={`av4-cta av4-cta--${forma} ${className}`.trim()}
      {...(!interno && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {icono}
      <span className="av4-cta__label">{label}</span>
      {!icono && (
        <ArrowDownRight
          size={20}
          strokeWidth={2.2}
          className="av4-cta__arrow"
          aria-hidden="true"
        />
      )}
    </a>
  );
}
