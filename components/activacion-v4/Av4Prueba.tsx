/* eslint-disable @next/next/no-img-element -- mismos avatares servidos tal cual que en Testimonios */
/**
 * Prueba social: los avatares reales de seis alumnas (los mismos de la sección
 * de testimonios) y la valoración que esa sección ya muestra: "TrustScore 4,9,
 * en base a 82 opiniones" (imagen de Trustpilot). No añade ninguna cifra nueva.
 */
const AVATARES = [
  "santiago.jpeg",
  "oriana.jpeg",
  "martina.jpeg",
  "Bre Dlg.png",
  "isra zgz.png",
  "Mafe Ellingboe.png",
];

export default function Av4Prueba({ className = "" }: { className?: string }) {
  return (
    <a
      href="#av4-testimonios"
      className={`av4-prueba ${className}`.trim()}
      aria-label="TrustScore 4,9 sobre 5 en base a 82 opiniones. Ver testimonios"
    >
      <span className="av4-prueba__pila" aria-hidden="true">
        {AVATARES.map((a) => (
          <img
            key={a}
            src={`/lista-de-espera/testimonios/${encodeURIComponent(a)}`}
            alt=""
            width={36}
            height={36}
            loading="lazy"
            draggable={false}
          />
        ))}
      </span>
      <span className="av4-prueba__txt">
        <span className="av4-prueba__estrellas">
          <img
            src="/lista-de-espera/stars-5.svg"
            alt=""
            aria-hidden="true"
            width={92}
            height={16}
            loading="lazy"
            draggable={false}
          />
          <strong>4,9</strong>
        </span>
        <small>TrustScore · En base a 82 opiniones</small>
      </span>
    </a>
  );
}
