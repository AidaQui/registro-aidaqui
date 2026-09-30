import Image from "next/image";
import { CalendarDays, Clock, Video } from "lucide-react";
import FrecuenciaBadge from "@/components/activacion/FrecuenciaBadge";
import FrecuenciaCta from "@/components/activacion/FrecuenciaCta";
import { BANDERAS } from "@/components/activacion/Banderas";
import { EVENTO, HORARIOS, LINKS } from "@/components/activacion/config";

export default function HeroFrecuencia() {
  return (
    <section className="frec-hero" aria-labelledby="frec-hero-title">
      <div className="frec-hero__bg" aria-hidden="true" />

      <div className="frec-hero__shell">
        <div className="frec-hero__copy">
          {/* DOS PÍLDORAS Y NO UNA.

              Son dos datos distintos —en qué consiste y cuándo es—, y
              separados cada uno lleva su propio icono, que es lo que permite
              leerlos de un vistazo sin llegar al texto. Juntos en una sola
              píldora, los dos iconos se amontonan contra el mismo borde. */}
          <div className="frec-hero__badges">
            {/* En móvil el rótulo se acorta a "En vivo": con el texto
                completo las dos píldoras no entran en la misma fila y la
                fecha cae sola a un segundo renglón.

                Las dos versiones viajan en el marcado y el CSS decide cuál se
                ve —ver .frec-badge__largo y .frec-badge__corto—, que es más
                barato y más estable que medir el ancho en JavaScript. */}
            <FrecuenciaBadge icono={<Video size={15} strokeWidth={2} />}>
              <span className="frec-badge__largo">{EVENTO.formato}</span>
              <span className="frec-badge__corto">En vivo</span>
            </FrecuenciaBadge>

            {/* La fecha va destacada sobre la otra píldora: es el dato que
                la página entera va a ir repitiendo hasta la sección de
                octubre, y aquí es donde empieza a pesar. */}
            <FrecuenciaBadge
              icono={<CalendarDays size={15} strokeWidth={2} />}
              className="frec-badge--fecha"
            >
              {EVENTO.fechaCorta}
            </FrecuenciaBadge>
          </div>

          {/* EL LOGOTIPO: SELLO Y NOMBRE, UNA SOLA PIEZA.

              El nombre deja de ser el titular de la página y pasa a ser parte
              de la marca, a cuerpo de logotipo. De ahí que vaya en un <span>
              y no en un encabezado: identifica la experiencia, no encabeza
              la sección. */}
          <div className="frec-hero__marca">
            <Image
              src="/favicon.png"
              alt=""
              aria-hidden="true"
              width={68}
              height={68}
              className="frec-hero__sello"
              priority
            />

            <span className="frec-hero__title">{EVENTO.titulo}</span>
          </div>

          {/* LA PREGUNTA ES EL TITULAR.

              Llega tráfico frío, así que el h1 no puede ser la promesa de la
              experiencia —eso da por hecho un contexto que quien llega no
              tiene—: es una pregunta sobre lo que ya le está pasando. Se
              reconoce antes de que le expliquemos nada. */}
          <h1 id="frec-hero-title" className="frec-hero__lead">
            ¿Sientes que estás atravesando muchos cambios internos y todavía te
            cuesta procesar todo lo que está pasando?
          </h1>

          <p className="frec-hero__body">
            Vive una experiencia energética guiada para liberar carga,
            recuperar claridad y preparar tu sistema para integrar con mayor
            equilibrio los cambios que estás viviendo.
          </p>

          {/* Bandera y país arriba, hora debajo: la fila de arriba dice de
              quién es el dato y la de abajo lo da. */}
          <ul className="frec-schedules" aria-label="Horarios por país">
            {HORARIOS.map(({ pais, hora }) => {
              const Bandera = BANDERAS[pais];
              /* La bandera va suelta, fuera de __head: en móvil pasa a ser la
                 columna izquierda de la pieza, y anidada no podría salir de
                 la fila del país. */
              return (
                <li key={pais} className="frec-schedule">
                  {Bandera && <Bandera className="frec-schedule__flag" />}
                  <span className="frec-schedule__head">
                    <span className="frec-schedule__country">{pais}</span>
                  </span>
                  <span className="frec-schedule__time">
                    <Clock
                      size={14}
                      strokeWidth={2}
                      className="frec-schedule__clock"
                      aria-hidden="true"
                    />
                    {hora}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Va al pricing, no al checkout externo: saltar directo afuera sin
              ver antes qué incluye y cuánto cuesta es la fricción que más
              rebota. El botón de la tarjeta de precio sí abre el checkout. */}
          <FrecuenciaCta
            href={LINKS.puente}
            label="Quiero vivir esta experiencia"
          />
        </div>
      </div>
    </section>
  );
}
