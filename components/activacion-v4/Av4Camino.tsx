import { useEffect, useId, useRef, useState } from "react";
import { useMovimiento } from "@/components/activacion-v4/useMovimiento";

/**
 * "Para ti" en forma de camino (Misión Alma): las cinco frases, en tarjetas
 * alternadas a los lados, unidas por un trazo que se dibuja con el scroll.
 * Una punta de luz lo recorre mientras crece y dos lucecitas viajan por la
 * parte ya dibujada. Cada punto numerado se enciende al ser alcanzado.
 *
 * El trazo se calcula con las posiciones reales de los nodos (offsetTop, que
 * no cambia con las transformaciones de la entrada) y se recalcula al cambiar
 * el tamaño. Con prefers-reduced-motion el camino queda dibujado entero y sin
 * lucecitas; sin JS, las tarjetas y los números se ven igual (sólo falta el trazo).
 */

type Geo = { d: string; ancho: number; alto: number; ys: number[] };

/** Posición (x, y) del centro de `el` dentro de `raiz`, sin contar transformaciones. */
function centro(el: HTMLElement, raiz: HTMLElement) {
  let x = 0;
  let y = 0;
  let nodo: HTMLElement | null = el;
  while (nodo && nodo !== raiz) {
    x += nodo.offsetLeft;
    y += nodo.offsetTop;
    nodo = nodo.offsetParent as HTMLElement | null;
  }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

export default function Av4Camino({ items }: { items: string[] }) {
  const raiz = useRef<HTMLDivElement>(null);
  const nodos = useRef<(HTMLSpanElement | null)[]>([]);
  const trazo = useRef<SVGPathElement>(null);
  const mascara = useRef<SVGPathElement>(null);
  const punta = useRef<SVGCircleElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const vivo = useMovimiento();
  const [alcanzados, setAlcanzados] = useState(0);
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  /* Geometría: curvas en S entre los nodos (tangente vertical en cada uno). En
     móvil, donde los nodos quedan alineados, se les da un vaivén suave. */
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const medir = () => {
      const pts = nodos.current
        .filter((n): n is HTMLSpanElement => !!n)
        .map((n) => centro(n, el));
      if (pts.length < 2) return;
      const vaiven = Math.abs(pts[0].x - pts[1].x) < 8 ? 14 : 0;
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const dy = b.y - a.y;
        const s = i % 2 === 0 ? 1 : -1;
        d += ` C ${a.x + vaiven * s} ${a.y + dy * 0.5}, ${b.x - vaiven * s} ${b.y - dy * 0.5}, ${b.x} ${b.y}`;
      }
      setGeo({
        d,
        ancho: el.offsetWidth,
        alto: el.offsetHeight,
        ys: pts.map((p) => p.y),
      });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  /* Progreso con el scroll: el trazo crece hasta donde llega el 60% de la ventana. */
  useEffect(() => {
    const el = raiz.current;
    const p = trazo.current;
    const m = mascara.current;
    const pt = punta.current;
    if (!el || !p || !m || !pt || !geo) return;
    const largo = p.getTotalLength();
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pintar = (prog: number) => {
      const off = largo * (1 - prog);
      p.style.strokeDasharray = `${largo}`;
      p.style.strokeDashoffset = `${off}`;
      m.style.strokeDasharray = `${largo}`;
      m.style.strokeDashoffset = `${off}`;
      const q = p.getPointAtLength(largo * prog);
      pt.setAttribute("cx", `${q.x}`);
      pt.setAttribute("cy", `${q.y}`);
      pt.style.opacity = prog > 0.005 && prog < 0.995 ? "1" : "0";
      setAlcanzados(geo.ys.filter((y) => q.y >= y - 6).length);
    };

    if (reducido) {
      pintar(1);
      return;
    }

    let raf = 0;
    const calcular = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const frente = window.innerHeight * 0.62;
      const prog = Math.max(0, Math.min(1, (frente - r.top - 20) / (r.height - 40)));
      pintar(prog);
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(calcular);
    };
    calcular();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [geo]);

  return (
    <div className="av4-camino" ref={raiz}>
      {geo && (
        <svg
          className="av4-camino__svg"
          width={geo.ancho}
          height={geo.alto}
          viewBox={`0 0 ${geo.ancho} ${geo.alto}`}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient
              id={`${id}-g`}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={geo.alto}
            >
              <stop offset="0" stopColor="var(--av4-gold)" />
              <stop offset="1" stopColor="var(--av4-rose)" />
            </linearGradient>
            <mask
              id={`${id}-m`}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={geo.ancho}
              height={geo.alto}
            >
              <path
                ref={mascara}
                d={geo.d}
                fill="none"
                stroke="#fff"
                strokeWidth="26"
                strokeLinecap="round"
              />
            </mask>
          </defs>

          {/* Camino aún por recorrer: punteado y tenue. */}
          <path d={geo.d} className="av4-camino__traza" />
          {/* Camino recorrido. */}
          <path
            ref={trazo}
            id={`${id}-p`}
            d={geo.d}
            className="av4-camino__trazo"
            stroke={`url(#${id}-g)`}
          />

          {vivo && (
            <g mask={`url(#${id}-m)`} className="av4-camino__luces">
              {[0, 4.5].map((retraso) => (
                <circle key={retraso} r="3.2" className="av4-camino__luz">
                  <animateMotion
                    dur="9s"
                    begin={`-${retraso}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#${id}-p`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          )}

          <circle ref={punta} r="6" className="av4-camino__punta" />
        </svg>
      )}

      <ol className="av4-camino__lista">
        {items.map((texto, i) => (
          <li key={texto} className="av4-camino__paso">
            <span
              ref={(n) => {
                nodos.current[i] = n;
              }}
              className={`av4-camino__nodo${i < alcanzados ? " av4-camino__nodo--on" : ""}`}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div
              className="av4-camino__tarj"
              data-reveal={i % 2 === 0 ? "left" : "right"}
            >
              <p>{texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
