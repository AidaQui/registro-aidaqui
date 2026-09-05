import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Instancia activa, para que el modal pueda frenar el scroll al abrirse. */
let instance: Lenis | null = null;

export function stopSmoothScroll() {
  instance?.stop();
}

export function startSmoothScroll() {
  instance?.start();
}

/**
 * Scroll suavizado con Lenis.
 *
 * Lenis no avanza solo: hay que llamar a raf() en cada frame, por eso el
 * bucle con requestAnimationFrame.
 *
 * wheelMultiplier 0.65 porque esta landing es corta: acorta cada golpe de
 * rueda para que la inercia tenga recorrido. En páginas largas iría cerca de 1.
 *
 * anchors: true para que los enlaces internos no peleen con el suavizado.
 *
 * Lenis toma el scroll de la ventana: si se agrega un carrusel o panel con
 * scroll propio, hay que marcarlo con data-lenis-prevent.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 2,
      wheelMultiplier: 0.65,
      anchors: true,
    });
    instance = lenis;

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
