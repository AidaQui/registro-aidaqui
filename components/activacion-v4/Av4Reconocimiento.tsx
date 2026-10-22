import {
  Layers,
  RefreshCw,
  Antenna,
  BatteryLow,
  DoorOpen,
  Brain,
  Heart,
  Dna,
  Atom,
} from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Bloque centrado de identificación + dolor: primero se nombran síntomas, y
 * después se explica por qué hacen falta cuatro dimensiones. Mismo orden y
 * copy que /activacion.
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

const CUERPOS = [
  {
    Icono: Brain,
    nombre: "Mental",
    texto:
      "Puedes entender qué necesitas hacer y aun así seguir reaccionando como antes.",
  },
  {
    Icono: Heart,
    nombre: "Emocional",
    texto: "Pueden aparecer emociones que todavía necesitan ser procesadas.",
  },
  {
    Icono: Dna,
    nombre: "Físico",
    texto:
      "El cuerpo también puede manifestar saturación, tensión o cansancio.",
  },
  {
    Icono: Atom,
    nombre: "Energético",
    texto:
      "Puedes sentir que algo interno está cambiando aunque todavía no puedas explicarlo.",
  },
];

export default function Av4Reconocimiento() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-reco"
      aria-labelledby="av4-reco-title"
    >
      {/* La letra gigante cruza la sección por detrás del contenido. */}
      <span className="av4-monograma av4-monograma--reco" aria-hidden="true">
        A
      </span>

      <div className="av4-shell">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">Quizás te suene familiar</p>
          <h2 id="av4-reco-title" className="av4-title">
            Quizás no necesitas aprender más. Quizás necesitas{" "}
            <strong className="av4-acento">
              integrar todo lo que ya está sucediendo
            </strong>{" "}
            dentro de ti.
          </h2>
          <p className="av4-lead">Puede que últimamente estés sintiendo que:</p>
        </div>

        <ul className="av4-senales" data-reveal-group data-reveal-fade>
          {SENALES.map(({ Icono, texto }, i) => (
            <li key={i} className="av4-senal">
              <span className="av4-senal__icono" aria-hidden="true">
                <Icono size={20} strokeWidth={1.7} />
              </span>
              <p>{texto}</p>
            </li>
          ))}
        </ul>

        <p className="av4-cierre-texto" data-reveal>
          No siempre se trata de encontrar una nueva respuesta. A veces, el
          verdadero desafío es que{" "}
          <strong>
            todo tu sistema pueda acompañar aquello que tu consciencia ya
            comprendió
          </strong>
          .
        </p>

        <div className="av4-head av4-head--sub" data-reveal>
          <p className="av4-eyebrow">Cuatro dimensiones</p>
          <h3 className="av4-title av4-title--m">
            Porque tú no eres solamente{" "}
            <span className="av4-serif av4-acento">
              la parte de ti que piensa
            </span>
            .
          </h3>
          <p className="av4-lead">
            Cuando atravesamos una transformación, no todas nuestras dimensiones
            cambian al mismo ritmo.
          </p>
        </div>

        <ul className="av4-cuerpos" data-reveal-group data-reveal-fade>
          {CUERPOS.map(({ Icono, nombre, texto }) => (
            <li key={nombre} className="av4-cuerpo">
              <span className="av4-cuerpo__icono" aria-hidden="true">
                <Icono size={22} strokeWidth={1.6} />
              </span>
              <span className="av4-cuerpo__nombre">{nombre}</span>
              <span className="av4-cuerpo__texto">{texto}</span>
            </li>
          ))}
        </ul>

        <div className="av4-remate" data-reveal>
          <p>
            Para integrar una nueva etapa, necesitamos{" "}
            <strong>trabajar más allá de la mente</strong>.
          </p>
        </div>

        <div className="av4-cta-fila" data-reveal>
          <Av4Cta href="#av4-precio" />
        </div>
      </div>

      <Av4Notch tono="claro" />
    </section>
  );
}
