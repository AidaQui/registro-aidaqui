import { useRef } from "react";
import Image from "next/image";
import Section4Close from "@/components/activacion-v3/Section4Close";

/*
 * El texto deja de estar quemado en la imagen y pasa a ir sobre ella.
 *
 * Las siete fotos traían su propio rótulo dentro, lo que significaba que para
 * corregir una coma había que reexportar el archivo, que el texto no se podía
 * leer en voz alta ni buscar, y que a tamaño de tarjeta quedaba diminuto.
 *
 * Ahora la imagen es sólo fondo y el texto es texto: se lee a cualquier
 * tamaño, lo anuncia un lector de pantalla y se edita aquí.
 */
const row1 = [
  { src: "/activacion/img-1.webp", texto: "Liberación energética y emocional de bloqueos que no te permiten avanzar." },
  { src: "/activacion/img-2.webp", texto: "Activación de merecimiento y autenticidad." },
  { src: "/activacion/img-3.webp", texto: "Herramientas para sostener tu energía en el día a día." },
  { src: "/activacion/img-4.webp", texto: "Amplificación de tu energía de manifestación." },
];

const row2 = [
  { src: "/activacion/img-5.webp", texto: "Un espacio de conexión grupal con personas que también están despertando." },
  { src: "/activacion/img-6.webp", texto: "Un profundo reset energético para volver a sentirte alineado, recargado, inspirado y profundamente conectado a tu Ser Superior." },
  { src: "/activacion/img-7.webp", texto: "Reconexión con tu intuición y claridad interna para abrirte a los siguientes meses con una energía clara de confianza, fuerza interior y magnetismo." },
];

const allCards = [...row1, ...row2];

type TarjetaProps = {
  src: string;
  texto: string;
  numero: number;
  sizes: string;
  /** La retícula y el carrusel usan clases distintas para su tamaño. */
  clase?: string;
};

/**
 * Una tarjeta: fotografía de fondo, número y el texto encima.
 *
 * La comparten la retícula de escritorio y el carrusel de móvil, que antes
 * repetían el mismo marcado con otra clase. Un solo componente evita que al
 * tocar una de las dos vistas la otra se quede atrás.
 */
function Tarjeta({ src, texto, numero, sizes, clase = "s4-card" }: TarjetaProps) {
  return (
    <div className={clase}>
      <Image src={src} alt="" aria-hidden="true" fill sizes={sizes} style={{ objectFit: "cover" }} />

      {/* El velo va en su propia capa y no como sombra de la tarjeta: tiene que
          quedar entre la foto y el texto, no por encima de los dos. */}
      <span className="s4-card__velo" aria-hidden="true" />

      <div className="s4-card__texto">
        <span className="s4-card__num" aria-hidden="true">
          {String(numero).padStart(2, "0")}
        </span>
        <p>{texto}</p>
      </div>
    </div>
  );
}

export default function Section4() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(dir: "prev" | "next") {
    const el = carouselRef.current;
    if (!el) return;
    // Scroll by the width of one card (first child width + gap)
    const card = el.querySelector<HTMLElement>(".s4-carousel__item");
    const gap = 16;
    const amount = card ? card.offsetWidth + gap : el.offsetWidth * 0.72;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  }

  return (
    <section className="s4-section s4-section--v3" aria-labelledby="s4-title">
      <div className="s4-shell">

        <h2 className="s4-title" id="s4-title">
          Lo que experimentarás <em>dentro</em>
        </h2>

        {/* Nav arrows — below title, mobile only */}
        <div className="s4-nav" aria-label="Navegación de experiencias">
          <button className="s4-nav__btn" type="button" aria-label="Anterior" onClick={() => scrollCarousel("prev")}>
            <div className="s4-nav__outline" />
            <div className="s4-nav__face">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
          <button className="s4-nav__btn" type="button" aria-label="Siguiente" onClick={() => scrollCarousel("next")}>
            <div className="s4-nav__outline" />
            <div className="s4-nav__face">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </div>

        {/* Desktop grid — 2 explicit rows */}
        <div className="s4-grid" aria-label="Experiencias incluidas">
          <div className="s4-row s4-row--4">
            {row1.map(({ src, texto }, i) => (
              <Tarjeta key={i} src={src} texto={texto} numero={i + 1} sizes="25vw" />
            ))}
          </div>
          <div className="s4-row s4-row--3">
            {row2.map(({ src, texto }, i) => (
              <Tarjeta
                key={i}
                src={src}
                texto={texto}
                numero={row1.length + i + 1}
                sizes="25vw"
              />
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div ref={carouselRef} className="s4-carousel" aria-label="Experiencias incluidas">
          {allCards.map(({ src, texto }, i) => (
            <Tarjeta
              key={i}
              src={src}
              texto={texto}
              numero={i + 1}
              sizes="78vw"
              clase="s4-carousel__item"
            />
          ))}
        </div>

        <Section4Close />

      </div>
    </section>
  );
}
