import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Mismo corte que el CSS de .ent-aida: la bio sólo se pliega en mobile; en
// escritorio va entera y el botón "Leer más" no se muestra.
const MOBILE_QUERY = "(max-width: 860px)";

function subscribeMobile(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const isMobileNow = () => window.matchMedia(MOBILE_QUERY).matches;

// Armado como la sección "Soy Pilar Sousa" de lp.pilarsousa.es/bootcamp:
// la foto no va en un marco sino de fondo, y se funde con la sección (hacia
// abajo en mobile; hacia la izquierda y abajo en escritorio). En mobile el
// título se coloca por CSS arriba de la foto, centrado sobre el cielo.
export default function AboutAidaSection() {
  const ref = useScrollReveal<HTMLElement>();
  const [open, setOpen] = useState(false);
  // En el servidor no hay viewport: se asume escritorio (bio entera)
  const isMobile = useSyncExternalStore(subscribeMobile, isMobileNow, () => false);
  const plegada = isMobile && !open;

  return (
    <section ref={ref} className="ent-aida" aria-labelledby="ent-aida-title">
      <div className="ent-aida__media">
        <Image
          src="/aida/quien-es-aida.png"
          alt="Aida Qui meditando en una terraza al atardecer"
          fill
          sizes="(max-width: 860px) 100vw, 56vw"
          className="ent-aida__img"
        />
      </div>

      <div className="ent-aida__shell">
        <div className="ent-aida__copy" data-reveal-group>
          <h2 id="ent-aida-title" className="ent-aida__title">
            ¿Quién es <em>Aida Qui</em>?
          </h2>

          <p className="ent-aida__text">
            Aida Qui es una de las referentes más reconocidas en transformación
            energética y consciencia aplicada en habla hispana.
          </p>

          {/* En mobile el resto de la bio queda plegado: quien quiere
              conocerla lo abre, y el CTA no queda cinco párrafos más abajo.
              Plegada es inert, así no se tabula ni se lee lo que no se ve. */}
          <div
            id="ent-aida-mas"
            className={`ent-aida__more${open ? " is-open" : ""}`}
            inert={plegada}
          >
            <div className="ent-aida__more-inner">
              <p className="ent-aida__text">
                Es creadora de la <strong>Academia ADN</strong>, un movimiento y
                escuela de transformación diseñado para ayudar a las personas a
                elevar su consciencia, transformar su realidad y vivir desde una
                mayor coherencia entre energía, identidad y vida.
              </p>
              <p className="ent-aida__text">
                Durante años ha acompañado a miles de personas en procesos de
                transformación profunda, ayudándolas a cambiar su realidad desde la
                raíz: su energía, su identidad y la forma en la que habitan su vida.
              </p>
              <p className="ent-aida__text">
                Su trabajo une espiritualidad práctica, energía, sistema emocional y
                transformación profunda para ayudar a las personas a dejar atrás
                viejas versiones de sí mismas y comenzar a vivir desde una frecuencia
                más auténtica, consciente y alineada.
              </p>
              <p className="ent-aida__text">
                Más que enseñar espiritualidad, Aida guía procesos de integración y
                transformación profunda que ayudan a las personas a cambiar su
                energía, su realidad y todas las áreas de su vida.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="ent-aida__more-btn"
            aria-expanded={open}
            aria-controls="ent-aida-mas"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Leer menos" : "Leer más"}
            <span className="ent-aida__more-icon" aria-hidden="true">
              <ChevronDown size={15} strokeWidth={2.4} />
            </span>
          </button>

          <div className="ent-aida__cta">
            <a href="#registro" className="pearl-btn pearl-btn--scroll">
              <div className="pearl-wrap">
                <p>
                  <span className="pearl-star" aria-hidden="true">✦</span>
                  <span className="pearl-label">Haz clic aquí para registrarte gratis</span>
                  <span className="pearl-star" aria-hidden="true">✦</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
