import Image from "next/image";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * "Es momento", al estilo Atenza: bloque oscuro ciruela, titular en serif con
 * cursiva y las cuatro intenciones como lista numerada con fotos pequeñas.
 */

const INTENCIONES = [
  {
    texto: "Que puedas escucharte con más honestidad.",
    foto: "/activacion-v4/momento-1.jpg",
  },
  {
    texto:
      "Que reconozcas dónde estás eligiendo por miedo, por costumbre o por la necesidad de aprobación.",
    foto: "/activacion-v4/momento-2.jpg",
  },
  {
    texto:
      "Que vuelvas a dar valor a tus deseos y encuentres un paso concreto para empezar a honrarlos.",
    foto: "/activacion-v4/momento-3.jpg",
  },
  {
    texto:
      "Y que recuperes tu poder para sostener lo que sabes que es verdad para ti: tomar esa decisión, expresar lo que necesitas y dar forma a la vida que de verdad quieres vivir.",
    foto: "/activacion-v4/momento-4.jpg",
  },
];

export default function Av4Momento() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--oscuro av4-momento"
      aria-labelledby="av4-momento-title"
    >
      <div className="av4-wrap">
        <div className="av4-momento__cab">
          <div>
            <p className="av4-corchetes av4-corchetes--izq" data-reveal>
              Es momento
            </p>
            <h2
              id="av4-momento-title"
              className="av4-title av4-title--izq"
              data-reveal="title"
            >
              Es momento de darle a lo que sientes{" "}
              <em className="av4-cursiva">
                un lugar en la vida que estás creando
              </em>
              .
            </h2>

            <div className="av4-parrafos av4-parrafos--oscuro" data-reveal>
              <p>
                Quizá llevas tiempo esperando a sentirte completamente
                preparada.
              </p>
              <p>
                A tener más seguridad. A que desaparezca el miedo. A que los
                demás entiendan lo que quieres hacer.
              </p>
              <p>
                Puedes empezar hoy por <strong>escucharte con honestidad</strong>{" "}
                y reconocer qué decisión estás dejando en manos de esa espera.
              </p>
            </div>
          </div>

          <div className="av4-momento__sello" aria-hidden="true">
            <Av4Sello size={110} />
          </div>
        </div>

        <h3 className="av4-subtitulo av4-subtitulo--izq" data-reveal>
          Mi intención para este encuentro es:
        </h3>

        <ol className="av4-lista-num" data-reveal-group data-reveal-fade>
          {INTENCIONES.map(({ texto, foto }, i) => (
            <li key={texto} className="av4-fila">
              <span className="av4-fila__num">
                {String(i + 1).padStart(2, "0")}/
              </span>
              <p>{texto}</p>
              <div className="av4-fila__foto">
                <Image
                  src={foto}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 40vw, 280px"
                  className="av4-cover"
                />
              </div>
            </li>
          ))}
        </ol>

        <p className="av4-gran-cierre" data-reveal>
          Tu corazón tiene una voz.{" "}
          <em className="av4-cursiva">
            Es momento de darle espacio en tus decisiones.
          </em>
        </p>
      </div>
    </section>
  );
}
