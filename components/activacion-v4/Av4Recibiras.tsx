import Image from "next/image";
import { CircleCheck } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * "Vas a aprender" de la referencia: collage de tarjetas inclinadas a la
 * izquierda y titular + lista de verificación a la derecha. Copy de
 * RecibirasSection de /activacion, reducido a los títulos.
 */

const ITEMS = [
  "Experiencia energética en vivo",
  "Canalización y acompañamiento",
  "Experiencia en comunidad",
  "Grabación completa",
  "Activación complementaria: Frecuencia de los milagros",
  "Activación complementaria: Limpieza energética diaria",
];

export default function Av4Recibiras() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-rec"
      aria-labelledby="av4-rec-title"
    >
      <div className="av4-wrap av4-rec__grid">
        {/* Tarjetas inclinadas y solapadas, como el collage de la referencia. */}
        <div className="av4-collage" data-reveal="left" aria-hidden="true">
          <div className="av4-collage__capa av4-collage__capa--3">
            <Image
              src="/activacion-v2/item4.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 330px"
              className="av4-cover"
            />
          </div>
          <div className="av4-collage__capa av4-collage__capa--2">
            <Image
              src="/activacion-v2/item2.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 330px"
              className="av4-cover"
            />
          </div>
          <div className="av4-collage__capa av4-collage__capa--1">
            <Image
              src="/activacion-v2/item1.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 330px"
              className="av4-cover"
            />
          </div>
        </div>

        <div className="av4-rec__copy">
          <h2 id="av4-rec-title" className="av4-title av4-title--izq" data-reveal="title">
            Lo que <em className="av4-brand">vas a recibir</em>
            <br />
            <b>en esta experiencia</b> <span aria-hidden="true">✨</span>
          </h2>

          <p className="av4-texto av4-texto--izq" data-reveal>
            Un encuentro guiado junto a Aida para trabajar{" "}
            <strong>profundamente sobre tu sistema</strong>, y dos prácticas
            para <strong>seguir integrando</strong> después del encuentro.
          </p>

          <ul className="av4-lista" data-reveal-group data-reveal-fade>
            {ITEMS.map((t) => (
              <li key={t}>
                <CircleCheck size={18} strokeWidth={1.6} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          <div data-reveal>
            <Av4Cta href="#av4-precio" />
          </div>
        </div>
      </div>

      <Av4Notch />
    </section>
  );
}
