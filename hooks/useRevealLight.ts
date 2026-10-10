import { useEffect, type RefObject } from "react";

/**
 * "Enciende" una sola vez cada card cuando entra en pantalla al hacer scroll.
 *
 * Marca con la clase .is-lit a cada hijo directo de [data-light-group] dentro
 * de `rootRef`; lo que hace esa clase lo decide el CSS (en /entrenamiento:
 * el mismo reflejo y realce que las cards muestran en hover).
 *
 * Va aparte de useScrollReveal porque GSAP ya escribe opacity/transform en
 * línea sobre esas cards: aquí sólo se pone una clase, sin tocar estilos.
 *
 * Las cards que entran juntas (una fila en escritorio) se encienden en
 * cascada; la demora va en la variable --light-delay.
 */
export function useRevealLight(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-light-group] > *")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        let enCascada = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          card.style.setProperty("--light-delay", `${enCascada * 140}ms`);
          card.classList.add("is-lit");
          observer.unobserve(card);
          enCascada += 1;
        });
      },
      // Mismo punto de disparo que el fade de useScrollReveal ("top 88%")
      { rootMargin: "0px 0px -12% 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [rootRef]);
}
