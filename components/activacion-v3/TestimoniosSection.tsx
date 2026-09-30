import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Prueba social, debajo de la presentación de Aida.
 *
 * ── ESTÁ VACÍA A PROPÓSITO ──
 *
 * El array TESTIMONIOS está vacío y la sección entera no se renderiza mientras
 * lo esté. No es un olvido: no hay testimonios de ESTA experiencia todavía, y
 * los que el proyecto ya tiene cargados —en
 * components/academia-lista-de-espera/testimonials-data.ts— son de la Academia
 * ADN, otro producto y otro precio. Traerlos aquí sin decirlo pondría a
 * alguien hablando de una formación larga debajo del titular "lo que otras
 * personas han experimentado" de un encuentro de un día.
 *
 * Para activarla: cargar los testimonios reales en el array. La sección
 * aparece sola. Si se decide reutilizar los de la Academia, conviene
 * reformular el titular para que diga de qué están hablando.
 *
 * ── TRES O CUATRO, NO MÁS ──
 *
 * La retícula está pensada para tres o cuatro piezas cortas. Un muro de
 * testimonios largos en una landing de USD 33 pide más atención de la que la
 * decisión necesita.
 */

type Testimonio = {
  nombre: string;
  /** Una o dos frases. Los textos largos van a un modal, no a la tarjeta. */
  texto: string;
  /** Rótulo corto de contexto: país, o desde cuándo acompaña el proceso. */
  detalle?: string;
};

const TESTIMONIOS: Testimonio[] = [];

export default function TestimoniosSection() {
  const ref = useScrollReveal<HTMLElement>();

  if (TESTIMONIOS.length === 0) return null;

  return (
    <section
      ref={ref}
      className="frec-testi"
      aria-labelledby="frec-testi-title"
    >
      <div className="frec-shell">
        <h2
          id="frec-testi-title"
          className="frec-section-title"
          data-reveal="title"
        >
          Lo que otras personas han <em>experimentado</em> trabajando con Aida
        </h2>

        <ul className="frec-testi__lista" data-reveal-group data-reveal-fade>
          {TESTIMONIOS.map(({ nombre, texto, detalle }) => (
            <li key={nombre} className="frec-testi__card">
              <span className="frec-testi__marca" aria-hidden="true">
                <Quote size={22} strokeWidth={1.8} />
              </span>

              <p className="frec-testi__texto">{texto}</p>

              <p className="frec-testi__autor">
                {nombre}
                {detalle && (
                  <span className="frec-testi__detalle">{detalle}</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
