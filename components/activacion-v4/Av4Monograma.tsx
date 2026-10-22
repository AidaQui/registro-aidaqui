type Props = {
  /** Posición/tamaño: lo decide el CSS según la sección. */
  variante: "hero" | "video" | "precio" | "faq" | "gracias";
};

/**
 * La letra gigante decorativa: una "A" serif en degradado salvia, el
 * equivalente de la "B" de cinta de la referencia. Sólo decorativa.
 */
export default function Av4Monograma({ variante }: Props) {
  return (
    <span
      className={`av4-mono av4-mono--${variante}`}
      aria-hidden="true"
    >
      A
    </span>
  );
}
