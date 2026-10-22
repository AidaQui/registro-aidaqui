import Image from "next/image";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Sección OSCURA: la experiencia como una fila de carteles altos (como los
 * módulos de la referencia). Mismo copy que ExperienciaSection de /activacion.
 *
 * Las imágenes son las de /activacion-v2 (sin texto quemado); a9d6b71518cf7f0361455aa66d945c39.jpg es un
 * archivo nuevo, todavía sin versionar.
 */

const PUNTOS = [
  {
    texto: "Liberar carga interna y energética.",
    foto: "/activacion-v2/item6.jpg",
  },
  {
    texto: "Generar mayor espacio mental y emocional.",
    foto: "/activacion-v2/item5.jpg",
  },
  {
    texto: "Reconectar con tu intuición.",
    foto: "/activacion-v2/item1.jpg",
  },
  {
    texto: "Aumentar tu capacidad de integración.",
    foto: "/activacion-v2/a9d6b71518cf7f0361455aa66d945c39.jpg",
  },
  {
    texto: "Regular tu sistema frente a nuevos cambios.",
    foto: "/activacion-v2/item3.jpg",
  },
  {
    texto: "Sostener una nueva etapa desde mayor coherencia.",
    foto: "/activacion-v2/item2.jpg",
  },
];

export default function Av4Experiencia() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--oscuro av4-exp"
      aria-labelledby="av4-exp-title"
    >
      <div className="av4-shell">
        <div className="av4-head" data-reveal>
          <p className="av4-eyebrow">La experiencia</p>
          <h2 id="av4-exp-title" className="av4-title">
            Por eso creamos la{" "}
            <span className="av4-serif av4-acento">
              Activación del Ser Multidimensional
            </span>
          </h2>
          <p className="av4-lead">
            Una experiencia energética guiada diseñada para trabajar
            profundamente con tu sistema y acompañarte a integrar el momento que
            estás atravesando.
          </p>
          <p className="av4-lead av4-lead--sub">
            Durante la activación vamos a trabajar para que puedas:
          </p>
        </div>
      </div>

      <ul className="av4-posters" data-reveal-group data-reveal-fade>
        {PUNTOS.map(({ texto, foto }, i) => (
          <li key={i} className="av4-poster">
            <Image
              src={foto}
              alt=""
              fill
              sizes="(max-width: 700px) 70vw, (max-width: 1200px) 30vw, 220px"
              className="av4-poster__img"
            />
            <span className="av4-poster__num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="av4-poster__texto">{texto}</p>
          </li>
        ))}
      </ul>

      <div className="av4-cta-fila" data-reveal>
        <Av4Cta href="#av4-precio" label="Quiero vivir esta activación" />
      </div>
    </section>
  );
}
