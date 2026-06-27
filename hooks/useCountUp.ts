import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima un número de 0 (o `from`) hasta `to` cuando el elemento entra en viewport.
 * Mismo lenguaje que useScrollReveal: dispara con ScrollTrigger, una sola vez,
 * y respeta prefers-reduced-motion (si está activo, muestra el valor final directo).
 *
 * Devuelve un ref para colocar en el elemento que contiene el número (su textContent
 * se actualiza en cada frame). El formato por defecto es entero con separador de miles.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  to: number,
  options?: { from?: number; duration?: number; format?: (n: number) => string }
) {
  const ref = useRef<T>(null);
  const from = options?.from ?? 0;
  const duration = options?.duration ?? 1.8;
  const format =
    options?.format ?? ((n: number) => Math.round(n).toLocaleString("es-AR"));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(to);
      return;
    }

    const counter = { value: from };
    el.textContent = format(from);

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: to,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = format(counter.value);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [to, from, duration, format]);

  return ref;
}
