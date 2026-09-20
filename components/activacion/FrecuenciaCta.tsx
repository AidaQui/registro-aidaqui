import { CTA_LABEL, LINKS } from "@/components/activacion/config";

type Props = {
  /** "gold" is meant for CTAs sitting on the violet panel. */
  variant?: "violet" | "gold";
  label?: string;
  className?: string;
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
}: Props) {
  const classes = [
    "pearl-btn",
    "frec-cta",
    variant === "gold" ? "frec-cta--gold" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={LINKS.registro}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
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
