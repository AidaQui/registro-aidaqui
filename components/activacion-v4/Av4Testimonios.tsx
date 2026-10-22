import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Prueba social. VACÍA A PROPÓSITO, igual que en /activacion: no hay
 * testimonios de ESTA experiencia todavía y no se inventan ni se reciclan los
 * de la Academia ADN (otro producto). Mientras el array esté vacío la sección
 * no se renderiza y no deja hueco; al cargar testimonios reales aparece sola.
 */

type Testimonio = {
  nombre: string;
  texto: string;
  detalle?: string;
};

const TESTIMONIOS: Testimonio[] = [];

export default function Av4Testimonios() {
  const ref = useScrollReveal<HTMLElement>();

  if (TESTIMONIOS.length === 0) return null;

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-testi"
      aria-labelledby="av4-testi-title"
    >
      <div className="av4-shell">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">Quienes ya lo vivieron</p>
          <h2 id="av4-testi-title" className="av4-title">
            Lo que otras personas han <strong>experimentado</strong> trabajando
            con Aida
          </h2>
        </div>

        <ul className="av4-testi__lista" data-reveal-group data-reveal-fade>
          {TESTIMONIOS.map(({ nombre, texto, detalle }) => (
            <li key={nombre} className="av4-testi__card">
              <Quote size={22} strokeWidth={1.8} aria-hidden="true" />
              <p>{texto}</p>
              <p className="av4-testi__autor">
                {nombre}
                {detalle && <span>{detalle}</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
