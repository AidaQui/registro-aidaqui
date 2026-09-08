import { useEffect, useRef } from "react";

/**
 * Desplazamiento continuo de una fila, con freno progresivo y arrastre.
 *
 * Se hace en JS y no con `animation-play-state` porque esa propiedad
 * corta y retoma de golpe: acá la velocidad se interpola hacia 0 al
 * pasar el mouse y vuelve a 1 al salir. Además permite arrastrar la fila
 * con el cursor o el dedo.
 *
 * La fila debe tener sus elementos duplicados: al llegar a la mitad se
 * reinicia la posición, y como el contenido es idéntico no se ve el corte.
 */
export function useMarquee<T extends HTMLElement = HTMLElement>(
  speed = 45 // píxeles por segundo
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = track.parentElement;
    if (!container) return;

    let offset = 0;
    let current = 1; // velocidad actual (0 a 1)
    let target = 1;
    let last = performance.now();
    let frame = 0;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startOffset = 0;

    const onEnter = () => {
      target = 0;
    };

    const onLeave = () => {
      if (!dragging) target = 1;
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      target = 0;
      startX = e.clientX;
      startOffset = offset;
      container.setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = e.clientX - startX;
      if (Math.abs(delta) > 4) moved = true;
      offset = startOffset + delta;
    };

    // Tras arrastrar, el pointerup dispara un click: si hubo movimiento
    // real hay que frenarlo para no activar botones sin querer.
    const onClickCapture = (e: MouseEvent) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      container.releasePointerCapture(e.pointerId);
      container.style.cursor = "";
      // Solo retoma si el cursor ya salió del área
      if (!container.matches(":hover")) target = 1;
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("click", onClickCapture, true);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    const loop = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;

      // Interpolación exponencial: suaviza el frenado y el arranque
      current += (target - current) * (1 - Math.exp(-delta * 6));

      if (!dragging) {
        offset -= speed * current * delta;
      }

      // La lista está duplicada: al pasar la mitad, volver al inicio.
      // Vale en los dos sentidos porque se puede arrastrar hacia atrás.
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (-offset >= half) offset += half;
        if (offset > 0) offset -= half;
      }

      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("click", onClickCapture, true);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
    };
  }, [speed]);

  return ref;
}
