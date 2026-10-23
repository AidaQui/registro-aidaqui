type Props = {
  /** "cruzada" dibuja dos cintas diagonales que se cruzan. */
  variante?: "recta" | "cruzada";
};

function Tramo() {
  return (
    <span className="av4-marquee__item">
      <span className="av4-marquee__nombre">ACTIVACIÓN</span>
      <span className="av4-marquee__serif">del Corazón y el Poder Interior</span>
    </span>
  );
}

function Cinta({ className = "" }: { className?: string }) {
  return (
    <div className={`av4-band ${className}`.trim()}>
      <div className="av4-band__track">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Tramo key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * Banda salvia con el nombre del evento en bucle. Decorativa (aria-hidden) y
 * quieta con prefers-reduced-motion.
 */
export default function Av4Marquee({ variante = "recta" }: Props) {
  if (variante === "cruzada") {
    return (
      <div className="av4-ribbons" aria-hidden="true">
        <Cinta className="av4-band--a" />
        <Cinta className="av4-band--b" />
      </div>
    );
  }

  return (
    <div aria-hidden="true">
      <Cinta />
    </div>
  );
}
