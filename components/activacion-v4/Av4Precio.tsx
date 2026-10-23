import {
  Brain,
  CalendarCheck,
  Flower2,
  Radio,
  ShieldCheck,
  Tag,
  Video,
} from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import { EVENTO, LINKS, PRECIO } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Tarjeta única de precio, como la del plan anual de la referencia: cabecera
 * beige, fondo dorado y filas con borde. Sin segundo plan, sin tachado y sin
 * garantía.
 */

const INCLUYE = [
  { Icono: Video, t: "Una experiencia guiada vía Zoom" },
  {
    Icono: CalendarCheck,
    t: "Prácticas para integrar la experiencia en tu día a día.",
  },
  {
    Icono: Flower2,
    t: "Meditaciones para cultivar el amor, la alegría y la apertura a recibir.",
  },
  { Icono: Brain, t: "Mi práctica para trabajar las creencias que te limitan." },
  { Icono: Radio, t: "Una canalización para el grupo en directo." },
];

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

        <div className="av4-plan" data-reveal>
          <Av4Sello className="av4-plan__sello" size={110} />
          <p className="av4-plan__cab">ACTIVACIÓN DEL CORAZÓN · PAGO ÚNICO</p>

          <div className="av4-plan__cuerpo">
            <div className="av4-plan__cifra">
              {PRECIO.tachado && (
                <span className="av4-plan__tachado">{PRECIO.tachado}</span>
              )}
              <span className="av4-plan__todo">Todo por</span>
              <span className="av4-plan__precio">
                <span className="av4-plan__monto">{monto}</span>
                <span className="av4-plan__moneda">{moneda}</span>
              </span>
              <span className="av4-plan__nota">{PRECIO.nota}</span>
            </div>

            <ul className="av4-plan__lista">
              {INCLUYE.map(({ Icono, t }) => (
                <li key={t}>
                  <Icono size={20} strokeWidth={1.7} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>

            {/* El único botón que sale de la página: aquí se paga, con lo que
                incluye y cuánto cuesta a la vista. */}
            <Av4Cta
              href={LINKS.registro}
              label="Quiero unirme a la activación"
              className="av4-cta--bloque"
            />

            <ul className="av4-sellos">
              <li>
                <ShieldCheck size={14} strokeWidth={1.8} aria-hidden="true" />
                Compra segura
              </li>
              <li>
                <Tag size={14} strokeWidth={1.8} aria-hidden="true" />
                Pago único
              </li>
              <li>
                <Video size={14} strokeWidth={1.8} aria-hidden="true" />
                {EVENTO.formato}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
