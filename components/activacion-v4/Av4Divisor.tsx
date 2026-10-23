import { ChevronDown } from "lucide-react";

/**
 * Separador entre testimonios y "Es momento": dos líneas doradas que se
 * desvanecen hacia los bordes y una flecha en un círculo fino al centro.
 * Lleva el mismo fondo rosa que las secciones de los lados para que no se
 * lea como una franja aparte.
 */
export default function Av4Divisor() {
  return (
    <div className="av4-divisor" aria-hidden="true">
      <div className="av4-divisor__in">
        <span className="av4-divisor__linea" />
        <span className="av4-divisor__flecha">
          <ChevronDown size={18} strokeWidth={1.8} />
        </span>
        <span className="av4-divisor__linea" />
      </div>
    </div>
  );
}
