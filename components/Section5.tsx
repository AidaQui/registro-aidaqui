import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mainCards = [
  { src: "/activacion/card-1.webp", alt: "Card 1" },
  { src: "/activacion/card-2.webp", alt: "Card 2" },
  { src: "/activacion/card-3.webp", alt: "Card 3" },
  { src: "/activacion/card-4.webp", alt: "Card 4" },
  { src: "/activacion/card-5.webp", alt: "Card 5" },
];

const bonusCards = [
  { src: "/activacion/card-6.webp", alt: "Activación guiada 1" },
  { src: "/activacion/card-7.webp", alt: "Activación guiada 2" },
];

// Rotation per card — desktop deck feel, applied as CSS custom prop
const rotations = [-2.5, 1.8, -1.2, 2.2, -1.6];

export default function Section5() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Desktop: each card fans in from slight offset + rotation
      const cards = el.querySelectorAll<HTMLElement>(".s5-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          rotation: parseFloat(card.style.getPropertyValue("--rot") || "0") * 2,
          scale: 0.94,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el.querySelector(".s5-grid--5"),
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });

      // Bonus cards separate trigger
      const bonusGrid = el.querySelector(".s5-grid--2");
      if (bonusGrid) {
        gsap.from(bonusGrid.querySelectorAll(".s5-card"), {
          opacity: 0,
          y: 36,
          scale: 0.95,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bonusGrid,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        });
      }

      // Bonus title
      const bonusTitle = el.querySelector(".s5-bonus__title");
      if (bonusTitle) {
        gsap.from(bonusTitle, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bonusTitle,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      }

      // Mobile stack items
      el.querySelectorAll<HTMLElement>(".s5-stack__item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.55,
          delay: i * 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="s5-section" aria-labelledby="s5-title">
      <div className="s5-shell">
        <h2 className="s5-title" id="s5-title">
          ¿Qué <em>recibirás</em>?
        </h2>

        {/* Desktop: 5-card grid with individual rotations */}
        <div className="s5-grid s5-grid--5" aria-label="Qué recibirás">
          {mainCards.map(({ src, alt }, i) => (
            <div
              key={i}
              className="s5-card"
              style={{ "--rot": `${rotations[i]}deg` } as React.CSSProperties}
            >
              <Image
                src={src}
                alt={alt}
                width={367}
                height={207}
                style={{ width: "100%", height: "auto", display: "block" }}
                className="s5-card__img"
              />
              <div className="s5-card__glass" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Desktop: bonus subsection */}
        <div className="s5-bonus">
          <h3 className="s5-bonus__title">
            Dos activaciones guiadas para integrar después del encuentro:
          </h3>
          <div className="s5-grid s5-grid--2" aria-label="Activaciones guiadas">
            {bonusCards.map(({ src, alt }, i) => (
              <div key={i} className="s5-card">
                <Image
                  src={src}
                  alt={alt}
                  width={367}
                  height={207}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  className="s5-card__img"
                />
                <div className="s5-card__glass" aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className="s5-bonus__body">
            Dos prácticas poderosas para ayudarte a limpiar cargas energéticas,
            recalibrar tu energía y sostener esta nueva etapa de tu vida.
          </p>
        </div>

        {/* Mobile: main cards */}
        <div className="s5-stack">
          {mainCards.map(({ src, alt }, i) => (
            <div
              key={i}
              className="s5-stack__item"
              style={{ "--rot": `${rotations[i]}deg` } as React.CSSProperties}
            >
              <Image
                src={src}
                alt={alt}
                width={367}
                height={207}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ))}
        </div>

        {/* Mobile: bonus block */}
        <div className="s5-bonus-mobile">
          <h3 className="s5-bonus__title">
            Dos activaciones guiadas para integrar después del encuentro:
          </h3>
          <div className="s5-stack s5-stack--bonus">
            {bonusCards.map(({ src, alt }, i) => (
              <div key={i} className="s5-stack__item">
                <Image
                  src={src}
                  alt={alt}
                  width={367}
                  height={207}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>
          <p className="s5-bonus__body">
            Dos prácticas poderosas para ayudarte a limpiar cargas energéticas,
            recalibrar tu energía y sostener esta nueva etapa de tu vida.
          </p>
        </div>

        <div className="s5-cta">
          <a
            href="https://pixelbridge-theta.vercel.app/go"
            className="button s5-cta__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="outline" />
            <div className="state state--default">
              <div className="icon" aria-hidden="true">
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g style={{ filter: "url(#sparkleS5L)" }}>
                    <path d="M12 2.5l2.4 6.1L20.5 11l-6.1 2.4L12 19.5l-2.4-6.1L3.5 11l6.1-2.4L12 2.5z" fill="currentColor" />
                  </g>
                  <defs>
                    <filter id="sparkleS5L">
                      <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <p>
                {"Reservar mi lugar".split("").map((char, i) =>
                  char === " " ? (
                    <span key={i} className="btn-space"> </span>
                  ) : (
                    <span key={i} style={{ "--i": i } as React.CSSProperties}>{char}</span>
                  )
                )}
              </p>
              <div className="icon icon--end" aria-hidden="true">
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g style={{ filter: "url(#sparkleS5R)" }}>
                    <path d="M12 2.5l2.4 6.1L20.5 11l-6.1 2.4L12 19.5l-2.4-6.1L3.5 11l6.1-2.4L12 2.5z" fill="currentColor" />
                  </g>
                  <defs>
                    <filter id="sparkleS5R">
                      <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
