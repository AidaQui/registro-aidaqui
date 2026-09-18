import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const experiencias = [
  {
    src: "/activacion/img-1.webp",
    alt: "Liberación energética y emocional de bloqueos",
    text: (
      <>
        Liberación energética y emocional de{" "}
        <em>bloqueos que no te permiten avanzar</em>
      </>
    ),
  },
  {
    src: "/activacion/img-2.webp",
    alt: "Activación de merecimiento y autenticidad",
    text: (
      <>
        Activación de <em>merecimiento y autenticidad</em>
      </>
    ),
  },
  {
    src: "/activacion/img-3.webp",
    alt: "Herramientas para sostener tu energía en el día a día",
    text: (
      <>
        Herramientas para sostener tu energía <em>en el día a día</em>
      </>
    ),
  },
  {
    src: "/activacion/img-4.webp",
    alt: "Amplificación de tu energía de manifestación",
    text: (
      <>
        Amplificación de tu <em>energía de manifestación</em>
      </>
    ),
  },
  {
    src: "/activacion/img-5.webp",
    alt: "Espacio de conexión grupal",
    text: (
      <>
        Un espacio de <em>conexión grupal</em> con personas que también están
        despertando
      </>
    ),
  },
  {
    src: "/activacion/img-6.webp",
    alt: "Reset energético profundo",
    text: (
      <>
        Un profundo <em>reset energético</em> para volver a sentirte alineado,
        recargado y conectado a tu Ser Superior
      </>
    ),
  },
  {
    src: "/activacion/img-7.webp",
    alt: "Acompañamiento en vivo durante la experiencia",
    text: (
      <>
        Acompañamiento <em>en vivo</em> durante toda la experiencia, con espacio
        para tus preguntas
      </>
    ),
  },
];

export default function ExperienciaSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-experiencia"
      aria-labelledby="frec-experiencia-title"
    >
      <div className="frec-shell">
        <h2
          id="frec-experiencia-title"
          className="frec-section-title"
          data-reveal="title"
        >
          Lo que experimentarás <em>dentro</em>
        </h2>

        <ul className="frec-experiencia__grid" data-reveal-group data-reveal-fade>
          {experiencias.map(({ src, alt, text }, i) => (
            <li key={i} className="frec-experiencia__card">
              <div className="frec-experiencia__media">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  quality={90}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="frec-experiencia__text">{text}</p>
            </li>
          ))}
        </ul>

        <div className="frec-close frec-close--centered">
          <p className="frec-close__emphasis" data-reveal="title">
            Estamos viviendo un cambio profundo de consciencia.
          </p>

          <div className="frec-close__body" data-reveal>
            <p>
              Muchas personas están intentando sostener nuevas realidades con
              identidades antiguas. Y por eso sienten desconexión, confusión,
              vacío, agotamiento, incoherencia interna.
            </p>
            <p>
              La verdadera transformación no ocurre solo entendiendo más. Ocurre
              cuando empiezas a habitar <em>una nueva frecuencia</em> en tu vida
              real: en tu cuerpo, en tus relaciones, en tus decisiones, en la
              forma en la que te eliges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
