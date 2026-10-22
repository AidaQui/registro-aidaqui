import Image from "next/image";
import { CircleCheck, ShieldCheck, Tag, Clapperboard } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Monograma from "@/components/activacion-v4/Av4Monograma";
import { LINKS, PRECIO } from "@/components/activacion-v4/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección oscura de decisión: mockup (portátil + pantallas inclinadas) a la
 * izquierda y tarjeta con borde dorado a la derecha, con la letra gigante
 * cruzando por detrás. Mismo contenido que PrecioSection de /activacion.
 *
 * No hay tarjeta de garantía: /activacion no promete ninguna.
 */

const INCLUYE = [
  "Experiencia energética en vivo",
  "Trabajo mental, emocional, físico y energético",
  "Canalización y acompañamiento",
  "Experiencia en comunidad",
  "Grabación completa",
  "Activación complementaria #1",
  "Activación complementaria #2",
  "Preparación previa al 10/10",
];

/** Miniaturas del portátil: las mismas imágenes de los carteles. */
const MINIS = [
  "/activacion-v2/item6.jpg",
  "/activacion-v2/item5.jpg",
  "/activacion-v2/item1.jpg",
  "/activacion-v2/a9d6b71518cf7f0361455aa66d945c39.jpg",
  "/activacion-v2/item3.jpg",
];

export default function Av4Precio() {
  const ref = useScrollReveal<HTMLElement>();
  /* La cifra va grande y el símbolo de moneda pequeño, como R$ en la
     referencia. */
  const monto = PRECIO.actual.replace(/€/g, "").trim();
  const moneda = PRECIO.actual.includes("€") ? "€" : "";

  return (
    <section
      ref={ref}
      id="av4-precio"
      className="av4-sec av4-sec--oscuro av4-precio"
      aria-labelledby="av4-precio-title"
    >
      <Av4Monograma variante="precio" />

      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">Todo lo que te vamos a entregar</p>
          <h2 id="av4-precio-title" className="av4-title">
            Asegura tu acceso a la{" "}
            <em className="av4-brand">Activación</em>
          </h2>
        </div>

        <div className="av4-precio__grid">
          <div className="av4-mock" data-reveal="left" aria-hidden="true">
            <div className="av4-mock__inclinadas">
              <div className="av4-mock__pantalla av4-mock__pantalla--a">
                <Image src="/activacion-v2/item4.jpg" alt="" fill sizes="240px" className="av4-cover" />
              </div>
              <div className="av4-mock__pantalla av4-mock__pantalla--b">
                <Image src="/activacion-v2/item1.jpg" alt="" fill sizes="240px" className="av4-cover" />
              </div>
            </div>

            <div className="av4-laptop">
              <div className="av4-laptop__pantalla">
                <div className="av4-laptop__cabecera">
                  <Av4Lockup tamano="chico" />
                </div>
                <div className="av4-laptop__fila">
                  {MINIS.map((src) => (
                    <div key={src} className="av4-laptop__mini">
                      <Image src={src} alt="" fill sizes="80px" className="av4-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="av4-laptop__base" />
            </div>
          </div>

          <div className="av4-precio__card" data-reveal="right">
            <Av4Lockup tamano="grande" />

            <ul className="av4-lista av4-lista--oscura">
              {INCLUYE.map((item) => (
                <li key={item}>
                  <CircleCheck size={17} strokeWidth={1.6} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="av4-precio__cifra">
              {PRECIO.tachado && (
                <span className="av4-precio__tachado">{PRECIO.tachado}</span>
              )}
              <span className="av4-precio__precio">
                <span className="av4-precio__monto">{monto}</span>
                <span className="av4-precio__moneda">{moneda}</span>
              </span>
              <span className="av4-precio__nota">{PRECIO.nota}</span>
            </div>

            {/* El único botón que sale de la página: aquí se paga, con lo que
                incluye y cuánto cuesta a la vista. */}
            <Av4Cta href={LINKS.registro} forma="caja" />

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
                <Clapperboard size={14} strokeWidth={1.6} aria-hidden="true" />
                Grabación incluida
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
