import Image from "next/image";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Contexto: texto a la izquierda, foto a la derecha. Copy en contenido.tsx. */

export default function Av4Contexto() {
  const ref = useScrollReveal<HTMLElement>();
  const c = useContenido().contexto;

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-ctx"
      aria-labelledby="av4-contexto-title"
    >
      <div className="av4-wrap av4-dos">
        <div className="av4-dos__copy">
          <div data-reveal>
            <Av4Tag>{c.etiqueta}</Av4Tag>
          </div>
          <h2
            id="av4-contexto-title"
            className="av4-title av4-title--izq"
            data-reveal
          >
            {c.titular}
          </h2>

          <div className="av4-parrafos" data-reveal>
            {c.parrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ul className="av4-borde" data-reveal-group data-reveal-fade>
            {c.lineas.map((t) => (
              <li key={t}>
                {t}
              </li>
            ))}
          </ul>

          <p className="av4-parrafos av4-parrafos--solo" data-reveal>
            {c.cierre}
          </p>
        </div>

        <div className="av4-ctx__foto" data-reveal="right">
          <div className="av4-foto">
            <div className="av4-foto__img">
          <Image
            src="/activacion-v4/contexto.jpg"
            alt="Aida Qui meditando"
            fill
            sizes="(max-width: 900px) 90vw, 520px"
            className="av4-cover"
          />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
