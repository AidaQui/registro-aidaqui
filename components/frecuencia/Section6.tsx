import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Section6() {
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Eyebrow slides in from left
      gsap.from(el.querySelector(".s6-eyebrow"), {
        opacity: 0,
        x: -28,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // Name — split lines reveal
      const nameEl = el.querySelector<HTMLElement>(".s6-name");
      if (nameEl) {
        const split = new SplitType(nameEl, { types: "lines" });
        split.lines?.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
        gsap.from(split.lines, {
          y: "100%",
          opacity: 0,
          ease: "power3.out",
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Body paragraphs — staggered fade up
      const bodies = el.querySelectorAll(".s6-body");
      gsap.from(bodies, {
        opacity: 0,
        y: 22,
        stagger: 0.14,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bodies[0],
          start: "top 84%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="s6-section" aria-labelledby="s6-title">
      <div className="s6-bg" aria-hidden="true" />
      <div className="s6-overlay" aria-hidden="true" />

      <div className="s6-shell">
        <div className="s6-empty" aria-hidden="true" />

        <div ref={copyRef} className="s6-copy">
          <p className="s6-eyebrow">¿Quién guiará esta experiencia?</p>

          <h2 className="s6-name" id="s6-title">
            AIDA QUI
          </h2>

          <p className="s6-body">
            Aida Qui es una de las referentes más reconocidas en transformación
            energética y espiritualidad práctica en habla hispana.
          </p>
          <p className="s6-body">
            Es creadora de la <em>Academia ADN</em>, un movimiento y escuela de
            transformación diseñado para ayudar a las personas a elevar su
            consciencia, vivir desde una mayor coherencia y transformar todas las
            áreas de su vida.
          </p>
          <p className="s6-body">
            Durante años ha acompañado a miles de personas en procesos de
            transformación profunda, ayudándolas a cambiar su realidad desde la
            raíz: su energía, su identidad y la forma en la que habitan su vida.
          </p>
          <p className="s6-body">
            Su trabajo une espiritualidad práctica, maestría energética, sistema
            emocional y transformación profunda para ayudar a las personas a
            dejar atrás viejas versiones de sí mismas y comenzar a vivir desde
            una frecuencia más auténtica, consciente y alineada.
          </p>
        </div>
      </div>
    </section>
  );
}
