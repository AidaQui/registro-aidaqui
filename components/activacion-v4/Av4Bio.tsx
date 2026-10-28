import Image from "next/image";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Quién guía la experiencia (bio de la referencia): collage de tres fotos a
 * la izquierda y el texto a la derecha. Copy de SobreAida de /activacion.
 */
export default function Av4Bio() {
  const ref = useScrollReveal<HTMLElement>();
  const c = useContenido().bio;

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-bio"
      aria-labelledby="av4-bio-title"
    >
      <div className="av4-wrap av4-dos">
        <div className="av4-collage" data-reveal="left">
          <div className="av4-collage__alta">
            <Image
              src="/activacion-v4/bio-1.jpg"
              alt="Aida Qui meditando en un sendero"
              fill
              sizes="(max-width: 900px) 45vw, 260px"
              className="av4-cover"
            />
          </div>
          <div className="av4-collage__a">
            <Image
              src="/activacion-v4/momento-2.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 200px"
              className="av4-cover"
            />
          </div>
          <div className="av4-collage__b">
            <Image
              src="/activacion-v4/momento-4.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 200px"
              className="av4-cover"
            />
          </div>
          <Av4Sello className="av4-collage__sello" size={100} />
        </div>

        <div className="av4-dos__copy">
          <div data-reveal>
            <Av4Tag>{c.etiqueta}</Av4Tag>
          </div>
          <h2 id="av4-bio-title" className="av4-title av4-title--izq" data-reveal>
            {c.titular}
          </h2>

          <div className="av4-parrafos" data-reveal>
            {c.parrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
