import { ArrowUpRight } from "lucide-react";
import { CTA_LABEL, LINKS } from "@/components/activacion-v4/config";

type Props = {
  label?: string;
  /** Un ancla hace scroll en la página; por defecto va al checkout externo. */
  href?: string;
  /** "claro" para fondos oscuros: píldora crema con texto ciruela. */
  tono?: "caramelo" | "claro";
  className?: string;
  icono?: React.ReactNode;
};

/** Píldora con un botón circular blanco y una flecha dentro, a la derecha. */
export default function Av4Cta({
  label = CTA_LABEL,
  href = LINKS.registro,
  tono = "caramelo",
  className = "",
  icono,
}: Props) {
  const interno = href.startsWith("#") || href.startsWith("/");

  return (
    <a
      href={href}
      className={`av4-cta av4-cta--${tono} ${className}`.trim()}
      {...(!interno && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span className="av4-cta__label">{label}</span>
      <span className="av4-cta__circulo" aria-hidden="true">
        {icono ?? <ArrowUpRight size={20} strokeWidth={1.6} />}
      </span>
    </a>
  );
}
