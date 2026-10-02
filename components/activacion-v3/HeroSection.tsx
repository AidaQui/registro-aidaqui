import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Video } from "lucide-react";

const schedules = [
  { country: "España", src: "/activacion/espana.webp" },
  { country: "Argentina", src: "/activacion/argentina.webp" },
  { country: "México", src: "/activacion/mexico.webp" },
  { country: "Colombia", src: "/activacion/colombia.webp" },
];

const ctaText = "Reservar mi lugar";

/** El identificador del vídeo, no la URL: se usa en la portada y en el marco. */
const VIDEO_ID = "-5FC3kLfjOw";

const SparkleIcon = ({ id }: { id: string }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g style={{ filter: `url(#${id})` }}>
      <path d="M12 2.5l2.4 6.1L20.5 11l-6.1 2.4L12 19.5l-2.4-6.1L3.5 11l6.1-2.4L12 2.5z" fill="currentColor" />
    </g>
    <defs>
      <filter id={id}>
        <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
      </filter>
    </defs>
  </svg>
);

function renderLetters(text: string, keyPrefix = "l") {
  return text.split("").map((char, i) =>
    char === " " ? (
      <span key={`${keyPrefix}-space-${i}`} className="btn-space">{" "}</span>
    ) : (
      <span key={`${keyPrefix}-${i}`} style={{ "--i": i } as React.CSSProperties}>{char}</span>
    )
  );
}

export default function HeroSection() {
  const [videoActivo, setVideoActivo] = useState(false);

  return (
    <section className="hero-section hero-section--v3" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">
          {/* LOS BADGES, EN MARCADO Y NO EN IMAGEN.

              Antes eran dos .webp con el texto quemado dentro, y uno de ellos
              seguía diciendo "22 de mayo" —la fecha de una edición anterior—
              sin forma de corregirlo salvo reexportando el archivo. En HTML la
              fecha es texto: se cambia aquí y se acabó. Además pesan cero y se
              leen en cualquier tamaño de pantalla. */}
          <div className="hero-badges" aria-label="Detalles de la experiencia">
            <span className="hero-badge-chip">
              <Video size={15} strokeWidth={2} aria-hidden="true" />
              Experiencia en vivo
            </span>

            <span className="hero-badge-chip hero-badge-chip--fecha">
              <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
              10 de octubre
            </span>
          </div>

          <h1 id="hero-title" className="hero-title">
            Hay una parte de ti que ya no puede seguir viviendo desconectada de
            su verdad.
          </h1>

          <p className="hero-description">
            Una experiencia profunda diseñada para liberar bloqueos energéticos,
            reconectar con tu intuición y volver a sentirte alineada contigo.
          </p>

          {/* EL VÍDEO, DENTRO DEL HERO.

              Carga diferida: hasta que alguien pulsa sólo hay una miniatura, y
              el reproductor se monta en ese momento. Un iframe de YouTube trae
              su propio JavaScript y retrasaría la primera pantalla entera por
              un vídeo que la mayoría no va a reproducir. */}
          <div className="hero-vsl">
            {videoActivo ? (
              <iframe
                className="hero-vsl__player"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title="Activación del Ser Multidimensional"
                allow="accelerated-destination; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Es un <button> de verdad y no un div con onClick: así responde
                 al teclado y los lectores de pantalla lo anuncian. */
              <button
                type="button"
                className="hero-vsl__portada"
                onClick={() => setVideoActivo(true)}
                aria-label="Reproducir el vídeo"
              >
                {/* La miniatura la sirve YouTube ya optimizada desde su CDN, así
                    que no pasa por next/image: habría que declarar el dominio y
                    volver a procesar algo que llega listo. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt=""
                  aria-hidden="true"
                  className="hero-vsl__thumb"
                />

                <span className="hero-vsl__play" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          <div className="hero-schedules" aria-label="Horarios por país">
            {schedules.map(({ country, src }) => (
              <div key={country} className="hero-schedule-wrap">
                <Image
                  src={src}
                  alt={`Horario ${country}`}
                  width={160}
                  height={56}
                  priority
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>

          <a
            href="https://pixelbridge-theta.vercel.app/go"
            className="button hero-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="outline" />
            <div className="state state--default">
              <div className="icon" aria-hidden="true">
                <SparkleIcon id="sparkleHeroL" />
              </div>
              <p>{renderLetters(ctaText, "hero")}</p>
              <div className="icon icon--end" aria-hidden="true">
                <SparkleIcon id="sparkleHeroR" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
