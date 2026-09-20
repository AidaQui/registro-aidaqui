import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Banda de transición: el amanecer sobre el valle y una sola frase.
 *
 * Es una pausa, no una sección de argumento. Va entre dos bloques densos de
 * texto y su trabajo es dejar respirar antes de la oferta.
 *
 * ── POR QUÉ EL TITULAR VA ABAJO Y AL CENTRO ──
 *
 * La imagen de escritorio trae su propio desvanecido a blanco en la parte
 * inferior central: está hecha para alojar texto justo ahí. Colocarlo en
 * cualquier otro sitio sería pelear contra el material.
 *
 * La de móvil NO trae ese desvanecido —es la foto entera—, así que allí el
 * velo lo pone el CSS. De ahí que las dos versiones no se resuelvan igual.
 */
export default function CambioSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-cambio"
      aria-labelledby="frec-cambio-title"
    >
      <div className="frec-cambio__bg" aria-hidden="true" />

      <div className="frec-cambio__shell">
        <h2
          id="frec-cambio-title"
          className="frec-cambio__title"
          data-reveal="title"
        >
          Estamos atravesando un cambio profundo de{" "}
          <em>conciencia planetaria</em>.
        </h2>
      </div>
    </section>
  );
}

/**
 * El desarrollo del titular anterior, ya sobre blanco.
 *
 * Va en su propia sección y no dentro de la banda por una razón práctica: la
 * banda existe para que se vea la fotografía, y meterle este texto encima
 * obligaría a estirarla y a taparla con un velo. Separadas, la imagen se ve
 * entera y el texto se lee sobre el fondo que le corresponde.
 *
 * ── LA ESTRUCTURA SIGUE AL COPY ──
 *
 *   1. EL DIAGNÓSTICO. Qué está pasando, en dos párrafos.
 *   2. EL GIRO. "No es algo que va a ocurrir fuera de nosotros": rompe la
 *      columna, porque ahí el argumento deja de hablar del mundo y empieza a
 *      hablar de quien lee.
 *   3. EL REMATE. Tres frases de peso creciente, en escalera, hasta la del
 *      sofá, que es la que tiene que quedar sonando.
 */
export function CambioTexto() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="frec-acel">
      <div className="frec-shell">
        <div className="frec-acel__intro" data-reveal>
          <p>
            Este es un período de aceleración. Cada vez hay más información y
            nuevas frecuencias disponibles para transformar nuestra realidad.
          </p>
          <p>
            Cuanto más se aceleren los procesos, mayor capacidad energética
            necesitamos y menos fugas podemos seguir sosteniendo.
          </p>
        </div>

        <div className="frec-acel__giro" data-reveal>
          <p className="frec-acel__giro-texto">
            La Nueva Tierra de la que tanto hablamos{" "}
            <em>no es algo que simplemente va a ocurrir fuera de nosotros</em>.
          </p>
          <p className="frec-acel__giro-pie">
            Es un estado de consciencia y frecuencia que requiere que hagamos el
            trabajo multidimensional dentro para poder vivirlo fuera.
          </p>

          {/* Encuadrada dentro del panel, a modo de pie: es la consecuencia
              directa de lo que el panel acaba de decir, y suelta debajo se
              leía como el primer escalón del remate, que empieza después. */}
          <p className="frec-acel__giro-nota">
            No se trata solamente de pedir o esperar una vida diferente.
          </p>
        </div>

        <div className="frec-acel__remate">
          <p className="frec-acel__paso frec-acel__paso--fuerte" data-reveal>
            Tienes que estar <em>preparada internamente</em> para poder
            vivirla. O de otro modo no llegará; o a lo mejor sí, pero no durará
            más de cinco días.
          </p>

          <p className="frec-acel__paso frec-acel__paso--cierre" data-reveal>
            Por eso nada cambiará para quien se quede sentado en el sofá
            consumiendo solo información.
          </p>
        </div>
      </div>
    </section>
  );
}
