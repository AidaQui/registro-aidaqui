import { useEffect, useRef } from "react";

/**
 * Hélice de ADN girando, dibujada en canvas.
 *
 * Va en canvas y no en CSS porque la rotación es continua y cada par de bases
 * cambia de profundidad en cada fotograma: con transformaciones CSS habría que
 * animar decenas de elementos por separado y el giro se leería escalonado.
 *
 * Los colores son los de marca —violeta, dorado y crema— y el brillo de cada
 * punto depende de su profundidad, que es lo que da la sensación de volumen.
 */

type Props = {
  /** Altura del lienzo en píxeles CSS */
  height?: number;
  /** Multiplicador de velocidad de giro */
  speed?: number;
  /**
   * Deja rastro de los fotogramas anteriores en vez de limpiar el lienzo.
   *
   * El velo va en CREMA y no en negro: la técnica original está pensada para
   * fondo oscuro, y sobre el fondo claro de esta landing un velo negro dejaría
   * una mancha sucia acumulándose.
   */
  trail?: boolean;
  /** Opacidad global, para usarla como fondo sin competir con el contenido */
  opacity?: number;
};

const VIOLETA = { r: 106, g: 74, b: 156 };
const DORADO = { r: 212, g: 160, b: 32 };

export default function HelixCanvas({
  height = 260,
  speed = 1,
  trail = false,
  opacity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let ancho = 0;
    let alto = 0;
    let frame = 0;
    let giro = 0;
    let ultimo = performance.now();

    /* El lienzo se dimensiona en píxeles físicos y se escala al ratio de la
       pantalla: sin esto, en pantallas de alta densidad la hélice sale
       borrosa. */
    function redimensionar() {
      if (!canvas) return;
      const ratio = window.devicePixelRatio || 1;
      const caja = canvas.getBoundingClientRect();
      ancho = caja.width;
      alto = caja.height;
      canvas.width = Math.round(ancho * ratio);
      canvas.height = Math.round(alto * ratio);
      ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    redimensionar();
    window.addEventListener("resize", redimensionar);

    /* Una vuelta completa de la hélice cada PASO píxeles de alto. Cuanto menor
       sea, más apretada se ve la espiral. */
    const PASO = 130;
    const PARES = 26;

    function dibujar(ahora: number) {
      if (!ctx) return;

      const delta = Math.min((ahora - ultimo) / 1000, 0.1);
      ultimo = ahora;
      giro += delta * 0.9 * speed;

      /* Con rastro se pinta un velo casi transparente encima en vez de
         limpiar: los fotogramas anteriores se desvanecen y dejan la estela. */
      if (trail) {
        ctx.fillStyle = "rgba(255, 255, 253, 0.09)";
        ctx.fillRect(0, 0, ancho, alto);
      } else {
        ctx.clearRect(0, 0, ancho, alto);
      }

      ctx.globalAlpha = opacity;

      const centroX = ancho / 2;
      const amplitud = Math.min(ancho * 0.22, 70);
      const separacion = alto / (PARES - 1);

      for (let i = 0; i < PARES; i++) {
        const y = i * separacion;
        const fase = (y / PASO) * Math.PI * 2 + giro;

        /* Las dos hebras van en oposición de fase: cuando una está al frente,
           la otra está detrás. El seno da la posición horizontal y el coseno
           la profundidad. */
        const x1 = centroX + Math.sin(fase) * amplitud;
        const x2 = centroX + Math.sin(fase + Math.PI) * amplitud;
        const z1 = Math.cos(fase);
        const z2 = Math.cos(fase + Math.PI);

        /* La profundidad va de -1 (fondo) a 1 (frente). Se normaliza a 0-1
           para usarla como opacidad y como radio. */
        const p1 = (z1 + 1) / 2;
        const p2 = (z2 + 1) / 2;

        /* El travesaño entre las dos hebras, más tenue que los nodos: es lo
           que hace que se lea como una escalera y no como dos ondas sueltas. */
        const opacidadBarra = 0.05 + Math.min(p1, p2) * 0.16;
        ctx.strokeStyle = `rgba(${VIOLETA.r}, ${VIOLETA.g}, ${VIOLETA.b}, ${opacidadBarra})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        /* Los nodos alternan color: una hebra violeta y la otra dorada. */
        const nodo = (x: number, profundidad: number, dorado: boolean) => {
          const color = dorado ? DORADO : VIOLETA;
          const radio = 1.8 + profundidad * 2.6;
          const opacidad = 0.25 + profundidad * 0.7;

          /* El halo solo en los nodos del frente: da el punto de luz sin
             ensuciar los del fondo. */
          if (profundidad > 0.6) {
            const halo = ctx.createRadialGradient(x, y, 0, x, y, radio * 3.4);
            halo.addColorStop(
              0,
              `rgba(${color.r}, ${color.g}, ${color.b}, ${(profundidad - 0.6) * 0.5})`
            );
            halo.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(x, y, radio * 3.4, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacidad})`;
          ctx.beginPath();
          ctx.arc(x, y, radio, 0, Math.PI * 2);
          ctx.fill();
        };

        nodo(x1, p1, false);
        nodo(x2, p2, true);
      }

      /* Se restaura antes del próximo fotograma: el velo del rastro tiene que
         pintarse a plena opacidad o la estela no se limpiaría nunca. */
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(dibujar);
    }

    /* Con movimiento reducido se pinta un solo fotograma: la hélice se ve,
       pero quieta. */
    if (reducido) {
      dibujar(performance.now());
      cancelAnimationFrame(frame);
    } else {
      frame = requestAnimationFrame(dibujar);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", redimensionar);
    };
  }, [speed, trail, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="dg-helix"
      style={{ height }}
      aria-hidden="true"
    />
  );
}
