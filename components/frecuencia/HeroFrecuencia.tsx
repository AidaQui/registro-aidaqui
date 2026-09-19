import Image from "next/image";
import { CalendarDays, Clock, Globe2, Video } from "lucide-react";
import FrecuenciaBadge from "@/components/frecuencia/FrecuenciaBadge";
import FrecuenciaCta from "@/components/frecuencia/FrecuenciaCta";
import { BANDERAS } from "@/components/frecuencia/Banderas";
import { EVENTO, HORARIOS } from "@/components/frecuencia/config";

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
            {/* El sello de Aida abre la fila: marca de quién es esto antes de
                los dos datos del evento. Va suelto, sin píldora, para que no
                parezca un tercer dato. */}
            <Image
              src="/favicon.png"
              alt="Aida Qui"
              width={44}
              height={44}
              className="frec-hero__sello"
              priority
            />

            <FrecuenciaBadge icono={<Video size={15} strokeWidth={2} />}>
              {EVENTO.formato}
            </FrecuenciaBadge>

            <FrecuenciaBadge icono={<CalendarDays size={15} strokeWidth={2} />}>
              {EVENTO.fechaCorta}
            </FrecuenciaBadge>
          </div>

          <h1 id="frec-hero-title" className="frec-hero__title">
            {EVENTO.titulo}
          </h1>

          {/* La promesa va en cita, con filete dorado: se lee como el
              subtítulo de la experiencia y no como otro párrafo más. */}
          <p className="frec-hero__lead">
            Una preparación energética para aumentar tu capacidad de integrar y
            sostener mayores niveles de información y consciencia.
          </p>

          <p className="frec-hero__body">
            Prepara tu cuerpo mental, emocional, físico y energético para salir
            de los bucles automáticos y empezar a encarnar la versión más
            alineada con tu Ser.
          </p>

          <div className="frec-schedules-block">
            <p id="frec-hero-schedules-title" className="frec-schedules__label">
              <Globe2 size={14} strokeWidth={2} aria-hidden="true" />
              Horarios según tu país
            </p>

            {/* Bandera y país arriba, hora debajo: la fila de arriba dice de
                quién es el dato y la de abajo lo da. */}
            <ul
              className="frec-schedules frec-schedules--hero"
              aria-labelledby="frec-hero-schedules-title"
            >
              {HORARIOS.map(({ pais, hora }) => {
                const Bandera = BANDERAS[pais];
                return (
                  <li key={pais} className="frec-schedule">
                    <span className="frec-schedule__head">
                      {Bandera && <Bandera className="frec-schedule__flag" />}
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
          </div>

          <FrecuenciaCta />
        </div>
      </div>
    </section>
  );
}
