import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección OSCURA: carrusel horizontal de carteles altos, como los módulos de
 * la referencia. Cada cartel parte una frase de ExperienciaSection de
 * /activacion en una línea pequeña y un título grande en salvia.
 *
 * Imágenes de /activacion-v2; a9d6b71518cf7f0361455aa66d945c39.jpg es un
 * archivo nuevo, todavía sin versionar.
 */

const PUNTOS = [
  {
    linea: "Liberar",
    titulo: "Carga interna y energética",
    foto: "/activacion-v2/item6.jpg",
  },
  {
    linea: "Generar mayor",
    titulo: "Espacio mental y emocional",
    foto: "/activacion-v2/item5.jpg",
  },
  {
    linea: "Reconectar con tu",
    titulo: "Intuición",
    foto: "/activacion-v2/item1.jpg",
  },
  {
    linea: "Aumentar tu capacidad de",
    titulo: "Integración",
    foto: "/activacion-v2/a9d6b71518cf7f0361455aa66d945c39.jpg",
  },
  {
    linea: "Regular tu sistema frente a",
    titulo: "Nuevos cambios",
    foto: "/activacion-v2/item3.jpg",
  },
  {
    linea: "Sostener una nueva etapa desde",
    titulo: "Mayor coherencia",
    foto: "/activacion-v2/item2.jpg",
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
          <p className="av4-eyebrow">Lo que vamos a trabajar</p>
          <h2 id="av4-modulos-title" className="av4-title">
            Todo lo que vas a vivir
            <br />
            <b>en la</b> <em className="av4-brand">Activación</em>
          </h2>
        </div>
      </div>

      <div className="av4-carrusel" data-reveal>
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
                sizes="(max-width: 700px) 60vw, 250px"
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
          Una experiencia energética guiada diseñada para trabajar{" "}
          <strong>profundamente con tu sistema</strong> y acompañarte a
          integrar el momento que estás atravesando.
        </p>

        <div className="av4-cta-fila" data-reveal>
          <Av4Cta href="#av4-precio" label="Quiero vivir esta activación" />
        </div>
      </div>
    </section>
  );
}
