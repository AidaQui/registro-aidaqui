import { useRef } from "react";
import Image from "next/image";
import Section4Close from "@/components/Section4Close";

const row1 = [
  { src: "/activacion/img-1.webp", alt: "Liberación energética y emocional de bloqueos que no te permiten avanzar" },
  { src: "/activacion/img-2.webp", alt: "Activación de merecimiento y autenticidad" },
  { src: "/activacion/img-3.webp", alt: "Herramientas para sostener tu energía en el día a día" },
  { src: "/activacion/img-4.webp", alt: "Amplificación de tu energía de manifestación" },
];

const row2 = [
  { src: "/activacion/img-5.webp", alt: "Un espacio de conexión grupal con personas que también están despertando" },
  { src: "/activacion/img-6.webp", alt: "Un profundo reset energético para volver a sentirte alineadx, recargado, inspirado y profundamente conectado a tu Ser Superior" },
  { src: "/activacion/img-7.webp", alt: "Liberación energética y emocional de bloqueos que no te permiten avanzar" },
];

const allCards = [...row1, ...row2];

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
    <section className="s4-section" aria-labelledby="s4-title">
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
            {row1.map(({ src, alt }, i) => (
              <div key={i} className="s4-card">
                <Image src={src} alt={alt} fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <div className="s4-row s4-row--3">
            {row2.map(({ src, alt }, i) => (
              <div key={i} className="s4-card">
                <Image src={src} alt={alt} fill sizes="25vw" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div ref={carouselRef} className="s4-carousel" aria-label="Experiencias incluidas">
          {allCards.map(({ src, alt }, i) => (
            <div key={i} className="s4-carousel__item">
              <Image src={src} alt={alt} fill sizes="72vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>

        <Section4Close />

      </div>
    </section>
  );
}
