import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Identificación: título centrado y seis tarjetas con icono. Cada afirmación
 * del cliente se parte en su primera cláusula (título) y el resto (texto),
 * sin añadir palabras. El copy vive en contenido.tsx.
 */

export default function Av4Identificacion() {
  const ref = useScrollReveal<HTMLElement>();
  const { identificacion: c, ctaCompra } = useContenido();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-ident"
      aria-labelledby="av4-ident-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <Av4Tag>{c.etiqueta}</Av4Tag>
          <h2 id="av4-ident-title" className="av4-title">
            {c.titular}
          </h2>
          <p className="av4-texto">{c.texto}</p>
        </div>

        <ul className="av4-cards" data-reveal-group data-reveal-fade>
          {c.senales.map(({ titulo, texto }, i) => (
            <li key={titulo} className="av4-card">
              <div className="av4-card__in">
                <span className="av4-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="av4-pie-fila" data-reveal>
          <p>{c.cierre}</p>
          <Av4Cta href="#av4-precio" label={ctaCompra} />
        </div>
      </div>
    </section>
  );
}
