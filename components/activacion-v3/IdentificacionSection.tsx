import {
  Layers,
  RefreshCw,
  Antenna,
  BatteryLow,
  DoorOpen,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * La primera sección después del hero: reconocimiento antes de explicación.
 *
 * ── POR QUÉ VA AQUÍ Y NO MÁS ABAJO ──
 *
 * La página recibe tráfico frío. Antes de esta sección la narrativa arrancaba
 * directamente en el marco espiritual —las cuatro dimensiones, la consciencia
 * planetaria—, que da por supuesto un contexto que quien llega por primera vez
 * no tiene: se lee como jerga y se abandona.
 *
 * Esta sección no explica nada. Sólo nombra síntomas. Quien se reconoce en
 * tres de los cinco sigue leyendo, y ya llega a las cuatro dimensiones con una
 * pregunta propia en la cabeza en vez de una definición ajena.
 *
 * ── POR QUÉ SON TARJETAS Y NO UNA LISTA ──
 *
 * Es contenido para escanear, no para leer seguido: nadie lee cinco síntomas
 * de corrido buscando el suyo. En tarjetas con icono cada punto se identifica
 * antes de leerse, y el ojo se detiene sólo en el que le habla.
 *
 * Comparten la retícula 3+2 de .frec-exp —tres arriba, dos abajo repartidas—
 * porque también son cinco y el problema es el mismo. El peso visual es menor
 * a propósito: aquí todavía no se vende, se acompaña.
 */

const SENALES = [
  {
    Icono: Layers,
    texto: "Estás atravesando muchos cambios al mismo tiempo.",
  },
  {
    Icono: RefreshCw,
    texto:
      "Entiendes ciertas cosas mentalmente, pero sigues repitiendo patrones.",
  },
  {
    Icono: Antenna,
    texto: "Tu sensibilidad o tu intuición aumentaron.",
  },
  {
    Icono: BatteryLow,
    texto: "Hay momentos de cansancio, saturación o confusión.",
  },
  {
    Icono: DoorOpen,
    texto:
      "Sientes que una etapa terminó, pero todavía no terminas de habitar la siguiente.",
  },
];

export default function IdentificacionSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-ident"
      aria-labelledby="frec-ident-title"
    >
      <div className="frec-shell">
        <div className="frec-ident__intro">
          <h2
            id="frec-ident-title"
            className="frec-ident__title"
            data-reveal="title"
          >
            Quizás no necesitas aprender más. Quizás necesitas{" "}
            <em>integrar todo lo que ya está sucediendo</em> dentro de ti.
          </h2>

          <p className="frec-ident__lead" data-reveal>
            Puede que últimamente estés sintiendo que:
          </p>
        </div>

        <ul className="frec-ident__lista" data-reveal-group data-reveal-fade>
          {SENALES.map(({ Icono, texto }, i) => (
            <li key={i} className="frec-ident__card">
              <span className="frec-ident__icono" aria-hidden="true">
                <Icono size={20} strokeWidth={1.7} />
              </span>

              <p className="frec-ident__texto">{texto}</p>
            </li>
          ))}
        </ul>

        {/* El cierre reformula los cinco síntomas como un solo problema, y ese
            problema es justo el que la sección siguiente desarma en cuatro
            dimensiones. Es la bisagra entre reconocerse y entender. */}
        <p className="frec-ident__cierre" data-reveal>
          No siempre se trata de encontrar una nueva respuesta. A veces, el
          verdadero desafío es que{" "}
          <strong>
            todo tu sistema pueda acompañar aquello que tu consciencia ya
            comprendió
          </strong>
          .
        </p>
      </div>
    </section>
  );
}
