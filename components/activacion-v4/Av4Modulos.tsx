import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección OSCURA: la experiencia y "Lo que experimentarás dentro". Los cuatro
 * carteles son las cuatro frases del copy, partidas en una línea pequeña y un
 * título grande en salvia.
 *
 * Imágenes de /activacion-v2.
 */

const PUNTOS = [
  {
    linea: "Reconectar con",
    titulo: "Lo que de verdad deseas",
    foto: "/activacion-v2/item6.jpg",
  },
  {
    linea: "Reconocer",
    titulo: "Qué te está frenando",
    foto: "/activacion-v2/item5.jpg",
  },
  {
    linea: "Conectar con tu",
    titulo: "Corazón y tu poder interior",
    foto: "/activacion-v2/item1.jpg",
  },
  {
    linea: "Dar una dirección concreta a",
    titulo: "Lo que descubras",
    foto: "/activacion-v2/item3.jpg",
  },
];

export default function Av4Modulos() {
  const ref = useScrollReveal<HTMLElement>();
  const pista = useRef<HTMLUListElement>(null);

  /* Las flechas desplazan una tarjeta (con su hueco) hacia cada lado. */
  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const tarjeta = el.firstElementChild as HTMLElement | null;
    const paso = (tarjeta?.offsetWidth ?? 240) + 8;
    el.scrollBy({ left: dir * paso, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--oscuro av4-modulos"
      aria-labelledby="av4-modulos-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">La experiencia</p>
          <h2 id="av4-modulos-title" className="av4-title">
            <b>Una experiencia energética</b> para reconectar con la{" "}
            <em className="av4-brand">verdad de tu corazón</em>.
          </h2>
          <p className="av4-texto av4-texto--oscuro">
            Diseñada para ayudarte a reconocer lo que deseas de verdad,
            trabajar los miedos que te frenan y activar tu poder interior para
            crear una vida alineada con tu alma.
          </p>
          <p className="av4-lema">
            Escucha tu verdad. Recupera la confianza para vivirla.
          </p>
        </div>

        <div className="av4-head av4-head--sub" data-reveal>
          <h3 className="av4-subtitle">
            Lo que <em className="av4-brand">experimentarás</em> dentro
          </h3>
          <p className="av4-texto av4-texto--oscuro">
            A través de la meditación y una activación energética guiada:
          </p>
        </div>
      </div>

      <div className="av4-carrusel av4-carrusel--cuatro" data-reveal>
        <button
          type="button"
          className="av4-carrusel__flecha av4-carrusel__flecha--izq"
          onClick={() => mover(-1)}
          aria-label="Anterior"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <ul ref={pista} className="av4-posters">
          {PUNTOS.map(({ linea, titulo, foto }) => (
            <li key={titulo} className="av4-poster">
              <Image
                src={foto}
                alt=""
                fill
                sizes="(max-width: 700px) 60vw, 300px"
                className="av4-cover"
              />
              <div className="av4-poster__texto">
                <span className="av4-poster__linea">{linea}</span>
                <span className="av4-poster__titulo">{titulo}</span>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="av4-carrusel__flecha av4-carrusel__flecha--der"
          onClick={() => mover(1)}
          aria-label="Siguiente"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="av4-wrap">
        <p className="av4-texto av4-texto--oscuro" data-reveal>
          Llevaremos esa conexión a tu realidad: tus relaciones, tus proyectos
          y las decisiones que tienes delante para reconocer{" "}
          <strong>un siguiente paso</strong> y comprometerte contigo para darlo.
        </p>

        <div className="av4-cta-fila" data-reveal>
          <Av4Cta href="#av4-precio" />
        </div>
      </div>
    </section>
  );
}
