import Av4Sello from "@/components/activacion-v4/Av4Sello";

/** Círculo con el sello sobre una línea fina, entre secciones claras. */
export default function Av4Divisor() {
  return (
    <div className="av4-divisor" aria-hidden="true">
      <span className="av4-divisor__circulo">
        <Av4Sello size={64} />
      </span>
    </div>
  );
}
