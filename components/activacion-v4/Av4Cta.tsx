import { ArrowUpRight } from "lucide-react";
import { CTA_LABEL, LINKS } from "@/components/activacion-v4/config";

type Props = {
  label?: string;
  /** Un ancla hace scroll en la página; por defecto va al checkout externo. */
  href?: string;
  className?: string;
  icono?: React.ReactNode;
};

/** CTA principal: dorado con brillo, círculo oscuro con flecha y sombra dorada. */
export default function Av4Cta({
  label = CTA_LABEL,
  href = LINKS.registro,
  className = "",
  icono,
}: Props) {
  const interno = href.startsWith("#") || href.startsWith("/");

  return (
    <a
      href={href}
      className={`av4-cta ${className}`.trim()}
      {...(!interno && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {icono}
      <span className="av4-cta__label">{label}</span>
      <span className="av4-cta__circulo" aria-hidden="true">
        <ArrowUpRight size={22} strokeWidth={2.4} />
      </span>
    </a>
  );
}
