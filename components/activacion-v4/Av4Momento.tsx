import Image from "next/image";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * "Es momento": titular con la parte clave en dorado, párrafos y las cuatro
 * intenciones como tarjetas oscuras numeradas con foto.
 */

/** Una foto por intención, en el mismo orden que `momento.intenciones`. */
const FOTOS = [
  "/activacion-v4/intencion-1.webp",
  "/activacion-v4/intencion-2.webp",
  "/activacion-v4/intencion-3.webp",
  "/activacion-v4/intencion-4.webp",
];

export default function Av4Momento() {
  const ref = useScrollReveal<HTMLElement>();
  const c = useContenido().momento;

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--rosa av4-momento"
      aria-labelledby="av4-momento-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <Av4Tag>{c.etiqueta}</Av4Tag>
          <h2 id="av4-momento-title" className="av4-title">
            {c.titular}
          </h2>
        </div>

        <div className="av4-parrafos av4-parrafos--centro" data-reveal>
          {c.parrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h3 className="av4-subtitulo av4-subtitulo--centro av4-intencion-titulo" data-reveal>
          {c.tituloIntencion}
        </h3>

        <ol className="av4-intenciones" data-reveal-group data-reveal-fade>
          {c.intenciones.map((texto, i) => (
            <li key={texto} className="av4-intencion">
              <div className="av4-intencion__foto">
                <Image
                  src={FOTOS[i % FOTOS.length]}
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
          {c.cierre}
        </p>
      </div>
    </section>
  );
}
