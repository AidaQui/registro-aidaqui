import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Tercera sección: el cambio de consciencia planetaria y la Nueva Tierra.
 *
 * ── POR QUÉ ES OSCURA ──
 *
 * Va justo detrás del remate violeta de la sección anterior y justo delante
 * de la de experiencia, que es clara. Hacerla oscura encadena con el remate
 * —los dos hablan de lo mismo— y deja el corte donde tiene que estar: al
 * entrar en lo que la experiencia ofrece.
 *
 * ── LA ESTRUCTURA SIGUE AL COPY ──
 *
 * El texto tiene tres tiempos y cada uno pide una forma distinta:
 *
 *   1. EL DIAGNÓSTICO. Qué está pasando ahí fuera. Va arriba, en cuerpo
 *      grande, porque es la premisa de todo lo demás.
 *
 *   2. LA CORRECCIÓN. "No es algo que va a ocurrir fuera de nosotros". Es el
 *      giro del argumento, así que rompe la columna y va a ancho completo
 *      sobre su propia pieza.
 *
 *   3. EL REMATE. Las tres frases finales son las más duras del copy, y la
 *      última —la del sofá— es la que tiene que quedar sonando. Van en
 *      escalera, de menor a mayor peso.
 */
export default function NuevaTierraSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-tierra"
      aria-labelledby="frec-tierra-title"
    >
      {/* Las tres capas del fondo: el campo de estrellas, la aurora y el velo
          que las asienta. Decorativas las tres. */}
      <div className="frec-tierra__estrellas" aria-hidden="true" />
      <div className="frec-tierra__aurora" aria-hidden="true" />

      <div className="frec-shell frec-tierra__shell">
        <p className="frec-tierra__eyebrow" data-reveal>
          El momento que estamos viviendo
        </p>

        <h2
          id="frec-tierra-title"
          className="frec-tierra__title"
          data-reveal="title"
        >
          Estamos atravesando un cambio profundo de{" "}
          <em>conciencia planetaria</em>
        </h2>

        <div className="frec-tierra__intro" data-reveal>
          <p>
            Este es un período de aceleración. Cada vez hay más información y
            nuevas frecuencias disponibles para transformar nuestra realidad.
          </p>
          <p>
            Cuanto más se aceleren los procesos, mayor capacidad energética
            necesitamos y menos fugas podemos seguir sosteniendo.
          </p>
        </div>

        {/* EL GIRO. Rompe la columna de lectura: es donde el argumento deja de
            hablar del mundo y empieza a hablar de quien lee. */}
        <div className="frec-tierra__giro" data-reveal>
          <p className="frec-tierra__giro-texto">
            La Nueva Tierra de la que tanto hablamos{" "}
            <em>no es algo que simplemente va a ocurrir fuera de nosotros</em>.
          </p>
          <p className="frec-tierra__giro-pie">
            Es un estado de consciencia y frecuencia que requiere que hagamos el
            trabajo multidimensional dentro para poder vivirlo fuera.
          </p>
        </div>

        {/* EL REMATE, EN ESCALERA. Tres frases de peso creciente: la última es
            la que tiene que quedar sonando al pasar a la siguiente sección. */}
        <div className="frec-tierra__remate">
          <p className="frec-tierra__paso" data-reveal>
            No se trata solamente de pedir o esperar una vida diferente.
          </p>

          <p className="frec-tierra__paso frec-tierra__paso--fuerte" data-reveal>
            Tienes que estar <em>preparada internamente</em> para poder vivirla.
            O de otro modo no llegará; o a lo mejor sí, pero no durará más de
            cinco días.
          </p>

          <p className="frec-tierra__paso frec-tierra__paso--cierre" data-reveal>
            Por eso nada cambiará para quien se quede sentado en el sofá
            consumiendo solo información.
          </p>
        </div>
      </div>
    </section>
  );
}
