import FrecuenciaCta from "@/components/frecuencia/FrecuenciaCta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * "¿Qué recibirás?": los entregables de la experiencia.
 *
 * ── LA TARJETA ──
 *
 * Fotografía a sangre, píldora con el número arriba, y abajo el título y su
 * bajada en blanco. El contraste lo da una sombra interior en el borde
 * inferior, no un velo sobre toda la pieza: así la mitad de arriba de la foto
 * se ve limpia y sólo se oscurece lo que hay detrás del texto.
 *
 * La sección llevaba antes un panel violeta con tarjetas de imagen inclinadas
 * en 3D. Se retiró entero: el panel encajonaba la sección dentro de un
 * rectángulo y las inclinaciones competían con la fotografía.
 *
 * ── DOS BLOQUES, UN MISMO FORMATO ──
 *
 * Lo que incluye el encuentro y las dos activaciones posteriores son la misma
 * clase de contenido —cosas que la persona recibe—, así que comparten
 * tarjeta. Lo que los separa es el subtítulo y la numeración, que en las
 * activaciones arranca de nuevo.
 *
 * ── LAS IMÁGENES ──
 *
 * `foto` queda a null hasta que lleguen los archivos definitivos. Sin foto la
 * tarjeta cae a su degradado de respaldo y se ve entera igual, así que la
 * sección se puede montar y revisar antes de tenerlas.
 */

type Tarjeta = {
  titulo: string;
  bajada: string;
  /** Imagen de fondo. */
  foto?: string;
};

const INCLUYE: Tarjeta[] = [
  {
    titulo: "Experiencia energética en vivo",
    bajada: "Guiada por Aida Qui, en directo y en tiempo real.",
    foto: "/activacion-v2/item1.jpg",
  },
  {
    titulo: "Canalización personalizada",
    bajada: "Para el grupo, en directo, según lo que pida el momento.",
    foto: "/activacion-v2/item2.jpg",
  },
  {
    titulo: "Conexión en comunidad",
    bajada:
      "Un encuentro profundo con almas de diferentes partes del mundo.",
    foto: "/activacion-v2/item3.jpg",
  },
  {
    titulo: "La grabación completa",
    bajada: "El encuentro en vivo entero, para volver cuando lo necesites.",
    foto: "/activacion-v2/item4.jpg",
  },
];

const ACTIVACIONES: Tarjeta[] = [
  {
    titulo: "Frecuencia de los milagros",
    bajada: "Una activación para abrir tu campo a lo que aún no ves llegar.",
    foto: "/activacion-v2/item5.jpg",
  },
  {
    titulo: "Limpieza energética diaria",
    bajada: "Una práctica corta para sostener tu frecuencia cada día.",
    foto: "/activacion-v2/item6.jpg",
  },
];

type CardProps = {
  tarjeta: Tarjeta;
  numero: number;
};

function Card({ tarjeta, numero }: CardProps) {
  const { titulo, bajada, foto } = tarjeta;

  return (
    <li
      className="frec-rec__card"
      /* La foto viaja como variable CSS: así el respaldo cuando no hay
         imagen es una regla, no una rama en el marcado. */
      style={
        foto
          ? ({ "--foto": `url("${foto}")` } as React.CSSProperties)
          : undefined
      }
    >
      <span className="frec-rec__pill">
        {String(numero).padStart(2, "0")}
      </span>

      <div className="frec-rec__texto">
        <h3 className="frec-rec__titulo">{titulo}</h3>
        <p className="frec-rec__bajada">{bajada}</p>
      </div>
    </li>
  );
}

export default function RecibirasSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-recibiras"
      aria-labelledby="frec-recibiras-title"
    >
      <div className="frec-shell">
        <h2
          id="frec-recibiras-title"
          className="frec-section-title"
          data-reveal="title"
        >
          ¿Qué <em>recibirás</em>?
        </h2>

        <ul className="frec-rec" data-reveal-group data-reveal-fade>
          {INCLUYE.map((t, i) => (
            <Card key={t.titulo} tarjeta={t} numero={i + 1} />
          ))}
        </ul>

        <div className="frec-rec__bloque">
          <h3 className="frec-rec__subtitulo" data-reveal="title">
            Dos activaciones guiadas para integrar{" "}
            <em>después del encuentro</em>
          </h3>

          <p className="frec-rec__intro" data-reveal>
            <strong>Dos prácticas poderosas</strong> para ayudarte a limpiar
            cargas energéticas, recalibrar tu energía y sostener esta nueva
            etapa de tu vida.
          </p>

          <ul
            className="frec-rec frec-rec--dos"
            data-reveal-group
            data-reveal-fade
          >
            {/* La numeración sigue desde el bloque anterior —05 y 06— porque
                las activaciones son parte de lo mismo: lo que se recibe. */}
            {ACTIVACIONES.map((t, i) => (
              <Card
                key={t.titulo}
                tarjeta={t}
                numero={INCLUYE.length + i + 1}
              />
            ))}
          </ul>
        </div>

        <div className="frec-rec__cta" data-reveal>
          <FrecuenciaCta />
        </div>
      </div>
    </section>
  );
}
