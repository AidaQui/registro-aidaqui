import Av4Sello from "@/components/activacion-v4/Av4Sello";

type Props = {
  tamano?: "grande" | "normal" | "chico";
  /** Muestra el sello a la izquierda, como el logotipo de la referencia. */
  sello?: boolean;
  className?: string;
};

/** Logotipo: sello + "ACTIVACIÓN / DEL CORAZÓN y el Poder Interior". */
export default function Av4Lockup({
  tamano = "normal",
  sello = false,
  className = "",
}: Props) {
  return (
    <p
      className={`av4-lockup av4-lockup--${tamano} ${className}`.trim()}
      aria-label="Activación del Corazón y el Poder Interior"
    >
      {sello && <Av4Sello className="av4-lockup__sello" size={96} />}
      <span className="av4-lockup__texto" aria-hidden="true">
        <span className="av4-lockup__l1">ACTIVACIÓN</span>
        <span className="av4-lockup__l2">
          <span className="av4-lockup__del">DEL CORAZÓN</span>
          <span className="av4-lockup__script">y el Poder Interior</span>
        </span>
      </span>
    </p>
  );
}
