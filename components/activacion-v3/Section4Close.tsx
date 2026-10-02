import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Los cuatro momentos de octubre.
 *
 * `protagonista` marca el 10/10, que es la fecha del encuentro y la única que
 * la línea destaca. Va como dato y no como índice fijo para que, si una
 * edición futura cambia de fecha, el destacado se mueva con ella.
 */
const PORTALES = [
  { dia: "01", nombre: "Apertura" },
  { dia: "10", nombre: "Activación", protagonista: true },
  { dia: "19", nombre: "Integración" },
  { dia: "28", nombre: "Cierre" },
];

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
        Octubre no contiene únicamente el portal 10/10. El 1, 10, 19 y 28 abren
        cuatro momentos que comparten el{" "}
        <em>código del 1</em>: inicio, decisión y nueva dirección.
      </p>

      {/*
        EL RECORRIDO, EN LÍNEA TEMPORAL.

        Las cuatro fechas vivían dentro de los párrafos y ahí se leían como una
        enumeración más: quien escanea la sección no retenía ninguna. En una
        línea con sus cuatro hitos el recorrido se entiende sin leer —se ve—, y
        el 10/10 puede destacarse por tamaño y color en vez de por una cursiva
        que compite con el resto del texto.

        Es el dato que la página entera va a repetir hasta el botón, así que
        merece ser una pieza y no un renglón.
      */}
      <ol className="s4-portales" aria-label="Los cuatro momentos de octubre">
        {PORTALES.map(({ dia, nombre, protagonista }) => (
          <li
            key={dia}
            className="s4-portal"
            data-protagonista={protagonista ? "si" : undefined}
          >
            <span className="s4-portal__punto" aria-hidden="true" />

            <span className="s4-portal__dia">
              {dia}
              <span className="s4-portal__mes">/10</span>
            </span>

            <span className="s4-portal__nombre">{nombre}</span>

            {protagonista && (
              <span className="s4-portal__sello">
                <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
                Tu encuentro
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="s4-close__body text-reveal">
        Durante la <em>Activación del Ser Multidimensional</em> prepararemos tu
        sistema mental, emocional, físico y energético para atravesar este
        proceso con mayor consciencia, claridad y dirección.
      </p>

      <div className="s4-close__emphasis">
        <p className="text-reveal s4-close__phrase">
          Esta experiencia ocurre una sola vez al año, en un momento energético
          que no volverá a repetirse de esta forma durante{" "}
          <strong>9 años</strong>.
        </p>
      </div>

      <p className="s4-close__body s4-close__cierre text-reveal">
        Desde que te registres, comenzaremos a preparar tu energía para los
        cuatro portales de octubre.
      </p>
    </div>
  );
}
