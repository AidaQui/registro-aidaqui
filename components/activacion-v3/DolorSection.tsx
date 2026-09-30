import { Brain, Heart, Dna, Atom } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Por qué hace falta trabajar cuatro dimensiones y no sólo entender.
 *
 * ── QUÉ CAMBIÓ Y POR QUÉ ──
 *
 * La sección llevaba, además de las cuatro dimensiones, cinco frases con el
 * patrón "puedes X y sin embargo Y" y un remate largo. Se retiraron: esas
 * frases decían lo mismo que la sección de identificación que ahora va
 * delante, y dos secciones seguidas nombrando síntomas hacen que la segunda
 * se lea como repetición.
 *
 * Lo que queda es sólo la explicación: cada dimensión con un ejemplo de cómo
 * se desacompasa. El ejemplo va DENTRO de la tarjeta y no en una lista aparte
 * porque pertenece a la dimensión que nombra; separado obligaba a la persona a
 * emparejar frase y dimensión por su cuenta.
 *
 * ── LAS CUATRO DIMENSIONES ──
 *
 * Son la promesa concreta de lo que se va a trabajar, y el titular las prepara
 * negando la premisa de que con entender alcanza.
 */

/*
 * Cada cuerpo lleva un fondo propio y su icono en grande por detrás del
 * nombre, a modo de segundo fondo.
 *
 * EL FONDO ES CSS, NO UNA FOTO. Las catorce imágenes de la carpeta ya están
 * repartidas entre las secciones de experiencia y de entregables, y repetir
 * cuatro de ellas aquí se nota a media página de distancia. Un degradado por
 * cuerpo —el tono lo pone `data-cuerpo` en globals.css— da fondo distinto a
 * cada tarjeta, no pesa nada y deja el icono legible por delante, que es lo
 * que una foto con detalle no permitiría.
 */
const CUERPOS = [
  {
    Icono: Brain,
    nombre: "Mental",
    clave: "mental",
    texto:
      "Puedes entender qué necesitas hacer y aun así seguir reaccionando como antes.",
  },
  {
    Icono: Heart,
    nombre: "Emocional",
    clave: "emocional",
    texto: "Pueden aparecer emociones que todavía necesitan ser procesadas.",
  },
  /* La hélice: el cuerpo físico por lo que lo compone. Además enlaza con
     Academia ADN, que es de donde viene toda la marca. */
  {
    Icono: Dna,
    nombre: "Físico",
    clave: "fisico",
    texto:
      "El cuerpo también puede manifestar saturación, tensión o cansancio.",
  },
  /* Un átomo: lo energético entendido como la materia de la que está hecho
     todo, que es más preciso que una llama o unas chispas. */
  {
    Icono: Atom,
    nombre: "Energético",
    clave: "energetico",
    texto:
      "Puedes sentir que algo interno está cambiando aunque todavía no puedas explicarlo.",
  },
];

export default function DolorSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    // frec-dolor--v3 separa esta versión de la v2, que comparte .frec-dolor:
    // el fondo del encabezado sólo debe aparecer aquí.
    <section
      ref={ref}
      className="frec-dolor frec-dolor--v3"
      aria-labelledby="frec-dolor-title"
    >
      <div className="frec-shell">
        <div className="frec-intro">
          {/* EL EJE PASA A SER EL TITULAR.

              Antes esta frase iba suelta en mitad de la sección y el titular
              presentaba la experiencia. Pero la experiencia ya se presenta más
              abajo, y aquí lo que toca es explicar POR QUÉ hacen falta cuatro
              dimensiones. Esa explicación empieza por negar la premisa de que
              con entender alcanza, y eso es justo lo que dice esta frase. */}
          <h2
            id="frec-dolor-title"
            className="frec-intro__title"
            data-reveal="title"
          >
            Porque tú no eres solamente{" "}
            <em>la parte de ti que piensa</em>.
          </h2>

          <p className="frec-intro__lead" data-reveal>
            Cuando atravesamos una transformación, no todas nuestras dimensiones
            cambian al mismo ritmo.
          </p>
        </div>

        {/* El nombre va en blanco sobre el dorado, con un velo que lo apaga
            por abajo: el dorado tiene brillos casi blancos y sin ese velo el
            texto se perdería contra ellos. Las reglas están en globals.css
            bajo .frec-cuerpos[data-tipo="clara"]. */}
        <ul
          className="frec-cuerpos"
          data-tipo="clara"
          data-reveal-group
          data-reveal-fade
        >
          {CUERPOS.map(({ Icono, nombre, clave, texto }) => (
            <li key={nombre} className="frec-cuerpo" data-cuerpo={clave}>
              {/* El icono es fondo, no ilustración: va detrás del nombre, a
                  gran tamaño y recortado por la tarjeta. De ahí que sea
                  aria-hidden y que el nombre viaje en su propio span. */}
              <span className="frec-cuerpo__marca" aria-hidden="true">
                <Icono size={120} strokeWidth={1.1} />
              </span>
              <span className="frec-cuerpo__nombre">{nombre}</span>
              {/* La dimensión sola no dice nada a quien llega de frío: el
                  ejemplo es lo que la vuelve reconocible. */}
              <span className="frec-cuerpo__texto">{texto}</span>
            </li>
          ))}
        </ul>

        {/* El remate en panel violeta: es la única pieza oscura de la sección
            y por eso cierra. Una sola frase, que es la conclusión que las
            cuatro tarjetas dejan servida. */}
        <div className="frec-remate" data-reveal>
          <p className="frec-remate__texto">
            Para integrar una nueva etapa, necesitamos{" "}
            <strong>trabajar más allá de la mente</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
