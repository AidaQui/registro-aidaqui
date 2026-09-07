import { useScrollReveal } from "@/hooks/useScrollReveal";
import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";

type Props = {
  onOpenForm: () => void;
};

export default function ClosingEspera({ onOpenForm }: Props) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="closing-espera" aria-labelledby="closing-espera-title">
      <div className="closing-espera__panel">
        <div className="closing-espera__shell">
          <AcademiaBadge />

          <h2 id="closing-espera-title" className="closing-espera__title" data-reveal="title">
            Este puede ser <em>tu momento</em>.
          </h2>

          <p className="closing-espera__lead" data-reveal>
            Si algo dentro de ti sabe que ha llegado el momento de dejar de
            buscar fuera y empezar a vivir desde dentro.
          </p>

          <button
            type="button"
            className="pearl-btn espera-cta espera-cta--gold closing-espera__cta"
            onClick={onOpenForm}
            data-reveal
          >
            <div className="pearl-wrap">
              <p>
                <span className="pearl-star" aria-hidden="true">✦</span>
                QUIERO ACCEDER<span className="cta-label__extra"> A LA LISTA</span>
                <span className="pearl-star" aria-hidden="true">✦</span>
              </p>
            </div>
          </button>

          <p className="closing-espera__note" data-reveal>
            La próxima edición de <strong>Academia ADN</strong> abrirá sus
            puertas próximamente. Accede antes, con condiciones exclusivas.
          </p>
        </div>
      </div>

      <footer className="closing-espera__footer">
        <p>
          © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos los
          derechos reservados
        </p>
      </footer>
    </section>
  );
}
