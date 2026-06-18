import { CalendarDays } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ClosingSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="closing" aria-labelledby="closing-title">
      <div className="closing-bg" aria-hidden="true" />

      <div className="closing-shell">
        <p className="closing-eyebrow" data-reveal>
          <CalendarDays size={15} strokeWidth={2} aria-hidden="true" />
          Masterclass gratuita
        </p>

        <h2 id="closing-title" className="closing-title" data-reveal="title">
          28 de Junio
        </h2>

        <ul className="closing-times" aria-label="Horarios por país" data-reveal-group>
          <li>
            <span className="closing-time-h">19HS</span>
            <span className="closing-time-c">España</span>
          </li>
          <li>
            <span className="closing-time-h">14HS</span>
            <span className="closing-time-c">Argentina</span>
          </li>
          <li>
            <span className="closing-time-h">12HS</span>
            <span className="closing-time-c">Colombia</span>
          </li>
        </ul>
      </div>

      <footer className="closing-footer">
        <p className="closing-footer-copy">
          © 2026 Aida Qui · Divine Alignment LLC · Todos los derechos reservados
        </p>
      </footer>
    </section>
  );
}
