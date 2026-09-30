import { Check } from "lucide-react";
import CheckoutCta from "@/components/activacion-v3/CheckoutCta";
import { PRECIO } from "@/components/activacion-v3/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * El detalle de lo que se está comprando.
 *
 * ── CHECKLIST Y NO TARJETAS CON FOTO ──
 *
 * La landing muestra estos mismos entregables con fotografía a sangre, porque
 * allí hay que hacerlos deseables. Aquí ya se decidió: lo que queda es
 * comprobar que está todo, y para eso una lista con marcas de verificación se
 * recorre en dos segundos mientras que ocho fotos piden volver a mirar.
 *
 * Es la misma información dicha en el registro que corresponde a cada
 * momento del embudo, no una versión pobre de la otra.
 */

const INCLUYE = [
  "Activación energética en vivo junto a Aida Qui",
  "Trabajo sobre las dimensiones mental, emocional, física y energética",
  "Canalización y acompañamiento durante la experiencia",
  "Encuentro en comunidad",
  "Grabación completa para volver a vivir e integrar la experiencia",
  "Activación complementaria #1",
  "Activación complementaria #2",
  "Preparación previa para llegar al 10/10 con mayor consciencia, claridad y dirección",
];

export default function PuenteIncluye() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="puente-incluye"
      aria-labelledby="puente-incluye-title"
    >
      <div className="frec-shell">
        <h2
          id="puente-incluye-title"
          className="puente-section-title"
          data-reveal="title"
        >
          Esto es todo lo que incluye <em>tu acceso</em>
        </h2>

        <ul className="puente-incluye__lista" data-reveal-group data-reveal-fade>
          {INCLUYE.map((item) => (
            <li key={item} className="puente-incluye__item">
              <span className="puente-incluye__check" aria-hidden="true">
                <Check size={15} strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="puente-incluye__total" data-reveal>
          Todo incluido por <strong>{PRECIO.actual}</strong>.
        </p>

        <div className="puente-incluye__cta" data-reveal>
          <CheckoutCta label={`Reservar mi lugar por ${PRECIO.actual}`} />
        </div>
      </div>
    </section>
  );
}
