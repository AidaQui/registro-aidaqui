import { CircleCheck, ShieldCheck, Tag, Video } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import { EVENTO, LINKS, PRECIO } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección de decisión, bloque oscuro ciruela al estilo Atenza: titular en
 * serif con cursiva y una tarjeta crema con borde dorado fino.
 *
 * No hay tarjeta de garantía: /activacion no promete ninguna.
 */

const INCLUYE = [
  "Una experiencia guiada vía Zoom",
  "Prácticas para integrar la experiencia en tu día a día.",
  "Meditaciones para cultivar el amor, la alegría y la apertura a recibir.",
  "Mi práctica para trabajar las creencias que te limitan.",
  "Una canalización para el grupo en directo.",
];

export default function Av4Precio() {
  const ref = useScrollReveal<HTMLElement>();
  /* La cifra va grande y el símbolo de moneda pequeño. */
  const monto = PRECIO.actual.replace(/€/g, "").trim();
  const moneda = PRECIO.actual.includes("€") ? "€" : "";

  return (
    <section
      ref={ref}
      id="av4-precio"
      className="av4-sec av4-sec--oscuro av4-precio"
      aria-labelledby="av4-precio-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <p className="av4-corchetes">Todo lo que te vamos a entregar</p>
          <h2 id="av4-precio-title" className="av4-title">
            ¿Qué recibirás por solo{" "}
            <em className="av4-cursiva">{monto} euros</em>?
          </h2>
        </div>

        <div className="av4-precio__card" data-reveal>
          <Av4Sello className="av4-precio__sello" size={110} />
          <Av4Lockup tamano="grande" />

          <ul className="av4-lista">
            {INCLUYE.map((item) => (
              <li key={item}>
                <CircleCheck size={18} strokeWidth={1.6} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="av4-precio__cifra">
            {PRECIO.tachado && (
              <span className="av4-precio__tachado">{PRECIO.tachado}</span>
            )}
            <span className="av4-precio__todo">Todo por</span>
            <span className="av4-precio__precio">
              <span className="av4-precio__monto">{monto}</span>
              <span className="av4-precio__moneda">{moneda}</span>
            </span>
            <span className="av4-precio__nota">{PRECIO.nota}</span>
          </div>

          {/* El único botón que sale de la página: aquí se paga, con lo que
              incluye y cuánto cuesta a la vista. */}
          <Av4Cta
            href={LINKS.registro}
            label="Quiero unirme a la activación"
            className="av4-cta--bloque"
          />

          <ul className="av4-sellos">
            <li>
              <ShieldCheck size={14} strokeWidth={1.6} aria-hidden="true" />
              Compra segura
            </li>
            <li>
              <Tag size={14} strokeWidth={1.6} aria-hidden="true" />
              Pago único
            </li>
            <li>
              <Video size={14} strokeWidth={1.6} aria-hidden="true" />
              {EVENTO.formato}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
