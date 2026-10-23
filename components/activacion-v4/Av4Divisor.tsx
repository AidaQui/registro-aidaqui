import Av4Sello from "@/components/activacion-v4/Av4Sello";

/** Línea fina dorada con el sello de cera al centro; separador compacto. */
export default function Av4Divisor() {
  return (
    <div className="av4-divisor" aria-hidden="true">
      <span className="av4-divisor__linea" />
      <Av4Sello size={64} className="av4-divisor__sello" />
      <span className="av4-divisor__linea" />
    </div>
  );
}
