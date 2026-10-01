/**
 * El vídeo de venta, justo debajo de la promesa del hero.
 *
 * ── POR QUÉ AQUÍ ──
 *
 * Esta sección era un separador decorativo vacío. Es el sitio donde ya estaba
 * el corte entre la promesa y el desarrollo, así que el vídeo entra sin
 * desplazar nada: quien se queda tras leer la promesa lo encuentra sin
 * buscarlo, y quien prefiere leer sigue bajando.
 *
 * ── CARGA DIFERIDA ──
 *
 * El iframe de YouTube trae su propio JavaScript y cookies, y ponerlo suelto
 * retrasa la carga de la página entera por un vídeo que la mayoría no va a
 * reproducir. Así que hasta que alguien pulsa sólo hay una imagen —la portada
 * que YouTube ya sirve— y el reproductor se monta en ese momento.
 *
 * `youtube-nocookie.com` evita las cookies de seguimiento mientras nadie
 * reproduce nada.
 */

import { useState } from "react";

/** El identificador del vídeo, no la URL completa: se usa en dos sitios. */
const VIDEO_ID = "-5FC3kLfjOw";

export default function Section3() {
  const [activo, setActivo] = useState(false);

  return (
    <section className="s3-vsl" aria-labelledby="s3-vsl-title">
      <div className="s3-vsl__shell">
        <h2 id="s3-vsl-title" className="s3-vsl__title">
          Mira esto antes de <em>reservar tu lugar</em>
        </h2>

        <div className="s3-vsl__marco">
          {activo ? (
            <iframe
              className="s3-vsl__player"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Activación del Ser Multidimensional"
              allow="accelerated-destination; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* La portada es un botón de verdad, no un div con onClick: así
               responde al teclado y los lectores de pantalla la anuncian como
               lo que es. */
            <button
              type="button"
              className="s3-vsl__portada"
              onClick={() => setActivo(true)}
              aria-label="Reproducir el vídeo"
            >
              {/* La miniatura la sirve YouTube ya optimizada y desde su CDN.
                  Va con <img> nativo y no con next/image porque ésta tendría
                  que declarar el dominio en next.config y luego volver a
                  procesar una imagen que ya llega lista. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="s3-vsl__thumb"
              />

              <span className="s3-vsl__play" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
