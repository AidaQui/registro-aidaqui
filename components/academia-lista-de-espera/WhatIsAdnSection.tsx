import { Brain, HeartHandshake, Flame, Fingerprint } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";

const pillars = [
  {
    icon: <Brain size={22} strokeWidth={1.7} aria-hidden="true" />,
    label: "Tu mente",
  },
  {
    icon: <HeartHandshake size={22} strokeWidth={1.7} aria-hidden="true" />,
    label: "Tus emociones",
  },
  {
    icon: <Flame size={22} strokeWidth={1.7} aria-hidden="true" />,
    label: "Tu energía",
  },
  {
    icon: <Fingerprint size={22} strokeWidth={1.7} aria-hidden="true" />,
    label: "Tu identidad",
  },
];

const areas = [
  "Tus relaciones",
  "Tu abundancia",
  "Tu cuerpo",
  "Tus decisiones",
  "Tu propósito",
  "Tu lugar en el mundo",
];

export default function WhatIsAdnSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="whatis" aria-labelledby="whatis-title">
      <div className="whatis-shell">
        <div className="whatis-intro">
          <AcademiaBadge />

          <h2 id="whatis-title" className="whatis-title" data-reveal="title">
            ¿Qué es <em>Academia ADN</em>?
          </h2>

          <p className="whatis-lead" data-reveal>
            El lugar donde todo lo que has aprendido sobre transformación deja
            de ser conocimiento y empieza a convertirse en{" "}
            <strong>tu forma de vivir</strong>.
          </p>
        </div>

        <div className="whatis-body" data-reveal>
          <p>
            Academia ADN es un entrenamiento de transformación de{" "}
            <strong>6 semanas</strong> creado para personas que ya han
            despertado, han trabajado en sí mismas y saben que existe una
            versión mucho más elevada de su potencial, pero todavía no consiguen
            vivir desde ella de forma sostenida.
          </p>
        </div>

        {/* El contraste: lo que no es, frente a lo que sí */}
        <div className="whatis-contrast" data-reveal>
          <p className="whatis-contrast__no">
            Aquí no vienes a consumir más información.
          </p>
          <p className="whatis-contrast__yes">
            Vienes a trabajar sobre tu mente, tus emociones, tu energía y tu
            identidad para transformar desde la raíz los patrones que hoy siguen
            determinando cómo reaccionas, qué eliges, qué permites y la realidad
            que eres capaz de sostener.
          </p>
        </div>

        <ul className="whatis-pillars" data-reveal-group data-reveal-fade>
          {pillars.map((pillar, i) => (
            <li key={i} className="whatis-pillar">
              <span className="whatis-pillar__icon" aria-hidden="true">
                {pillar.icon}
              </span>
              {pillar.label}
            </li>
          ))}
        </ul>

        {/* El trabajo espiritual aterrizado en la vida diaria */}
        <div className="whatis-daily">
          <p className="whatis-daily__intro" data-reveal>
            Porque el verdadero trabajo espiritual no consiste en escapar de la
            experiencia humana.
          </p>

          <p className="whatis-daily__claim" data-reveal="title">
            Consiste en llevar tu consciencia a la forma en la que{" "}
            <em>vives cada día</em>.
          </p>

          <ul className="whatis-areas" data-reveal-group data-reveal-fade>
            {areas.map((area, i) => (
              <li key={i} className="whatis-area">
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* El giro colectivo: cambia de fondo para marcar el quiebre */}
        <div className="whatis-collective" data-reveal>
          <p className="whatis-collective__label">Pero nadie asciende solo</p>

          <div className="whatis-collective__body">
            <p>
              Academia ADN tampoco nació para ser un camino individual. Nació
              como una <strong>comunidad de almas</strong> que sienten que
              estamos atravesando un momento de transformación colectiva y han
              decidido formar parte consciente de él.
            </p>
            <p>
              Porque cada persona que eleva su consciencia transforma la manera
              en la que ama, educa, crea, lidera y toca la vida de los demás.
            </p>
            <p className="whatis-collective__accent">
              Tu transformación nunca termina en ti.
            </p>
            <p>
              Y cuando miles de personas empiezan a vivir desde un lugar
              diferente, dejamos de hablar únicamente de transformación
              personal.
            </p>
          </div>

          <p className="whatis-collective__closing">
            Empezamos a hablar de <em>una nueva humanidad</em>.
          </p>
        </div>
      </div>
    </section>
  );
}
