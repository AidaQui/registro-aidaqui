import { ChevronDown } from "lucide-react";

type Props = {
  /** Color de la pestaña: el de la sección de la que cuelga. */
  tono: "oscuro" | "claro";
};

/**
 * La "muesca": una pestaña en V con un chevron que cuelga del borde inferior
 * de una sección y la une con la siguiente. La sección anterior debe tener
 * position: relative y overflow visible.
 */
export default function Av4Notch({ tono }: Props) {
  return (
    <div className={`av4-notch av4-notch--${tono}`} aria-hidden="true">
      <svg viewBox="0 0 96 26" preserveAspectRatio="none">
        <path d="M0 0 C 24 0, 30 26, 48 26 C 66 26, 72 0, 96 0 Z" />
      </svg>
      <ChevronDown size={14} strokeWidth={2.4} />
    </div>
  );
}
