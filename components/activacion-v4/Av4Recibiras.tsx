import Image from "next/image";
import { CircleCheck } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * "Lo que vas a recibir": mockup de imágenes apiladas a la izquierda y lista
 * de verificación a la derecha. Mismo copy que RecibirasSection de /activacion.
 */

type Item = { titulo: string; bajada: string };

const INCLUYE: Item[] = [
  {
    titulo: "Experiencia energética en vivo",
    bajada:
      "Un encuentro guiado junto a Aida para trabajar profundamente sobre tu sistema.",
  },
  {
    titulo: "Canalización y acompañamiento",
    bajada:
      "Un espacio pensado para ayudarte a observar e integrar aquello que esté apareciendo durante el proceso.",
  },
  {
    titulo: "Experiencia en comunidad",
    bajada:
      "Vivirás la activación junto a otras personas que también están atravesando procesos de transformación.",
  },
  {
    titulo: "Grabación completa",
    bajada: "Para que puedas volver a vivir la experiencia posteriormente.",
  },
];

const ACTIVACIONES: Item[] = [
  {
    titulo: "Frecuencia de los milagros",
    bajada: "Una activación para abrir tu campo a lo que aún no ves llegar.",
  },
  {
    titulo: "Limpieza energética diaria",
    bajada: "Una práctica corta para sostener tu frecuencia cada día.",
  },
];

function Lista({ items }: { items: Item[] }) {
  return (
    <ul className="av4-check" data-reveal-group data-reveal-fade>
      {items.map(({ titulo, bajada }) => (
        <li key={titulo} className="av4-check__item">
          <CircleCheck size={20} strokeWidth={1.8} aria-hidden="true" />
          <div>
            <h3>{titulo}</h3>
            <p>{bajada}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Av4Recibiras() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-rec"
      aria-labelledby="av4-rec-title"
    >
      <span className="av4-monograma av4-monograma--rec" aria-hidden="true">
        AQ
      </span>

      <div className="av4-shell av4-rec__grid">
        {/* Tres capas inclinadas, como el mockup de la referencia. */}
        <div className="av4-mock" data-reveal="left" aria-hidden="true">
          <div className="av4-mock__capa av4-mock__capa--3">
            <Image
              src="/activacion-v2/item4.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 360px"
              className="av4-cover"
            />
          </div>
          <div className="av4-mock__capa av4-mock__capa--2">
            <Image
              src="/activacion-v2/item2.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 360px"
              className="av4-cover"
            />
          </div>
          <div className="av4-mock__capa av4-mock__capa--1">
            <Image
              src="/activacion-v2/item1.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 360px"
              className="av4-cover"
            />
          </div>
        </div>

        <div className="av4-rec__copy">
          <p className="av4-eyebrow" data-reveal>
            Tu acceso
          </p>
          <h2 id="av4-rec-title" className="av4-title" data-reveal="title">
            Todo lo que incluye{" "}
            <span className="av4-serif av4-acento">tu acceso</span>
          </h2>

          <Lista items={INCLUYE} />

          <h3 className="av4-rec__sub" data-reveal>
            Además vas a recibir 2 activaciones guiadas complementarias para{" "}
            <strong>continuar integrando</strong>
          </h3>
          <p className="av4-rec__intro" data-reveal>
            <strong>Dos prácticas</strong> para seguir trabajando e integrando
            después del encuentro.
          </p>

          <Lista items={ACTIVACIONES} />

          <div className="av4-rec__cta" data-reveal>
            <Av4Cta href="#av4-precio" />
          </div>
        </div>
      </div>

      <Av4Notch tono="claro" />
    </section>
  );
}
