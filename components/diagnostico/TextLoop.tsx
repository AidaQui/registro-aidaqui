import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

import styles from "./TextLoop.module.css";

/**
 * Texto en bucle recorriendo un trazado.
 *
 * Port a TypeScript del TextLoop de React Bits. La lógica del recorrido es la
 * original: dos <textPath> persiguiéndose, de modo que cuando uno sale por un
 * extremo el otro ya está entrando por el opuesto y la cinta no tiene costura.
 *
 * ── EL ALTO DEL LIENZO ES UN PROP, Y ESO NO ESTABA EN EL ORIGINAL ──
 *
 * El original fija el viewBox en 1200x520. Como el SVG escala manteniendo la
 * proporción, en un contenedor de 1180 px eso son 510 px de alto: un bloque
 * enorme, no un divisor. Aquí el alto entra por `viewHeight` y toda la
 * geometría se calcula a partir de él, así que una cinta de 180 px es una
 * cinta de 180 px.
 *
 * Lo que se mantiene: el trazado se dibuja SOBREPASANDO los bordes del lienzo
 * (de -320 a ancho+320). Si empezara justo en el borde, las letras aparecerían
 * y desaparecerían de golpe en los cantos en vez de entrar y salir de cuadro.
 */

/* El ancho de referencia del lienzo. Deja de ser una constante en cuanto entra
   `maxHeight`: ver el cálculo de `viewWidth` más abajo. */
const BASE_W = 1200;
const EDGE_PAD = 6;

type Shape = "wave" | "circle" | "infinity" | "arch" | "line";

const buildPath = (
  shape: Shape,
  curviness: number,
  ribbonWidth: number,
  viewH: number,
  viewW: number
): string => {
  const VIEW_W = viewW;
  const CX = VIEW_W / 2;
  const CY = viewH / 2;
  const c = Math.max(0, curviness);
  /* El sitio que queda entre el eje del trazado y el borde del lienzo, ya
     descontado el grosor de la cinta. Es lo que impide que una curva alta se
     salga por arriba y quede cortada. */
  const room = Math.max(20, CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case "circle": {
      const r = Math.min(90 + c * 0.95, room);
      return `M ${CX - r} ${CY} A ${r} ${r} 0 1 1 ${CX + r} ${CY} A ${r} ${r} 0 1 1 ${CX - r} ${CY} Z`;
    }
    case "infinity": {
      const r = 150 + c * 1.4;
      const h = Math.min(60 + c * 0.95, room);
      return [
        `M ${CX} ${CY}`,
        `C ${CX + r * 0.55} ${CY - h} ${CX + r} ${CY - h} ${CX + r} ${CY}`,
        `C ${CX + r} ${CY + h} ${CX + r * 0.55} ${CY + h} ${CX} ${CY}`,
        `C ${CX - r * 0.55} ${CY - h} ${CX - r} ${CY - h} ${CX - r} ${CY}`,
        `C ${CX - r} ${CY + h} ${CX - r * 0.55} ${CY + h} ${CX} ${CY}`,
        "Z",
      ].join(" ");
    }
    case "arch": {
      const rise = Math.min(120 + c * 1.1, room * 2);
      return `M 120 ${CY + rise / 2} Q ${CX} ${CY - rise * 1.5} ${VIEW_W - 120} ${CY + rise / 2}`;
    }
    case "line":
      return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;
    case "wave":
    default: {
      const a = Math.min(c * 2.2, room * 2);
      /*
       * LOS TRAMOS SE GENERAN, NO VAN ESCRITOS A MANO.
       *
       * El original los lista fijos: T 320, T 640, T 960, T 1280 y un último
       * salto al borde. Eso funciona mientras el lienzo mida 1200, que era su
       * único caso. Aquí el lienzo se ensancha para topar la altura, y con la
       * lista fija el último tramo pasaba de 1280 al borde de una sola vez:
       * una cuadrática de mil y pico unidades, es decir una joroba enorme
       * pegada al lado derecho mientras el resto ondulaba normal.
       *
       * Generándolos cada PASO unidades, la onda mantiene su forma mida lo que
       * mida el lienzo.
       */
      const PASO = 320;
      const fin = VIEW_W + PASO;
      /* El primer tramo es una cuadrática explícita: da el punto de control
         que las T siguientes van reflejando para encadenar la onda. */
      const tramos = [`M ${-PASO} ${CY}`, `Q ${-PASO / 2} ${CY - a} 0 ${CY}`];
      for (let x = PASO; x <= fin; x += PASO) tramos.push(`T ${x} ${CY}`);
      return tramos.join(" ");
    }
  }
};

/* useLayoutEffect avisa por consola cuando se ejecuta en el servidor, y estas
   páginas se renderizan allí. La medida necesita el DOM, así que en servidor no
   hay nada que hacer: se cae a useEffect, que no avisa y tampoco corre. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  text?: string;
  shape?: Shape;
  path?: string;
  /** Alto del lienzo en unidades del viewBox. Marca la altura de la cinta. */
  viewHeight?: number;
  /**
   * Tope de altura REAL de la banda, en píxeles.
   *
   * Sin esto, un SVG con viewBox fijo escala todo su contenido en proporción
   * al ancho del contenedor: la misma cinta que mide 52 px en un móvil de
   * 390 px pasa a medir 256 px en un monitor de 1920. Lo que en pantalla
   * pequeña es un remate, en grande es una sección entera.
   *
   * Con un tope, el lienzo se ensancha a medida que crece el contenedor, así
   * que la escala baja y la banda deja de crecer al llegar a esta altura. Por
   * debajo del ancho donde se alcanza, el comportamiento es el de siempre.
   */
  maxHeight?: number;
  speed?: number;
  direction?: "forward" | "reverse";
  separator?: string;
  curviness?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  uppercase?: boolean;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  pauseOnHover?: boolean;
  className?: string;
  /** Texto real para lectores de pantalla. */
  label?: string;
  /**
   * Paradas del degradado con el que se pintan los separadores.
   *
   * Sin esto van del mismo color que el resto del texto. Con esto, cada `✦` se
   * separa en su propio <tspan> y recibe un degradado aparte.
   */
  starGradient?: string[];
};

export default function TextLoop({
  text = "",
  shape = "wave",
  path,
  viewHeight = 520,
  maxHeight,
  speed = 90,
  direction = "forward",
  separator = "✦",
  curviness = 90,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color = "#ffffff",
  ribbon = true,
  ribbonColor = "#5227FF",
  ribbonWidth = 86,
  pauseOnHover = true,
  className = "",
  label,
  starGradient,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const headRef = useRef<SVGTextPathElement | null>(null);
  const tailRef = useRef<SVGTextPathElement | null>(null);

  const [metrics, setMetrics] = useState({ length: 0, reps: 1 });
  const [boxWidth, setBoxWidth] = useState(0);

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, "")}`;

  /* El ancho real del contenedor. Sólo hace falta cuando hay tope de altura:
     el tope es en píxeles y el lienzo en unidades del viewBox, y sin saber
     cuántos píxeles mide el contenedor no se puede convertir de uno a otro. */
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !maxHeight) return undefined;

    const medir = () => setBoxWidth(root.clientWidth);
    medir();

    const ro = new ResizeObserver(medir);
    ro.observe(root);
    return () => ro.disconnect();
  }, [maxHeight]);

  /*
   * EL ANCHO DEL LIENZO ES LO QUE FIJA LA ESCALA.
   *
   * Un SVG dibuja su contenido a escala `anchoReal / anchoDelViewBox`. Si el
   * viewBox se queda fijo, esa escala crece con la ventana y la cinta engorda
   * sin parar: perfecta en un móvil, desproporcionada en un monitor.
   *
   * Ensanchando el viewBox en la misma medida en que crece el contenedor, la
   * escala se mantiene y la banda deja de crecer. El trazado se alarga, así que
   * lo que aparece es MÁS TEXTO en la misma altura, que es exactamente lo que
   * se quiere de una cinta: en pantalla grande caben más palabras, no palabras
   * más grandes.
   *
   * El Math.max deja intacto el comportamiento por debajo del ancho donde se
   * alcanza el tope. Ahí el lienzo sigue siendo el de base y la cinta escala
   * como siempre.
   */
  const viewWidth = useMemo(() => {
    if (!maxHeight || !boxWidth) return BASE_W;
    return Math.max(BASE_W, (boxWidth * viewHeight) / maxHeight);
  }, [maxHeight, boxWidth, viewHeight]);

  const d = useMemo(
    () => path || buildPath(shape, curviness, ribbonWidth, viewHeight, viewWidth),
    [path, shape, curviness, ribbonWidth, viewHeight, viewWidth]
  );

  /* La unidad que se repite: el texto más su separador. Se repite entera, así
     que el separador tiene que ir DENTRO para que no queden dos palabras
     pegadas en la costura entre una vuelta y la siguiente. */
  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    const gap = separator ? ` ${separator} ` : "   ";
    return `${base}${gap}`;
  }, [text, separator, uppercase]);

  const textStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  /* Cuántas veces cabe la unidad a lo largo del trazado. Se mide con un <text>
     invisible en vez de estimarlo por número de caracteres: la anchura real
     depende de la tipografía, y con una fuente web la medida cambia cuando
     termina de cargar. De ahí el segundo pase con document.fonts.ready. */
  useIsoLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;
    if (!pathEl || !measureEl) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }
      if (!length) return;

      const reps = unitWidth > 0 ? Math.max(1, Math.round(length / unitWidth)) : 1;
      setMetrics((prev) =>
        prev.length === length && prev.reps === reps ? prev : { length, reps }
      );
    };

    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [d, unit, fontSize, fontWeight, letterSpacing]);

  useEffect(() => {
    const { length } = metrics;
    const head = headRef.current;
    const tail = tailRef.current;
    if (!head || !tail || !length) return undefined;

    /* Los dos textos van siempre separados por una vuelta completa: cuando uno
       va por el offset X, el otro va por X menos el largo del trazado. Así uno
       entra por donde el otro sale y no aparece un hueco. */
    const apply = (offset: number) => {
      const partner = offset >= 0 ? offset - length : offset + length;
      head.setAttribute("startOffset", String(offset));
      tail.setAttribute("startOffset", String(partner));
    };

    apply(0);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Con movimiento reducido la cinta se queda quieta y legible: el texto ya
       está colocado por el apply(0) de arriba. */
    if (prefersReduced || speed <= 0) return undefined;

    const state = { offset: 0 };
    const tween = gsap.to(state, {
      offset: direction === "reverse" ? -length : length,
      duration: length / speed,
      ease: "none",
      repeat: -1,
      onUpdate: () => apply(state.offset),
    });

    const root = rootRef.current;
    const pause = () => tween.pause();
    const resume = () => tween.resume();

    if (pauseOnHover && root) {
      root.addEventListener("pointerenter", pause);
      root.addEventListener("pointerleave", resume);
    }

    return () => {
      tween.kill();
      if (pauseOnHover && root) {
        root.removeEventListener("pointerenter", pause);
        root.removeEventListener("pointerleave", resume);
      }
    };
  }, [metrics, speed, direction, pauseOnHover]);

  const loopText = unit.repeat(metrics.reps);
  const fitLength = metrics.length || undefined;
  const oroId = `${pathId}-oro`;

  /*
   * LOS SEPARADORES, EN SU PROPIO <tspan>.
   *
   * Un <text> de SVG se pinta con un solo `fill`, así que para que los `✦` sean
   * dorados y las palabras no, hay que trocear la cadena. Se parte por el
   * separador y se vuelve a montar intercalando un tspan por cada estrella.
   *
   * El corte pilla TODAS las estrellas, también las que vienen dentro del
   * propio texto y no sólo las que la cinta añade entre vuelta y vuelta: el
   * separador es el mismo carácter en los dos sitios.
   */
  const trozos =
    starGradient && separator ? loopText.split(separator) : null;

  const contenido = trozos
    ? trozos.flatMap((trozo, i) =>
        i === 0
          ? [<tspan key={`t${i}`}>{trozo}</tspan>]
          : [
              <tspan key={`s${i}`} fill={`url(#${oroId})`}>
                {separator}
              </tspan>,
              <tspan key={`t${i}`}>{trozo}</tspan>,
            ]
      )
    : loopText;

  return (
    <div
      ref={rootRef}
      className={`${styles.textLoop} ${className}`.trim()}
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={label ?? text}
      >
        {starGradient && (
          <defs>
            {/*
              EL DEGRADADO VA EN userSpaceOnUse Y SE REPITE.

              Con el modo por defecto (objectBoundingBox) el degradado se
              calcularía sobre la caja del <text> entero, que abarca toda la
              cinta: cada estrella recibiría un único tono según dónde cayera, y
              las de un extremo saldrían siempre oscuras.

              Anclado al espacio del lienzo y repitiéndose cada 320 unidades,
              todas las estrellas recorren el degradado completo. Y como el
              texto YA se desplaza a lo largo del trazado, cada una va cambiando
              de tono mientras avanza: el brillo sale del movimiento que ya
              había, sin animar nada más.
            */}
            <linearGradient
              id={oroId}
              gradientUnits="userSpaceOnUse"
              spreadMethod="repeat"
              x1="0"
              y1="0"
              x2="320"
              y2="0"
            >
              {starGradient.map((parada, i) => (
                <stop
                  key={i}
                  offset={`${(i / Math.max(starGradient.length - 1, 1)) * 100}%`}
                  stopColor={parada}
                />
              ))}
            </linearGradient>
          </defs>
        )}

        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke={ribbon ? ribbonColor : "none"}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          ref={measureRef}
          className={styles.measure}
          style={textStyle}
          aria-hidden="true"
        >
          {unit}
        </text>

        <text
          className={styles.text}
          style={textStyle}
          fill={color}
          dominantBaseline="central"
          aria-hidden="true"
          textLength={fitLength}
          lengthAdjust="spacing"
        >
          <textPath ref={headRef} href={`#${pathId}`} startOffset={0}>
            {contenido}
          </textPath>
        </text>

        <text
          className={styles.text}
          style={textStyle}
          fill={color}
          dominantBaseline="central"
          aria-hidden="true"
          textLength={fitLength}
          lengthAdjust="spacing"
        >
          <textPath ref={tailRef} href={`#${pathId}`} startOffset={0}>
            {contenido}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
