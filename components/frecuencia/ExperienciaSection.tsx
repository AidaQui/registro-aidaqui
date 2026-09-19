import { Unlink, BatteryCharging, HandHeart, Sparkles, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * "Lo que experimentarás dentro": los cinco puntos de la experiencia.
 *
 * ── SIN IMÁGENES, CON NÚMERO E ICONO ──
 *
 * Esta sección llegó a tener siete tarjetas con fotografía. Se retiraron: las
 * imágenes traían su propio rótulo quemado que repetía el texto de al lado, y
 * siete fotos para cinco ideas cortas la volvían la sección más pesada de la
 * página para lo poco que dice.
 *
 * Cada tarjeta lleva ahora dos marcas: el icono, arriba y a la izquierda, que
 * adelanta de qué va el punto antes de leerlo; y el número, grande y al
 * fondo, que hace de textura.
 *
 * ── EL REPARTO: 3 + 2 ──
 *
 * Tres arriba y dos abajo ocupando la mitad cada una. Cinco es impar, así que
 * alguna fila tiene que repartirse distinto; con 3+2 las dos filas cierran
 * completas y ninguna tarjeta queda suelta.
 */

const PUNTOS = [
  {
    Icono: Unlink,
    texto:
      "Liberación de fugas y cargas energéticas que no te permiten avanzar.",
  },
  {
    Icono: BatteryCharging,
    texto:
      "Aumento de tu capacidad energética para poder procesar e integrar las nuevas frecuencias del planeta.",
  },
  {
    Icono: HandHeart,
    texto:
      "Preparación para recibir y sostener experiencias que conscientemente dices querer.",
  },
  {
    Icono: Sparkles,
    texto:
      "Amplificación de tu energía manifestadora y herramientas para sostener tu frecuencia diaria en la vida real.",
  },
  {
    Icono: Users,
    texto:
      "Un espacio de conexión grupal con personas que están en un proceso espiritual.",
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
        <h2
          id="frec-experiencia-title"
          className="frec-section-title"
          data-reveal="title"
        >
          Lo que experimentarás <em>dentro</em>
        </h2>

        <ul className="frec-exp" data-reveal-group data-reveal-fade>
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
      </div>
    </section>
  );
}
