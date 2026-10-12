import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aprendizajes } from "@/components/registro-v3/contenido";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

/** Degradé de los íconos: lo usan por id (stroke="url(#...)"). */
const REFLEJO_ID = "rv3-learn-reflejo";

/** Aire entre la línea del camino y cada ícono, en px. */
const RESPIRO = 8;

/** Altura de la pantalla a la que va la punta de la línea mientras se baja. */
const LINEA_DE_LECTURA = "62%";

/**
 * Camino que une los íconos y sigue el scroll: la punta acompaña la lectura
 * (a LINEA_DE_LECTURA de la pantalla), cada ítem se enciende cuando la
 * línea llega a su ícono y, al subir, la línea se recoge y los íconos se
 * vuelven a apagar.
 *
 * Los tramos y la luz se ubican midiendo los íconos, porque el alto de cada
 * ítem depende de cuántos renglones ocupa el texto. Hasta que se mide, la
 * lista se ve como siempre (con los íconos encendidos): la clase is-listo
 * habilita el estado apagado recién cuando el camino ya puede dibujarse.
 */
function useCamino() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;

    const iconos = Array.from(raiz.querySelectorAll<HTMLElement>(".rv3-learn-item__icon"));
    const items = Array.from(raiz.querySelectorAll<HTMLElement>(".rv3-learn-item"));
    const tramos = Array.from(raiz.querySelectorAll<HTMLElement>(".rv3-camino__tramo"));
    const luz = raiz.querySelector<HTMLElement>(".rv3-camino__luz");
    if (iconos.length < 2 || !luz) return;

    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // avance: de 0 (primer ícono) a 1 (último)
    const estado = { avance: sinMovimiento ? 1 : 0 };
    let nodos: { arriba: number; abajo: number; centro: number }[] = [];

    const pintar = () => {
      const primero = nodos[0].centro;
      const y = primero + estado.avance * (nodos[nodos.length - 1].centro - primero);

      tramos.forEach((tramo, i) => {
        const desde = nodos[i].abajo + RESPIRO;
        const largo = nodos[i + 1].arriba - RESPIRO - desde;
        const p = largo > 0 ? Math.min(1, Math.max(0, (y - desde) / largo)) : 0;
        tramo.style.setProperty("--avance", p.toFixed(4));
      });

      items.forEach((item, i) => {
        item.classList.toggle("is-encendido", estado.avance > 0 && y >= nodos[i].centro - 1);
      });

      luz.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      raiz.classList.toggle("is-andando", estado.avance > 0 && estado.avance < 1);
    };

    const medir = () => {
      const base = raiz.getBoundingClientRect();
      nodos = iconos.map((icono) => {
        const r = icono.getBoundingClientRect();
        return { arriba: r.top - base.top, abajo: r.bottom - base.top, centro: r.top - base.top + r.height / 2 };
      });

      const primero = iconos[0].getBoundingClientRect();
      raiz.style.setProperty("--camino-x", `${(primero.left - base.left + primero.width / 2).toFixed(1)}px`);

      tramos.forEach((tramo, i) => {
        const desde = nodos[i].abajo + RESPIRO;
        tramo.style.top = `${desde.toFixed(1)}px`;
        tramo.style.height = `${Math.max(0, nodos[i + 1].arriba - RESPIRO - desde).toFixed(1)}px`;
      });

      pintar();
    };

    medir();
    raiz.classList.add("is-listo");

    if (sinMovimiento) {
      const ro = new ResizeObserver(medir);
      ro.observe(raiz);
      return () => ro.disconnect();
    }

    const disparador = ScrollTrigger.create({
      trigger: raiz,
      start: () => `top+=${nodos[0].centro} ${LINEA_DE_LECTURA}`,
      end: () => `top+=${nodos[nodos.length - 1].centro} ${LINEA_DE_LECTURA}`,
      onUpdate: ({ progress }) => {
        // Suaviza los saltos de la ruedita: la punta llega deslizando
        gsap.to(estado, { avance: progress, duration: 0.6, ease: "power2.out", overwrite: true, onUpdate: pintar });
      },
    });

    // Si la página ya carga pasada esta sección, el camino aparece hecho
    if (disparador.progress > 0) {
      estado.avance = disparador.progress;
      pintar();
    }

    // El texto puede cambiar de renglones (fuentes que cargan, otro ancho):
    // se vuelve a medir y a calcular dónde empieza y termina el recorrido.
    const ro = new ResizeObserver(() => {
      medir();
      disparador.refresh();
    });
    ro.observe(raiz);

    return () => {
      ro.disconnect();
      disparador.kill();
      gsap.killTweensOf(estado);
    };
  }, []);

  return ref;
}

// Lo que se comprende en el entrenamiento. Los ítems siguen sin recuadro y
// sin color de fondo: ícono de línea y texto grande, con el reflejo salvia
// de los íconos. Lo propio de la v3 es el camino que los une (useCamino).
export default function ClassContentSection() {
  const ref = useScrollReveal<HTMLElement>();
  const caminoRef = useCamino();

  return (
    <section ref={ref} className="class-content" aria-labelledby="class-content-title">
      <div className="class-content-bg" aria-hidden="true" />

      {/* Trazo de los íconos: de pino a salvia, con un brillo claro arriba a la
          izquierda, como si les diera la luz. En userSpaceOnUse (la grilla de
          24 de lucide) y no por caja: las líneas rectas del ancla tienen caja
          de ancho 0 y con objectBoundingBox no se pintarían. */}
      <svg className="rv3-learn-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={REFLEJO_ID} gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
            <stop offset="0%" stopColor="#e3eef0" />
            <stop offset="38%" stopColor="#80aaa0" />
            <stop offset="100%" stopColor="#456155" />
          </linearGradient>
        </defs>
      </svg>

      <div className="class-content-shell">
        <h2 id="class-content-title" className="class-content-title" data-reveal="title">
          Un entrenamiento espiritual en el que comprenderás:
        </h2>

        <div ref={caminoRef} className="rv3-learn-camino">
          <div className="rv3-camino" aria-hidden="true">
            {aprendizajes.slice(1).map((_, i) => (
              <span key={i} className="rv3-camino__tramo" />
            ))}
            <span className="rv3-camino__luz" />
          </div>

          <ul className="rv3-learn-list">
            {aprendizajes.map(({ icon: Icon, text }, i) => (
              <li key={i} className="rv3-learn-item">
                <span className="rv3-learn-item__icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={2} color={`url(#${REFLEJO_ID})`} />
                </span>
                <p className="rv3-learn-item__text">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
