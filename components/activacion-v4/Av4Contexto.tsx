import Image from "next/image";
import { CircleCheck } from "lucide-react";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Contexto: collage de tarjetas inclinadas a la izquierda y el texto a la
 * derecha, con la maqueta del bloque "vas a aprender" de la referencia.
 * Copy literal del cliente.
 */

const LINEAS = [
  "Relaciones que necesitan una nueva forma.",
  "Prioridades que han cambiado.",
  "Deseos que vuelven con fuerza.",
  "Una necesidad cada vez más profunda de vivir con verdad.",
];

export default function Av4Contexto() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-rec"
      aria-labelledby="av4-contexto-title"
    >
      <div className="av4-wrap av4-rec__grid">
        {/* Tarjetas inclinadas y solapadas, como el collage de la referencia. */}
        <div className="av4-collage" data-reveal="left" aria-hidden="true">
          <div className="av4-collage__capa av4-collage__capa--3">
            <Image
              src="/activacion-v2/item4.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 340px"
              className="av4-cover"
            />
          </div>
          <div className="av4-collage__capa av4-collage__capa--2">
            <Image
              src="/activacion-v2/item2.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 340px"
              className="av4-cover"
            />
          </div>
          <div className="av4-collage__capa av4-collage__capa--1">
            <Image
              src="/activacion-v2/item1.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 60vw, 340px"
              className="av4-cover"
            />
          </div>
        </div>

        <div className="av4-rec__copy">
          <h2
            id="av4-contexto-title"
            className="av4-title av4-title--izq"
            data-reveal="title"
          >
            <b>En medio de tanto cambio</b>, volver a tu corazón{" "}
            <em className="av4-brand">cobra un nuevo sentido</em>.
          </h2>

          <div className="av4-parrafos" data-reveal>
            <p>
              Vivimos un momento de mucho ruido, información y cambios. Hay
              opiniones sobre todo: cómo deberías vivir, qué deberías conseguir
              y quién deberías ser.
            </p>
            <p>
              <strong>
                Y entre tantas voces, puedes terminar alejándote de la tuya.
              </strong>
            </p>
            <p>
              Desde mi forma de sentir este momento planetario, estamos siendo
              llamados a revisar las estructuras desde las que vivimos: lo que
              sostenemos por miedo, lo que elegimos por costumbre y lo que ya
              no se corresponde con quienes somos.
            </p>
            <p>Quizá también lo estás sintiendo.</p>
          </div>

          <ul className="av4-lista" data-reveal-group data-reveal-fade>
            {LINEAS.map((t) => (
              <li key={t}>
                <CircleCheck size={18} strokeWidth={1.6} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          <p className="av4-texto av4-texto--izq" data-reveal>
            Volver al corazón es parte de esa transformación:{" "}
            <strong>recuperar una guía interior</strong> desde la que elegir con
            más consciencia lo que queremos crear, individualmente y como
            comunidad.
          </p>
        </div>
      </div>

      <Av4Notch />
    </section>
  );
}
