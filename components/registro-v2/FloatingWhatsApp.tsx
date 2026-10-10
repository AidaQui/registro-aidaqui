import { useEffect, useState } from "react";
import { whatsappGroupUrl, WhatsAppIcon } from "@/components/registro-v2/whatsapp";

// id de la sección de cierre (ClosingSection): ahí ya está el mismo botón
// junto al CTA, así que el flotante se retira mientras esa sección se ve.
const CIERRE_ID = "cierre";

// Cuánto después del último evento de scroll se considera que frenó
const FIN_DE_SCROLL_MS = 700;

/**
 * Botón redondo de WhatsApp fijo abajo a la derecha durante toda la página.
 * Es el mismo botón perla del cierre; se oculta al llegar a esa sección
 * (para no duplicarlo en pantalla) y vuelve si se scrollea hacia arriba.
 * Mientras se scrollea se marca con .is-scrolling y el CSS lo destaca.
 */
export default function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const onScroll = () => {
      // Con el mismo valor React no vuelve a renderizar: llamarlo en cada
      // evento de scroll es barato.
      setScrolling(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setScrolling(false), FIN_DE_SCROLL_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const cierre = document.getElementById(CIERRE_ID);
    if (!cierre) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      // Se va cuando el cierre ya asoma un 15% sobre el borde inferior
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(cierre);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`ent-wa-float${hidden ? " is-hidden" : scrolling ? " is-scrolling" : ""}`}
      inert={hidden}
    >
      <a
        href={whatsappGroupUrl}
        className="pearl-btn ent-wa-pearl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Unirme al grupo de WhatsApp"
      >
        <div className="pearl-wrap">
          <p>
            <WhatsAppIcon />
          </p>
        </div>
      </a>
    </div>
  );
}
