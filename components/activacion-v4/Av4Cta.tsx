import { ArrowDownRight } from "lucide-react";
import { CTA_LABEL, LINKS } from "@/components/activacion-v4/config";

type Props = {
  label?: string;
  /**
   * Un ancla (p. ej. "#av4-precio") hace scroll dentro de la página; por
   * defecto va al checkout externo, igual que en /activacion.
   */
  href?: string;
  className?: string;
};

/** Botón píldora bronce/dorado con flecha ↘. Único CTA de toda la landing. */
export default function Av4Cta({
  label = CTA_LABEL,
  href = LINKS.registro,
  className = "",
}: Props) {
  /* Anclas y rutas propias se quedan en la pestaña; sólo el checkout externo
     abre una nueva. */
  const interno = href.startsWith("#") || href.startsWith("/");

  return (
    <a
      href={href}
      className={`av4-cta ${className}`.trim()}
      {...(!interno && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span className="av4-cta__label">{label}</span>
      <ArrowDownRight
        size={20}
        strokeWidth={2.2}
        className="av4-cta__arrow"
        aria-hidden="true"
      />
    </a>
  );
}
