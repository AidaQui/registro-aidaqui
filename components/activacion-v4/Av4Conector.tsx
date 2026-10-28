type Props = {
  /** Color del fondo de la sección SIGUIENTE (la que sube) o de la anterior (si baja). */
  color: string;
  /** "tab": pestaña redondeada con chevron. "onda": curva suave a todo el ancho. */
  variante?: "tab" | "onda";
  /** "sube": la sección de abajo sube sobre la de arriba. "baja": la de arriba cae sobre la de abajo. */
  direccion?: "sube" | "baja";
  /** Color del chevron y del trazo fino. */
  acento?: string;
};

/**
 * Costura entre secciones. Es un hermano de las secciones (no va dentro de
 * ninguna), así que ningún overflow:hidden lo recorta: se monta con margen
 * negativo sobre el borde y toma el color exacto del fondo vecino.
 *
 * - tab: pestaña con una pequeña flecha, como en la referencia.
 * - onda: curva suave; se usa en un par de transiciones para variar.
 */
export default function Av4Conector({
  color,
  variante = "tab",
  direccion = "sube",
  acento = "var(--av4-gold)",
}: Props) {
  return (
    <div
      className={`av4-conector av4-conector--${variante} av4-conector--${direccion}`}
      style={{ ["--c" as string]: color, ["--a" as string]: acento }}
      aria-hidden="true"
    >
      {variante === "tab" ? (
        <>
          <svg viewBox="0 0 160 30" className="av4-conector__tab">
            <path
              d="M0 30 C 30 30 36 1 70 1 L 90 1 C 124 1 130 30 160 30 Z"
              fill="var(--c)"
            />
            <path
              d="M0 30 C 30 30 36 1 70 1 L 90 1 C 124 1 130 30 160 30"
              fill="none"
              stroke="var(--a)"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            <path
              d="M72 12 L80 19 L88 12"
              fill="none"
              stroke="var(--a)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      ) : (
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="av4-conector__onda"
        >
          <path
            d="M0 56 L0 34 C 240 4 480 4 720 24 C 960 44 1200 44 1440 14 L1440 56 Z"
            fill="var(--c)"
          />
          <path
            d="M0 34 C 240 4 480 4 720 24 C 960 44 1200 44 1440 14"
            fill="none"
            stroke="var(--a)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </div>
  );
}
