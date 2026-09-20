import Image from "next/image";
import { CalendarDays, Clock, Video } from "lucide-react";
import FrecuenciaBadge from "@/components/activacion/FrecuenciaBadge";
import FrecuenciaCta from "@/components/activacion/FrecuenciaCta";
import { BANDERAS } from "@/components/activacion/Banderas";
import { EVENTO, HORARIOS } from "@/components/activacion/config";

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

            <FrecuenciaBadge icono={<CalendarDays size={15} strokeWidth={2} />}>
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

          {/* LA PROMESA ES EL TITULAR.

              Es lo que más tiene que destacar de la página —por encima del
              propio nombre de la experiencia—, así que es el h1: lo que un
              buscador y un lector de pantalla leen como tema de la página no
              puede ser el logotipo, tiene que ser esto. */}
          <h1 id="frec-hero-title" className="frec-hero__lead">
            Una preparación energética para aumentar tu capacidad de integrar y
            sostener mayores niveles de información y consciencia.
          </h1>

          <p className="frec-hero__body">
            Prepara tu cuerpo mental, emocional, físico y energético para salir
            de los bucles automáticos y empezar a encarnar la versión más
            alineada con tu Ser.
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

          <FrecuenciaCta />
        </div>
      </div>
    </section>
  );
}
