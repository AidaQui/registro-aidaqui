import { useEffect, useRef } from "react";

/**
 * Desplazamiento continuo de una fila, con freno y arranque progresivos.
 *
 * Se hace en JS y no con `animation-play-state` porque esa propiedad
 * corta y retoma de golpe: acá la velocidad se interpola hacia 0 al
 * pasar el mouse y vuelve a 1 al salir.
 *
 * La fila debe tener sus elementos duplicados: al llegar a la mitad se
 * reinicia la posición, y como el contenido es idéntico no se ve el corte.
 */
export function useMarquee<T extends HTMLElement = HTMLElement>(
  speed = 22 // píxeles por segundo
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = track.parentElement;
    let offset = 0;
    let current = 1; // velocidad actual (0 a 1)
    let target = 1;
    let last = performance.now();
    let frame = 0;

    const onEnter = () => {
      target = 0;
    };
    const onLeave = () => {
      target = 1;
    };

    container?.addEventListener("mouseenter", onEnter);
    container?.addEventListener("mouseleave", onLeave);

    const loop = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;

      // Interpolación exponencial: suaviza el frenado y el arranque
      current += (target - current) * (1 - Math.exp(-delta * 6));

      offset -= speed * current * delta;

      // La lista está duplicada: al pasar la mitad, volver al inicio
      const half = track.scrollWidth / 2;
      if (half > 0 && -offset >= half) {
        offset += half;
      }

      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      container?.removeEventListener("mouseenter", onEnter);
      container?.removeEventListener("mouseleave", onLeave);
    };
  }, [speed]);

  return ref;
}
