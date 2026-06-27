import { useScrollReveal } from "@/hooks/useScrollReveal";
import SupportCard from "@/components/academia/SupportCard";

export default function ClosingSupport() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <>
      <section ref={ref} className="closing-support" aria-label="Soporte">
        <div className="closing-support__shell" data-reveal>
          <SupportCard />
        </div>
      </section>

      <footer className="site-footer">
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos los
          derechos reservados
        </p>
      </footer>
    </>
  );
}
