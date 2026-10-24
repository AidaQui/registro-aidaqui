import { ArrowUpRight } from "lucide-react";
import Av4WhatsAppIcon from "@/components/activacion-v4/Av4WhatsAppIcon";
import { CTA_LABEL, LINKS } from "@/components/activacion-v4/config";

type Props = {
  label?: string;
  /** Un ancla hace scroll en la página; por defecto va al checkout externo. */
  href?: string;
  className?: string;
  icono?: React.ReactNode;
  /** "verde" es el botón de WhatsApp/soporte: misma forma, otro color. */
  variante?: "oro" | "verde";
  /** Dónde está el botón de compra; el panel de Sierra lo muestra para saber cuál se usó. */
  ubicacion?: string;
};

/** CTA principal: dorado con brillo, círculo con flecha y sombra de color. */
export default function Av4Cta({
  label = CTA_LABEL,
  href = LINKS.registro,
  className = "",
  icono,
  variante = "oro",
  ubicacion,
}: Props) {
  const interno = href.startsWith("#") || href.startsWith("/");
  // PixelBridge no es un dominio de checkout que el kit de Sierra reconozca:
  // se marca a mano para que el panel cuente el clic al checkout.
  const checkout = href === LINKS.registro;

  return (
    <a
      href={href}
      className={`av4-cta av4-cta--${variante} ${className}`.trim()}
      {...(!interno && { target: "_blank", rel: "noopener noreferrer" })}
      {...(checkout && { "data-sierra": "checkout", "data-sierra-target": ubicacion ? `Checkout 27€ · ${ubicacion}` : "Checkout 27€" })}
    >
      {icono}
      <span className="av4-cta__label">{label}</span>
      <span className="av4-cta__circulo" aria-hidden="true">
        {variante === "verde" ? (
          <Av4WhatsAppIcon />
        ) : (
          <ArrowUpRight size={22} strokeWidth={2.4} />
        )}
      </span>
    </a>
  );
}
