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
  const { marca } = useContenido();
  const ref = useRef<HTMLDivElement>(null);

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
    <div className="av4-mac" ref={ref} aria-hidden="true">
      <div className="av4-mac__tapa">
        <div className="av4-mac__bisel">
          <span className="av4-mac__camara" />
          <div className="av4-mac__pantalla">
            <Image
              src="/activacion-v4/experiencia.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 90vw, 560px"
              className="av4-cover av4-mac__foto"
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
  );
}
