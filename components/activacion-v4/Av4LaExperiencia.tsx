import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Macbook from "@/components/activacion-v4/Av4Macbook";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * "La experiencia" (sólo landings por área): qué vas a hacer en la sesión, con
 * el MacBook que muestra el directo. Copy en laExperiencia (contenido.tsx).
 */
export default function Av4LaExperiencia() {
  const ref = useScrollReveal<HTMLElement>();
  const { laExperiencia: c, ctaCompra, disenio } = useContenido();
  if (!c) return null;
  const ctaBajo = !!disenio?.ctaBajoMac;

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--rosa av4-vive"
      aria-labelledby="av4-vive-title"
    >
      <div className="av4-wrap av4-dos">
        <div className="av4-dos__copy">
          <div data-reveal>
            <Av4Tag>{c.etiqueta}</Av4Tag>
          </div>
          <h2 id="av4-vive-title" className="av4-title av4-title--izq" data-reveal>
            {c.titular}
          </h2>
          <p className="av4-texto av4-texto--izq" data-reveal>
            {c.texto}
          </p>

          <p className="av4-vive__intro" data-reveal>
            {c.intro}
          </p>
          <ul className="av4-borde av4-vive__lista" data-reveal-group data-reveal-fade>
            {c.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          {!ctaBajo && (
            <div className="av4-cta-fila" data-reveal>
              <Av4Cta href="#av4-precio" label={ctaCompra} />
            </div>
          )}
        </div>

        <div className={ctaBajo ? "av4-vive__mac" : undefined} data-reveal="right">
          <Av4Macbook />
          {ctaBajo && (
            <div className="av4-cta-fila av4-cta-fila--centro av4-vive__cta">
              <Av4Cta href="#av4-precio" label={ctaCompra} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
