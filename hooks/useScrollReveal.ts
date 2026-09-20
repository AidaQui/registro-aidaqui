import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal de entrada al scroll, con el mismo lenguaje que la landing antigua:
 * fade + slide + blur, disparado al entrar en viewport.
 *
 * Convención por data-attribute dentro del contenedor devuelto:
 *  - [data-reveal]         → fade + slide desde abajo
 *  - [data-reveal="title"] → igual, un poco más de recorrido
 *  - [data-reveal="left"]  → entra desde la izquierda
 *  - [data-reveal="right"] → entra desde la derecha
 *  - [data-reveal-group]   → hijos directos animados en stagger
 *
 * ── POR QUÉ ANIMA UNA SOLA VEZ ──
 *
 * El disparo no se revierte al salir del viewport. Un reveal que vuelve a
 * ejecutarse cada vez que se sube y se baja convierte la página en algo que
 * no se queda quieto: lo que la primera vez se lee como entrada, a la tercera
 * se lee como un fallo de pintado.
 *
 * Respeta prefers-reduced-motion: si está activo, no anima nada.
 */

/** Desde dónde entra cada variante, en píxeles. */
const DESPLAZAMIENTO = {
  title: { y: 32, x: 0 },
  left: { y: 0, x: -36 },
  right: { y: 0, x: 36 },
  base: { y: 24, x: 0 },
} as const;

export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Elementos individuales
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const variante = el.dataset.reveal as keyof typeof DESPLAZAMIENTO;
        const { x, y } = DESPLAZAMIENTO[variante] ?? DESPLAZAMIENTO.base;
        const esTitulo = variante === "title";

        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          opacity: 0,
          x,
          y,
          filter: "blur(6px)",
          duration: esTitulo ? 0.9 : 0.8,
          ease: "power3.out",
        });
      });

      // Grupos en stagger (cada hijo directo entra escalonado)
      root
        .querySelectorAll<HTMLElement>("[data-reveal-group]")
        .forEach((group) => {
          // Si los hijos usan transform propio (tilt 3D), solo animamos opacity
          // para no pisar su transform. Se marca con data-reveal-fade.
          const fadeOnly = group.hasAttribute("data-reveal-fade");
          const children = Array.from(group.children) as HTMLElement[];
          children.forEach((child, i) => {
            gsap.from(child, {
              scrollTrigger: { trigger: child, start: "top 88%" },
              opacity: 0,
              ...(fadeOnly ? {} : { y: 22 }),
              duration: 0.65,
              delay: i * 0.08,
              ease: "power2.out",
            });
          });
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}
