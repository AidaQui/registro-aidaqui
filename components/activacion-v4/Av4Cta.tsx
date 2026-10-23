import { ArrowUpRight } from "lucide-react";
import { CTA_LABEL, LINKS } from "@/components/activacion-v4/config";

type Props = {
  label?: string;
  /** Un ancla hace scroll en la página; por defecto va al checkout externo. */
  href?: string;
  className?: string;
  icono?: React.ReactNode;
};

/** Botón rectangular con degradado dorado a crema y flecha ↗. */
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
      <span>{label}</span>
      {!icono && <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />}
    </a>
  );
}
