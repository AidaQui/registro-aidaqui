import { useEffect, useRef } from "react";
import Image from "next/image";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import { EVENTO, HORARIOS } from "@/components/activacion-v4/config";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";

/**
 * MacBook dibujado en CSS (marco de aluminio, muesca de cámara, base con
 * labio y sombra). No se usa una librería de mockups: las que existen no
 * declaran compatibilidad con React 19 y están sin mantenimiento.
 * La pantalla muestra una "diapositiva" con datos reales de config.
 */
export default function Av4Macbook() {
  const principal = HORARIOS[0];
  const { marca, laExperiencia } = useContenido();
  // Sólo las landings por área llevan movimiento con el scroll; v4 queda como era.
  const conMovimiento = !!laExperiencia;
  const foto = laExperiencia?.foto;
  const ref = useRef<HTMLDivElement>(null);
  const movRef = useRef<HTMLDivElement>(null);

  /* Movimiento con el scroll: el portátil sube un poco más lento que la página
     y se inclina hacia atrás al entrar (rotateX), quedando recto al centrar la
     ventana. Sólo transform (sin reflujo), una lectura por fotograma y apagado
     con prefers-reduced-motion. */
  useEffect(() => {
    const el = movRef.current;
    if (!el || !conMovimiento) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const pintar = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (entrando por abajo) … 0 (centrado) … 1 (saliendo por arriba)
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh * 0.75)));
      // En escritorio el portátil va pegado (sticky) junto al texto: sólo se inclina un poco al entrar y salir.
      const pegado = window.innerWidth > 900;
      el.style.setProperty("--mac-ty", pegado ? "0px" : `${(p * 38).toFixed(1)}px`);
      el.style.setProperty("--mac-rx", `${(p * (pegado ? 5 : 9)).toFixed(2)}deg`);
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
    };
  }, [conMovimiento]);

  /* Dispara la entrada escalonada cuando el portátil entra en pantalla. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.vivo = "si";
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <MovCon activo={conMovimiento} movRef={movRef}>
    <div className="av4-mac" ref={ref} aria-hidden="true">
      <div className="av4-mac__tapa">
        <div className="av4-mac__bisel">
          <span className="av4-mac__camara" />
          <div className="av4-mac__pantalla">
            <Image
              src={foto?.src ?? "/activacion-v4/experiencia.jpg"}
              alt=""
              fill
              sizes="(max-width: 900px) 90vw, 560px"
              className="av4-cover av4-mac__foto"
              style={foto?.posicion ? { objectPosition: foto.posicion } : undefined}
            />
            <div className="av4-mac__velo" />
            <div className="av4-mac__slide">
              <span className="av4-mac__vivo">
                <i /> EN DIRECTO
              </span>
              <strong>
                {marca.macbook[0]}
                <em>{marca.macbook[1]}</em>
              </strong>
              <span className="av4-mac__fecha">
                {EVENTO.fechaCorta} · {principal.hora}
              </span>
              <span className="av4-mac__zoom">{EVENTO.formato}</span>
            </div>
            <Av4Sello className="av4-mac__sello" size={64} />
          </div>
        </div>
      </div>
      <div className="av4-mac__base">
        <span className="av4-mac__labio" />
      </div>
    </div>
    </MovCon>
  );
}

/** Envoltorio del movimiento con el scroll; sin él (v4) no añade ningún elemento. */
function MovCon({
  activo,
  movRef,
  children,
}: {
  activo: boolean;
  movRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) {
  if (!activo) return <>{children}</>;
  return (
    <div className="av4-mac__mov" ref={movRef}>
      {children}
    </div>
  );
}
