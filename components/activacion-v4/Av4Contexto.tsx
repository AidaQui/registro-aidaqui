import Image from "next/image";
import { Flame, Gem, Shuffle, Users } from "lucide-react";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Contexto: texto a la izquierda, foto a la derecha. Copy literal. */

const LINEAS = [
  { Icono: Users, t: "Relaciones que necesitan una nueva forma." },
  { Icono: Shuffle, t: "Prioridades que han cambiado." },
  { Icono: Flame, t: "Deseos que vuelven con fuerza." },
  { Icono: Gem, t: "Una necesidad cada vez más profunda de vivir con verdad." },
];

export default function Av4Contexto() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-ctx"
      aria-labelledby="av4-contexto-title"
    >
      <div className="av4-wrap av4-dos">
        <div className="av4-dos__copy">
          <div data-reveal>
            <Av4Tag>Este momento</Av4Tag>
          </div>
          <h2
            id="av4-contexto-title"
            className="av4-title av4-title--izq"
            data-reveal
          >
            En medio de tanto cambio, volver a tu corazón{" "}
            <span className="av4-oro">cobra un nuevo sentido</span>.
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

          <ul className="av4-borde" data-reveal-group data-reveal-fade>
            {LINEAS.map(({ Icono, t }) => (
              <li key={t}>
                <span className="av4-icono av4-icono--sm">
                  <Icono size={22} strokeWidth={1.7} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <p className="av4-parrafos av4-parrafos--solo" data-reveal>
            Volver al corazón es parte de esa transformación:{" "}
            <strong>recuperar una guía interior</strong> desde la que elegir con
            más consciencia lo que queremos crear, individualmente y como
            comunidad.
          </p>
        </div>

        <div className="av4-foto" data-reveal="right">
          <Image
            src="/activacion-v4/contexto.jpg"
            alt="Aida Qui meditando"
            fill
            sizes="(max-width: 900px) 90vw, 520px"
            className="av4-cover"
          />
        </div>
      </div>
    </section>
  );
}
