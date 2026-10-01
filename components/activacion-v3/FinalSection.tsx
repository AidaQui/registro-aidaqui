import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ctaPrimary = "Reservar mi lugar";

const schedules = [
  { country: "España",    src: "/activacion/espana.webp" },
  { country: "Argentina", src: "/activacion/argentina.webp" },
  { country: "México",    src: "/activacion/mexico.webp" },
  { country: "Colombia",  src: "/activacion/colombia.webp" },
];

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
      <span key={`${keyPrefix}-space-${i}`} className="btn-space">{" "}</span>
    ) : (
      <span key={`${keyPrefix}-${i}`} style={{ "--i": i } as React.CSSProperties}>{char}</span>
    )
  );
}

export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Skip animations on mobile — ScrollTrigger start point can miss on short viewports
    // leaving elements stuck at opacity:0
    if (window.matchMedia("(max-width: 700px)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
          onEnter: () => tl.play(),
          onEnterBack: () => {},
        },
        paused: true,
        onComplete: () => {
          // Guarantee final state — clears inline styles GSAP set
          gsap.set(el.querySelectorAll(".final-logo, .final-title, .final-actions > *, .final-schedule-wrap"), {
            clearProps: "opacity,transform",
          });
        },
      });

      tl.from(el.querySelector(".final-logo"), {
        opacity: 0, y: -16, duration: 0.6, ease: "power2.out",
      });

      const titleEl = el.querySelector<HTMLElement>(".final-title");
      if (titleEl) {
        const split = new SplitType(titleEl, { types: "lines" });
        split.lines?.forEach((line) => {
          const w = document.createElement("div");
          w.style.overflow = "hidden";
          line.parentNode?.insertBefore(w, line);
          w.appendChild(line);
        });
        tl.from(split.lines, {
          y: "100%", opacity: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
        }, "-=0.3");
      }

      tl.from(el.querySelectorAll(".final-actions > *"), {
        opacity: 0, y: 20, stagger: 0.14, duration: 0.6, ease: "power2.out",
      }, "-=0.4");

      tl.from(el.querySelectorAll(".final-schedule-wrap"), {
        opacity: 0, y: 14, stagger: 0.09, duration: 0.5, ease: "power2.out",
      }, "-=0.3");

      // If section already visible on load, play immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        tl.play();
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="final-section" aria-labelledby="final-title">
        <div className="final-bg" aria-hidden="true" />
        <div className="final-overlay" aria-hidden="true" />

        <div className="final-shell">
          <Image
            src="/common/logotipo.png"
            alt="Activación de la Frecuencia Original"
            width={420}
            height={65}
            className="final-logo"
            style={{ width: "100%", maxWidth: 420, height: "auto" }}
          />

          <h2 className="final-title" id="final-title">
            Te espero este 06 de Junio vía Zoom para <mark className="final-highlight">recordar quién eres</mark> más allá del ruido, el miedo y las versiones que ya no te representan.
          </h2>

          <div className="final-actions">
            <a
              href="https://pixelbridge-theta.vercel.app/go"
              className="button final-cta-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="outline" />
              <div className="state state--default">
                <div className="icon" aria-hidden="true">
                  <SparkleIcon id="sparkleFinalL" />
                </div>
                <p>{renderLetters(ctaPrimary, "final")}</p>
                <div className="icon icon--end" aria-hidden="true">
                  <SparkleIcon id="sparkleFinalR" />
                </div>
              </div>
            </a>
          </div>

          <div className="final-schedules" aria-label="Horarios por país">
            {schedules.map(({ country, src }) => (
              <div key={country} className="final-schedule-wrap">
                <Image
                  src={src}
                  alt={`Horario ${country}`}
                  width={160}
                  height={56}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            ))}
          </div>

          <div className="final-rule" aria-hidden="true">
            <span className="final-rule__line" />
            <span className="final-rule__gem">✦</span>
            <span className="final-rule__line" />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos los derechos reservados
        </p>
      </footer>
    </>
  );
}
