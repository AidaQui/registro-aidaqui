import Av4Sello from "@/components/activacion-v4/Av4Sello";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";

type Props = {
  tamano?: "grande" | "normal" | "chico";
  /** Muestra el sello a la izquierda, como el logotipo de la referencia. */
  sello?: boolean;
  className?: string;
};

/** Logotipo: sello + nombre de la landing (v4: "ACTIVACIÓN / DEL CORAZÓN y el Poder Interior"). */
export default function Av4Lockup({
  tamano = "normal",
  sello = false,
  className = "",
}: Props) {
  const { marca } = useContenido();

  return (
    <p
      className={`av4-lockup av4-lockup--${tamano} ${className}`.trim()}
      aria-label={marca.nombre}
    >
      {sello && <Av4Sello className="av4-lockup__sello" size={96} />}
      <span className="av4-lockup__texto" aria-hidden="true">
        <span className="av4-lockup__l1">{marca.linea1}</span>
        <span className="av4-lockup__l2">
          <span className="av4-lockup__del">{marca.linea2}</span>
          {marca.script && (
            <span className="av4-lockup__script">{marca.script}</span>
          )}
        </span>
      </span>
    </p>
  );
}
