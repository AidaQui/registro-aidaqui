import { Check, ShieldCheck, Tag, Video } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import { EVENTO, LINKS, PRECIO } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Precio con el diseño de la referencia: lo incluido a ambos lados y, en el
 * centro, una entrada troquelada (muesca arriba, medias lunas a los lados,
 * línea de perforación y código de barras decorativo). Sin logos de pago
 * inventados: sólo lo que es cierto. En móvil la entrada va primero.
 */

const INCLUYE = [
  "Una experiencia guiada vía Zoom",
  "Prácticas para integrar la experiencia en tu día a día.",
  "Meditaciones para cultivar el amor, la alegría y la apertura a recibir.",
  "Mi práctica para trabajar las creencias que te limitan.",
  "Una canalización para el grupo en directo.",
];

function Lista({ items, lado }: { items: string[]; lado: "izq" | "der" }) {
  return (
    <ul className={`av4-pr__lado av4-pr__lado--${lado}`} data-reveal-group data-reveal-fade>
      {items.map((t) => (
        <li key={t}>
          <span className="av4-pr__ico" aria-hidden="true">
            <Check size={18} strokeWidth={2.6} />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Av4Precio() {
  const ref = useScrollReveal<HTMLElement>();
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
          <h2 id="av4-precio-title" className="av4-title">
            ¿Qué recibirás por solo{" "}
            <span className="av4-oro">{monto} euros</span>?
          </h2>
        </div>

        <div className="av4-pr">
          <Lista items={INCLUYE.slice(0, 3)} lado="izq" />

          <div className="av4-tk" data-reveal>
            <div className="av4-tk__forma">
              <div className="av4-tk__arriba">
                <Av4Lockup tamano="grande" sello className="av4-lockup--centro" />
                <span className="av4-tk__pildora">{PRECIO.nota}</span>
              </div>

              <div className="av4-tk__perf" aria-hidden="true" />

              <div className="av4-tk__abajo">
                {PRECIO.tachado && (
                  <span className="av4-tk__tachado">{PRECIO.tachado}</span>
                )}
                <span className="av4-tk__todo">Todo por</span>
                <span className="av4-tk__precio">
                  <span className="av4-tk__monto">{monto}</span>
                  <span className="av4-tk__moneda">{moneda}</span>
                </span>

                {/* El único botón que sale de la página: aquí se paga, con lo
                    que incluye y cuánto cuesta a la vista. */}
                <Av4Cta
                  href={LINKS.registro}
                  label="Quiero unirme a la activación"
                  className="av4-cta--bloque"
                />

                <ul className="av4-sellos">
                  <li>
                    <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />
                    Compra segura
                  </li>
                  <li>
                    <Tag size={15} strokeWidth={1.8} aria-hidden="true" />
                    Pago único
                  </li>
                  <li>
                    <Video size={15} strokeWidth={1.8} aria-hidden="true" />
                    {EVENTO.formato}
                  </li>
                </ul>
              </div>

              <div className="av4-barras" aria-hidden="true" />
            </div>
          </div>

          <Lista items={INCLUYE.slice(3)} lado="der" />
        </div>
      </div>
    </section>
  );
}
