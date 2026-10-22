import { useState } from "react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Monograma from "@/components/activacion-v4/Av4Monograma";
import Av4Notch from "@/components/activacion-v4/Av4Notch";
import { EVENTO, OCTUBRE } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** El identificador del vídeo (el mismo de /activacion-v3), no la URL. */
const VIDEO_ID = "-5FC3kLfjOw";

/**
 * Sección clara del vídeo: titular centrado, tarjeta grande con el vídeo de
 * ventas, párrafo con fragmentos en negrita y CTA.
 *
 * Carga diferida: hasta que alguien pulsa sólo hay una miniatura y el
 * reproductor se monta en ese momento, para no retrasar la primera pantalla.
 */
export default function Av4Video() {
  const ref = useScrollReveal<HTMLElement>();
  const [activo, setActivo] = useState(false);
  const dias = OCTUBRE.map((m) => m.dia).join(", ");

  return (
    <section
      ref={ref}
      className="av4-sec av4-video"
      aria-labelledby="av4-video-title"
    >
      <Av4Monograma variante="video" />

      <div className="av4-wrap">
        <h2 id="av4-video-title" className="av4-title" data-reveal="title">
          Toca para ver y conocer
          <br />
          <b>todo sobre la</b> <em className="av4-brand">Activación</em>
        </h2>

        <div className="av4-vsl" data-reveal>
          {activo ? (
            <iframe
              className="av4-vsl__player"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Activación del Ser Multidimensional"
              allow="accelerated-destination; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="av4-vsl__portada"
              onClick={() => setActivo(true)}
              aria-label="Reproducir el vídeo"
            >
              {/* La miniatura la sirve YouTube ya optimizada desde su CDN. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                aria-hidden="true"
                className="av4-vsl__thumb"
              />
              <span className="av4-vsl__play" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        <p className="av4-texto" data-reveal>
          No siempre se trata de encontrar una nueva respuesta. A veces, el
          verdadero desafío es que{" "}
          <strong>
            todo tu sistema pueda acompañar aquello que tu consciencia ya
            comprendió
          </strong>
          . El encuentro es {EVENTO.fechaLarga}, dentro de un recorrido de
          cuatro momentos: <strong>los días {dias}</strong> de octubre.
        </p>

        <div className="av4-cta-fila" data-reveal>
          <Av4Cta href="#av4-precio" />
        </div>
      </div>

      <Av4Notch />
    </section>
  );
}
