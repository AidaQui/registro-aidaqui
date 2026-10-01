import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Section4Close() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>(".text-reveal").forEach((text) => {
        const split = new SplitType(text, { types: "lines" });

        // Wrap each line in overflow:hidden so the slide-up is clipped
        split.lines?.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.className = "line-wrapper";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });

        gsap.from(split.lines, {
          y: "100%",
          opacity: 0,
          ease: "power2.out",
          stagger: 0.12,
          duration: 0.9,
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play reset play reset",
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="s4-close">
      <h3 className="s4-close__title text-reveal">
        Estamos viviendo un cambio profundo de consciencia.
      </h3>
      <p className="s4-close__body text-reveal">
        Muchas personas están intentando sostener nuevas realidades con
        identidades antiguas. Y por eso sienten desconexión, confusión, vacío,
        agotamiento, incoherencia interna.
      </p>
      <div className="s4-close__emphasis">
        <p className="text-reveal s4-close__phrase">
          La verdadera transformación no ocurre solo entendiendo más.
        </p>
        <p className="text-reveal s4-close__phrase">
          Ocurre cuando empiezas a habitar una nueva frecuencia en tu vida real.
        </p>
        <p className="text-reveal s4-close__phrase">
          En tu cuerpo, en tus relaciones, en tus decisiones,<br />
          en la forma en la que te eliges.
        </p>
      </div>
    </div>
  );
}
