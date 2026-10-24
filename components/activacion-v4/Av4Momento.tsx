import Image from "next/image";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * "Es momento": titular con la parte clave en dorado, párrafos y las cuatro
 * intenciones como tarjetas oscuras numeradas con foto.
 */

const INTENCIONES = [
  {
    texto: "Que puedas escucharte con más honestidad.",
    foto: "/activacion-v4/intencion-1.webp",
  },
  {
    texto:
      "Que reconozcas dónde estás eligiendo por miedo, por costumbre o por la necesidad de aprobación.",
    foto: "/activacion-v4/intencion-2.webp",
  },
  {
    texto:
      "Que vuelvas a dar valor a tus deseos y encuentres un paso concreto para empezar a honrarlos.",
    foto: "/activacion-v4/intencion-3.webp",
  },
  {
    texto:
      "Y que recuperes tu poder para sostener lo que sabes que es verdad para ti: tomar esa decisión, expresar lo que necesitas y dar forma a la vida que de verdad quieres vivir.",
    foto: "/activacion-v4/intencion-4.webp",
  },
];

export default function Av4Momento() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--rosa av4-momento"
      aria-labelledby="av4-momento-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <Av4Tag>Es momento</Av4Tag>
          <h2 id="av4-momento-title" className="av4-title">
            Es momento de darle a lo que sientes{" "}
            <span className="av4-oro">un lugar en la vida que estás creando</span>
            .
          </h2>
        </div>

        <div className="av4-parrafos av4-parrafos--centro" data-reveal>
          <p>Quizá llevas tiempo esperando a sentirte completamente preparada.</p>
          <p>
            A tener más seguridad. A que desaparezca el miedo. A que los demás
            entiendan lo que quieres hacer.
          </p>
          <p>
            Puedes empezar hoy por <strong>escucharte con honestidad</strong> y
            reconocer qué decisión estás dejando en manos de esa espera.
          </p>
        </div>

        <h3 className="av4-subtitulo av4-subtitulo--centro av4-intencion-titulo" data-reveal>
          Mi <span className="av4-oro">intención</span> para este encuentro es:
        </h3>

        <ol className="av4-intenciones" data-reveal-group data-reveal-fade>
          {INTENCIONES.map(({ texto, foto }, i) => (
            <li key={texto} className="av4-intencion">
              <div className="av4-intencion__foto">
                <Image
                  src={foto}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 90vw, 280px"
                  className="av4-cover"
                />
              </div>
              {/* Bloque de alto fijo en escritorio: número y texto arrancan a
                  la misma altura en las cuatro tarjetas aunque los textos
                  tengan largos distintos. */}
              <div className="av4-intencion__texto">
                <span className="av4-intencion__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="av4-gran-cierre" data-reveal>
          Tu corazón tiene una voz.{" "}
          <span className="av4-oro">
            Es momento de darle espacio en tus decisiones.
          </span>
        </p>
      </div>
    </section>
  );
}
