import Image from "next/image";
import { Check } from "lucide-react";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección del área (sólo landings por área): es el ángulo de cada una.
 * A la izquierda el titular grande y el desarrollo; a la derecha un panel
 * oscuro con el "Cuando…:" y los cuatro resultados. Copy en `area`
 * (contenido.tsx). Si `area.foto` está, la foto enmarcada en arco ocupa la
 * columna izquierda y el panel se le superpone; sin foto, el layout de siempre.
 */
export default function Av4Area() {
  const ref = useScrollReveal<HTMLElement>();
  const { area: c } = useContenido();
  if (!c) return null;
  const foto = c.foto;

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--rosa av4-area"
      aria-labelledby="av4-area-title"
    >
      <div
        className={`av4-wrap av4-area__grid${foto ? " av4-area__grid--foto" : ""}`}
      >
        <div className="av4-area__intro">
          <div data-reveal>
            <Av4Tag>{c.etiqueta}</Av4Tag>
          </div>
          <h2
            id="av4-area-title"
            className="av4-title av4-title--izq av4-area__titulo"
            data-reveal
          >
            {c.titular}
          </h2>
          <div className="av4-parrafos" data-reveal>
            {c.parrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {foto && (
          <div className="av4-area__foto" data-reveal="left" aria-hidden="true">
            <div className="av4-area__marco">
              <Image
                src={foto.src}
                alt=""
                width={foto.ancho}
                height={foto.alto}
                sizes="(max-width: 1000px) 90vw, 440px"
                className="av4-area__img"
                style={foto.posicion ? { objectPosition: foto.posicion } : undefined}
              />
            </div>
          </div>
        )}

        <div className="av4-area__panel" data-reveal="right">
          <p className="av4-area__cuando">{c.intro}</p>
          <ul className="av4-area__lista">
            {c.items.map((t) => (
              <li key={t}>
                <span className="av4-area__check" aria-hidden="true">
                  <Check size={16} strokeWidth={2.6} />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {c.aviso && (
        <div className="av4-wrap">
          <p className="av4-area__aviso" data-reveal>
            {c.aviso}
          </p>
        </div>
      )}
    </section>
  );
}
