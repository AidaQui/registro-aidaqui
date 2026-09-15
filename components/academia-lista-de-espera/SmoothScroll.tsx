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
 * Lleva la página hasta un elemento, respetando quién manda sobre el scroll.
 *
 * ⚠️ NO USAR scrollIntoView CUANDO LENIS ESTÁ MONTADO. Lenis lleva su propia
 * posición y la reescribe en cada fotograma desde su bucle de rAF: un
 * desplazamiento nativo lanzado por fuera se pelea con esa posición y, según
 * cuándo caiga respecto al fotograma, se queda a medias o vuelve al punto de
 * partida. Puede funcionar en una máquina lenta —donde el bucle va con retraso—
 * y fallar en una normal, que es la peor forma de fallar.
 *
 * Con la instancia viva, el desplazamiento se le pide A ELLA y no hay dos
 * dueños del scroll. Sin instancia —el scroll suave sólo se monta en la
 * portada, y no si el sistema pide menos movimiento— se recurre al nativo, que
 * ahí es el único que hay.
 *
 * `offset` centra el destino en la ventana en vez de pegarlo al borde
 * superior: un formulario clavado al canto de arriba no se lee como destino,
 * se lee como que la página se cortó.
 */
export function scrollSuaveA(id: string) {
  const destino = document.getElementById(id);
  if (!destino) return;

  if (instance) {
    const centrado = -Math.max(
      0,
      (window.innerHeight - destino.getBoundingClientRect().height) / 2,
    );
    instance.scrollTo(destino, { offset: centrado, duration: 1.2 });
    return;
  }

  destino.scrollIntoView({ behavior: "smooth", block: "center" });
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
