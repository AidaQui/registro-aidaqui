import {
  Unlink,
  Wind,
  Antenna,
  BatteryCharging,
  ShieldCheck,
  Mountain,
} from "lucide-react";
import FrecuenciaCta from "@/components/activacion/FrecuenciaCta";
import { LINKS } from "@/components/activacion/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * La presentación de la experiencia y lo que se trabaja dentro, en una pieza.
 *
 * ── POR QUÉ VAN JUNTAS ──
 *
 * Eran dos secciones: una presentaba la Activación y otra listaba lo que se
 * experimenta dentro. Separadas repetían la misma promesa dos veces con otras
 * palabras, y en tráfico frío eso lee como relleno. Ahora el titular presenta
 * y las tarjetas concretan: una sola idea con su desarrollo.
 *
 * Es también el primer momento de la página en que se nombra el producto. Las
 * dos secciones anteriores describen lo que le pasa a la persona; ésta abre
 * con "por eso creamos", que es lo que convierte ese síntoma en una respuesta.
 *
 * ── SIN IMÁGENES, CON NÚMERO E ICONO ──
 *
 * Esta sección llegó a tener siete tarjetas con fotografía. Se retiraron: las
 * imágenes traían su propio rótulo quemado que repetía el texto de al lado, y
 * siete fotos para ideas cortas la volvían la sección más pesada de la página
 * para lo poco que dice.
 *
 * Cada tarjeta lleva dos marcas: el icono, arriba y a la izquierda, que
 * adelanta de qué va el punto antes de leerlo; y el número, grande y al
 * fondo, que hace de textura.
 */

const PUNTOS = [
  {
    Icono: Unlink,
    texto: "Liberar carga interna y energética.",
  },
  {
    Icono: Wind,
    texto: "Generar mayor espacio mental y emocional.",
  },
  {
    Icono: Antenna,
    texto: "Reconectar con tu intuición.",
  },
  {
    Icono: BatteryCharging,
    texto: "Aumentar tu capacidad de integración.",
  },
  {
    Icono: ShieldCheck,
    texto: "Regular tu sistema frente a nuevos cambios.",
  },
  {
    Icono: Mountain,
    texto: "Sostener una nueva etapa desde mayor coherencia.",
  },
];

export default function ExperienciaSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-experiencia"
      aria-labelledby="frec-experiencia-title"
    >
      <div className="frec-shell">
        <div className="frec-experiencia__intro">
          <h2
            id="frec-experiencia-title"
            className="frec-section-title"
            data-reveal="title"
          >
            Por eso creamos la <em>Activación del Ser Multidimensional</em>
          </h2>

          <p className="frec-experiencia__lead" data-reveal>
            Una experiencia energética guiada diseñada para trabajar
            profundamente con tu sistema y acompañarte a integrar el momento
            que estás atravesando.
          </p>

          <p className="frec-experiencia__sub" data-reveal>
            Durante la activación vamos a trabajar para que puedas:
          </p>
        </div>

        <ul className="frec-exp frec-exp--seis" data-reveal-group data-reveal-fade>
          {PUNTOS.map(({ Icono, texto }, i) => (
            <li key={i} className="frec-exp__card">
              {/* El número es fondo, no dato: va detrás de todo, cortado por
                  el borde, y de ahí el aria-hidden. */}
              <span className="frec-exp__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="frec-exp__icono" aria-hidden="true">
                <Icono size={22} strokeWidth={1.7} />
              </span>

              <p className="frec-exp__texto">{texto}</p>
            </li>
          ))}
        </ul>

        <div className="frec-experiencia__cta" data-reveal>
          <FrecuenciaCta
            href={LINKS.puente}
            label="Quiero vivir esta activación"
          />
        </div>
      </div>
    </section>
  );
}
