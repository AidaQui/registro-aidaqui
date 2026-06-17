import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ctaPrimary = "Reservar mi lugar";
const ctaSupport = "Contacta con soporte";

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

            <a
              href="https://wa.link/insiui"
              className="final-support-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="outline" />
              <div className="state state--default">
                <div className="icon" aria-hidden="true">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.012-1.374l-.36-.214-3.733.977.998-3.645-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                  </svg>
                </div>
                <p>{renderLetters(ctaSupport, "support")}</p>
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
