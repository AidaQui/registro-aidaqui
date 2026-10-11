import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Mismo corte que el CSS de .rv2-aida: la bio sólo se pliega en mobile; en
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
// título se coloca por CSS arriba de la foto, centrado sobre el fondo claro.
export default function AboutAidaSection() {
  const ref = useScrollReveal<HTMLElement>();
  const [open, setOpen] = useState(false);
  // En el servidor no hay viewport: se asume escritorio (bio entera)
  const isMobile = useSyncExternalStore(subscribeMobile, isMobileNow, () => false);
  const plegada = isMobile && !open;

  return (
    <section ref={ref} className="rv2-aida" aria-labelledby="rv2-aida-title">
      <div className="rv2-aida__media">
        <Image
          src="/aida/aida-quien-es-v2.png"
          alt="Aida Qui riendo frente a su computadora, en una sala de madera"
          fill
          sizes="(max-width: 860px) 100vw, 56vw"
          className="rv2-aida__img"
        />
      </div>

      <div className="rv2-aida__shell">
        <div className="rv2-aida__copy" data-reveal-group>
          <h2 id="rv2-aida-title" className="rv2-aida__title">
            ¿Quién es <em>Aida Qui</em>?
          </h2>

          <p className="rv2-aida__text">
            Aida Qui es una de las referentes más reconocidas en transformación
            energética y consciencia aplicada en habla hispana.
          </p>

          {/* En mobile el resto de la bio queda plegado: quien quiere
              conocerla lo abre, y el CTA no queda cinco párrafos más abajo.
              Plegada es inert, así no se tabula ni se lee lo que no se ve. */}
          <div
            id="rv2-aida-mas"
            className={`rv2-aida__more${open ? " is-open" : ""}`}
            inert={plegada}
          >
            <div className="rv2-aida__more-inner">
              <p className="rv2-aida__text">
                Es creadora de la <strong>Academia ADN</strong>, un movimiento y
                escuela de transformación diseñado para ayudar a las personas a
                elevar su consciencia, transformar su realidad y vivir desde una
                mayor coherencia entre energía, identidad y vida.
              </p>
              <p className="rv2-aida__text">
                Durante años ha acompañado a miles de personas en procesos de
                transformación profunda, ayudándolas a cambiar su realidad desde la
                raíz: su energía, su identidad y la forma en la que habitan su vida.
              </p>
              <p className="rv2-aida__text">
                Su trabajo une espiritualidad práctica, energía, sistema emocional y
                transformación profunda para ayudar a las personas a dejar atrás
                viejas versiones de sí mismas y comenzar a vivir desde una frecuencia
                más auténtica, consciente y alineada.
              </p>
              <p className="rv2-aida__text">
                Más que enseñar espiritualidad, Aida guía procesos de integración y
                transformación profunda que ayudan a las personas a cambiar su
                energía, su realidad y todas las áreas de su vida.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rv2-aida__more-btn"
            aria-expanded={open}
            aria-controls="rv2-aida-mas"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Leer menos" : "Leer más"}
            <span className="rv2-aida__more-icon" aria-hidden="true">
              <ChevronDown size={15} strokeWidth={2.4} />
            </span>
          </button>

          <div className="rv2-aida__cta">
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
