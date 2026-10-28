import { useEffect, useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección del área (sólo landings por área): es el ángulo de cada una.
 * A la izquierda el titular grande y el desarrollo; a la derecha un panel
 * oscuro con el "Cuando…:" y los cuatro resultados. Copy en `area`
 * (contenido.tsx). Si `area.foto` está, la foto enmarcada en arco ocupa la
 * columna izquierda y el panel se le superpone; sin foto, el layout de siempre.
 */
export default function Av4Area() {
  const ref = useScrollReveal<HTMLElement>();
  const { area: c, disenio } = useContenido();
  const progreso = !!disenio?.areaProgreso;
  const lista = useRef<HTMLUListElement>(null);

  /* Resultados que se encienden con el scroll: una línea dorada se llena hasta
     la altura de la ventana (70%) y cada resultado se enciende al alcanzarlo. */
  useEffect(() => {
    const ul = lista.current;
    if (!progreso || !ul) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Activa el estado apagado de los resultados; sin JS (o con movimiento reducido) se ven todos encendidos.
    ul.classList.add("av4-area__lista--js");
    const filas = Array.from(ul.children) as HTMLElement[];
    let raf = 0;
    const pintar = () => {
      raf = 0;
      const frente = window.innerHeight * 0.7;
      const top = ul.getBoundingClientRect().top;
      const centros = filas.map((f) => top + f.offsetTop + 18 + 15);
      const primero = centros[0];
      const ultimo = centros[centros.length - 1];
      const llena = Math.max(0, Math.min(ultimo - primero, frente - primero));
      ul.style.setProperty("--area-linea-top", `${primero - top}px`);
      ul.style.setProperty("--area-linea-alto", `${ultimo - primero}px`);
      ul.style.setProperty("--area-llena", `${llena}px`);
      filas.forEach((f, i) => f.classList.toggle("av4-area__item--on", centros[i] <= frente));
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(pintar);
    };
    pintar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      if (raf) cancelAnimationFrame(raf);
      ul.classList.remove("av4-area__lista--js");
    };
  }, [progreso]);

  if (!c) return null;
  const foto = c.foto;

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--rosa av4-area"
      aria-labelledby="av4-area-title"
    >
      <div
        className={`av4-wrap av4-area__grid${foto ? " av4-area__grid--foto" : ""}`}
      >
        <div className="av4-area__intro">
          <div data-reveal>
            <Av4Tag>{c.etiqueta}</Av4Tag>
          </div>
          <h2
            id="av4-area-title"
            className="av4-title av4-title--izq av4-area__titulo"
            data-reveal
          >
            {c.titular}
          </h2>
          <div className="av4-parrafos" data-reveal>
            {c.parrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {foto && (
          <div className="av4-area__foto" data-reveal="left" aria-hidden="true">
            <div className="av4-area__marco">
              <Image
                src={foto.src}
                alt=""
                width={foto.ancho}
                height={foto.alto}
                sizes="(max-width: 1000px) 90vw, 440px"
                className="av4-area__img"
                style={foto.posicion ? { objectPosition: foto.posicion } : undefined}
              />
            </div>
          </div>
        )}

        <div className="av4-area__panel" data-reveal="right">
          <p className="av4-area__cuando">{c.intro}</p>
          <ul
            ref={lista}
            className={`av4-area__lista${progreso ? " av4-area__lista--prog" : ""}`}
          >
            {c.items.map((t) => (
              <li key={t}>
                <span className="av4-area__check" aria-hidden="true">
                  <Check size={16} strokeWidth={2.6} />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {c.aviso && (
        <div className="av4-wrap">
          <p className="av4-area__aviso" data-reveal>
            {c.aviso}
          </p>
        </div>
      )}
    </section>
  );
}
