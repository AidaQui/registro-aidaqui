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
        Estamos viviendo un profundo cambio de consciencia
      </h3>

      <p className="s4-close__eyebrow text-reveal">
        Y octubre es el acelerador energético de este proceso
      </p>

      <p className="s4-close__body text-reveal">
        Octubre no contiene únicamente el portal 10/10.
      </p>

      {/* Las cuatro fechas van en su propia pieza y no dentro del párrafo:
          son el dato que hay que retener de toda la sección, y en línea con
          el texto se leían como una enumeración más. */}
      <p className="s4-close__body text-reveal">
        <em>
          El 1, 10, 19 y 28 abren cuatro momentos energéticos que comparten el
          código del 1:
        </em>{" "}
        inicio, decisión y creación de una nueva dirección.
      </p>

      <p className="s4-close__body text-reveal">
        Es un recorrido que comienza el 1/10,{" "}
        <em>alcanza uno de sus puntos de mayor intensidad el 10/10</em> y
        continúa hasta su cierre el 28/10.
      </p>

      <p className="s4-close__body text-reveal">
        Durante la <em>Activación del Ser Multidimensional</em> prepararemos tu
        sistema mental, emocional, físico y energético para atravesar este
        proceso con mayor consciencia, claridad y dirección.
      </p>

      <div className="s4-close__emphasis">
        <p className="text-reveal s4-close__phrase">
          Por eso esta experiencia ocurre una sola vez al año, en un momento
          energético que no volverá a repetirse de esta forma durante 9 años.
        </p>
      </div>

      <p className="s4-close__body s4-close__cierre text-reveal">
        Desde que te registres, comenzaremos a preparar tu energía para los
        cuatro portales de octubre.
      </p>
    </div>
  );
}
