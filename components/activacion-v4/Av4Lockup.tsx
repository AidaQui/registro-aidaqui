type Props = {
  /** "grande" para la tarjeta de precio, "normal" en el hero, "chico" en el pie. */
  tamano?: "grande" | "normal" | "chico";
  className?: string;
};

/**
 * El logotipo a dos líneas, adaptado del DERMA / PRO de la referencia:
 * ACTIVACIÓN arriba; DEL SER y "Multidimensional" en serif cursiva abajo.
 */
export default function Av4Lockup({ tamano = "normal", className = "" }: Props) {
  return (
    <p
      className={`av4-lockup av4-lockup--${tamano} ${className}`.trim()}
      aria-label="Activación del Ser Multidimensional"
    >
      <span className="av4-lockup__l1" aria-hidden="true">
        ACTIVACIÓN
      </span>
      <span className="av4-lockup__l2" aria-hidden="true">
        <span className="av4-lockup__del">DEL SER</span>
        <span className="av4-lockup__script">Multidimensional</span>
      </span>
    </p>
  );
}
