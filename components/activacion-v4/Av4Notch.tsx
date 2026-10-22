import { ChevronDown } from "lucide-react";

/**
 * La muesca de la referencia: una pestaña clara en V con un chevron que
 * cuelga de una sección clara hacia la oscura siguiente. La sección que la
 * contiene debe tener position: relative y overflow visible.
 */
export default function Av4Notch() {
  return (
    <div className="av4-notch" aria-hidden="true">
      <svg viewBox="0 0 96 26" preserveAspectRatio="none">
        <path d="M0 0 C 24 0, 30 26, 48 26 C 66 26, 72 0, 96 0 Z" />
      </svg>
      <ChevronDown size={14} strokeWidth={2.4} />
    </div>
  );
}
