import { aprendizajes } from "@/components/registro-v2/contenido";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Degradé de los íconos: lo usan por id (stroke="url(#...)"). */
const REFLEJO_ID = "rv2-learn-reflejo";

// Lo que se comprende en el entrenamiento. Los ítems van a propósito sin
// recuadro, sin color de fondo y sin animación: ícono de línea y texto grande.
// El único adorno es el reflejo naranja fijo de los íconos.
export default function ClassContentSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="class-content" aria-labelledby="class-content-title">
      <div className="class-content-bg" aria-hidden="true" />

      {/* Trazo de los íconos: naranja con un brillo damasco claro arriba a la
          izquierda, como si les diera la luz. En userSpaceOnUse (la grilla de
          24 de lucide) y no por caja: las líneas rectas del ancla tienen caja
          de ancho 0 y con objectBoundingBox no se pintarían. */}
      <svg className="rv2-learn-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={REFLEJO_ID} gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
            <stop offset="0%" stopColor="#ffe3b8" />
            <stop offset="38%" stopColor="#fc9c51" />
            <stop offset="100%" stopColor="#d9692a" />
          </linearGradient>
        </defs>
      </svg>

      <div className="class-content-shell">
        <h2 id="class-content-title" className="class-content-title" data-reveal="title">
          Un entrenamiento espiritual en el que comprenderás:
        </h2>

        <ul className="rv2-learn-list">
          {aprendizajes.map(({ icon: Icon, text }, i) => (
            <li key={i} className="rv2-learn-item">
              <span className="rv2-learn-item__icon" aria-hidden="true">
                <Icon size={28} strokeWidth={2} color={`url(#${REFLEJO_ID})`} />
              </span>
              <p className="rv2-learn-item__text">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
