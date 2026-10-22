import { EVENTO } from "@/components/activacion-v4/config";

type Props = {
  /** "cruzada" dibuja dos cintas diagonales que se cruzan. */
  variante?: "recta" | "cruzada";
};

/** Un tramo de la cinta: el nombre de la marca y la fecha, con un sello. */
function Tramo() {
  return (
    <span className="av4-marquee__item">
      <span className="av4-marquee__nombre">ACTIVACIÓN</span>
      <span className="av4-marquee__serif">del Ser Multidimensional</span>
      <span className="av4-marquee__sello">✦</span>
      <span className="av4-marquee__nombre">{EVENTO.fechaCorta.toUpperCase()}</span>
      <span className="av4-marquee__sello">✦</span>
    </span>
  );
}

function Cinta({ className }: { className?: string }) {
  /* El contenido va duplicado para que el bucle de -50% no deje hueco. */
  return (
    <div className={`av4-band ${className ?? ""}`.trim()}>
      <div className="av4-band__track">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Tramo key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * Banda decorativa con el nombre del evento en bucle. Es puramente decorativa
 * (aria-hidden) y se detiene con prefers-reduced-motion.
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
