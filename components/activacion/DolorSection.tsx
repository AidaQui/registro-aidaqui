import { Brain, Heart, Dna, Atom } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Second section: what working multidimensionally means.
 *
 * ── POR QUÉ NO ES UN BENTO ──
 *
 * Las cinco frases centrales son el MISMO patrón repetido —"puedes X, y sin
 * embargo Y"— y su fuerza está en la acumulación: una detrás de otra van
 * cercando la misma idea. Un bento las pondría en celdas de tamaños
 * distintos, y ahí la repetición deja de leerse como insistencia y pasa a
 * parecer cinco datos sueltos.
 *
 * Así que van iguales entre sí, en rejilla pareja. El bento se reserva para
 * contenido de pesos distintos, que no es este caso.
 *
 * ── LOS CUATRO CUERPOS ──
 *
 * El copy los nombra —mental, emocional, físico, energético— y por eso
 * abren la sección: son la promesa concreta de lo que se va a trabajar, y
 * enunciarlos antes de las frases da con qué leerlas.
 */

/*
 * Cada cuerpo lleva un fondo propio y su icono en grande por detrás del
 * nombre, a modo de segundo fondo.
 *
 * EL FONDO ES CSS, NO UNA FOTO. Las catorce imágenes de la carpeta ya están
 * repartidas entre las secciones de experiencia y de entregables, y repetir
 * cuatro de ellas aquí se nota a media página de distancia. Un degradado por
 * cuerpo —el tono lo pone `data-cuerpo` en globals.css— da fondo distinto a
 * cada tarjeta, no pesa nada y deja el icono legible por delante, que es lo
 * que una foto con detalle no permitiría.
 */
const CUERPOS = [
  { Icono: Brain, nombre: "Mental", clave: "mental" },
  { Icono: Heart, nombre: "Emocional", clave: "emocional" },
  /* La hélice: el cuerpo físico por lo que lo compone. Además enlaza con
     Academia ADN, que es de donde viene toda la marca. */
  { Icono: Dna, nombre: "Físico", clave: "fisico" },
  /* Un átomo: lo energético entendido como la materia de la que está hecho
     todo, que es más preciso que una llama o unas chispas. */
  { Icono: Atom, nombre: "Energético", clave: "energetico" },
];

const CONTRASTES = [
  {
    quieres: "Puedes querer algo mentalmente",
    pero: "y sentir miedo emocionalmente.",
  },
  {
    quieres: "Puedes saber que una decisión es correcta",
    pero: "y sentir cómo tu cuerpo físico se contrae.",
  },
  {
    quieres: "Puedes pedir una realidad diferente",
    pero: "y seguir respondiendo desde la misma programación de siempre.",
  },
  {
    quieres: "Puedes leer, formarte y aprender conceptos",
    pero: "y aún así vivir una vida que no representa tu crecimiento interno.",
  },
];

export default function DolorSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="frec-dolor" aria-labelledby="frec-dolor-title">
      <div className="frec-shell">
        <div className="frec-intro">
          {/* La bajada que había aquí se absorbió en el titular: decía lo
              mismo en otras palabras y partía en dos una sola idea. */}
          <h2 id="frec-dolor-title" className="frec-intro__title" data-reveal="title">
            Viviremos una experiencia energética y{" "}
            <em>multidimensional</em> diseñada para trabajar profundamente con
            tu cuerpo...
          </h2>
        </div>

        {/* El nombre va en blanco sobre el dorado, con un velo que lo apaga
            por abajo: el dorado tiene brillos casi blancos y sin ese velo el
            texto se perdería contra ellos. Las reglas están en globals.css
            bajo .frec-cuerpos[data-tipo="clara"]. */}
        <ul
          className="frec-cuerpos"
          data-tipo="clara"
          data-reveal-group
          data-reveal-fade
        >
          {CUERPOS.map(({ Icono, nombre, clave }) => (
            <li key={nombre} className="frec-cuerpo" data-cuerpo={clave}>
              {/* El icono es fondo, no ilustración: va detrás del nombre, a
                  gran tamaño y recortado por la tarjeta. De ahí que sea
                  aria-hidden y que el nombre viaje en su propio span. */}
              <span className="frec-cuerpo__marca" aria-hidden="true">
                <Icono size={120} strokeWidth={1.1} />
              </span>
              <span className="frec-cuerpo__nombre">{nombre}</span>
            </li>
          ))}
        </ul>

        {/* El eje de la sección, suelto y a ancho de lectura: es la frase que
            todo lo que sigue desarrolla.

            Los saltos van forzados y no al azar del navegador: a ancho de
            escritorio la frase caía dejando "piensa." sola en el segundo
            renglón. Los <br> sólo entran por encima de 700px —ver la regla
            .frec-eje__salto—, porque en móvil el ancho ya obliga a otro
            reparto. */}
        <p className="frec-eje" data-reveal="title">
          Porque tú no eres solamente
          <br className="frec-eje__salto" />{" "}
          <em>la parte de ti que piensa</em>.
        </p>

        <ul className="frec-contrastes" data-reveal-group data-reveal-fade>
          {CONTRASTES.map(({ quieres, pero }, i) => (
            <li key={i} className="frec-contraste">
              <p className="frec-contraste__quieres">{quieres}</p>
              {/* El "y" del copy queda implícito en la disposición: arriba lo
                  que se quiere, abajo lo que ocurre de verdad, y entre los dos
                  una regla que marca que no coinciden. */}
              <span className="frec-contraste__corte" aria-hidden="true" />
              <p className="frec-contraste__pero">{pero}</p>
            </li>
          ))}
        </ul>

        {/* El remate en panel violeta, como el cierre de la lista de espera:
            es la única pieza oscura de la sección y por eso cierra. */}
        <div className="frec-remate" data-reveal>
          <p className="frec-remate__texto">
            Trabajar multidimensionalmente es dejar de trabajar únicamente desde
            el cuerpo mental y empezar a integrar todos tus cuerpos para vivir
            una <strong>transformación real</strong> que te brinde la
            coherencia, la paz, la plenitud y la capacidad de manifestar una
            vida que ames todos los días.
          </p>
        </div>
      </div>
    </section>
  );
}
