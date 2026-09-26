import { CTA_LABEL, LINKS } from "@/components/activacion/config";

type Props = {
  /** "gold" is meant for CTAs sitting on the violet panel. */
  variant?: "violet" | "gold";
  label?: string;
  className?: string;
  /**
   * Un ancla (p. ej. "#frec-precio-title") hace scroll suave dentro de la
   * misma página en vez de abrir el checkout externo. El resto de la landing
   * sigue yendo directo a `LINKS.registro`, así que este prop es opt-in.
   */
  href?: string;
};

/**
 * Single CTA component for the whole landing. The previous version inlined the
 * same sparkle SVG and per-letter span markup in every section, which meant
 * four copies to keep in sync.
 */
export default function FrecuenciaCta({
  variant = "violet",
  label = CTA_LABEL,
  className = "",
  href = LINKS.registro,
}: Props) {
  const classes = [
    "pearl-btn",
    "frec-cta",
    variant === "gold" ? "frec-cta--gold" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isAnchor = href.startsWith("#");

  return (
    <a
      href={href}
      className={classes}
      {...(!isAnchor && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <div className="pearl-wrap">
        <p>
          <span className="pearl-star" aria-hidden="true">
            ✦
          </span>
          {label}
          <span className="pearl-star" aria-hidden="true">
            ✦
          </span>
        </p>
      </div>
    </a>
  );
}
