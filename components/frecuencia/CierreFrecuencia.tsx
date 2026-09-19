import { CalendarDays, Clock } from "lucide-react";
import FrecuenciaBadge from "@/components/frecuencia/FrecuenciaBadge";
import FrecuenciaCta from "@/components/frecuencia/FrecuenciaCta";
import { BANDERAS } from "@/components/frecuencia/Banderas";
import { EVENTO, HORARIOS, LINKS } from "@/components/frecuencia/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CierreFrecuencia() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-cierre"
      aria-labelledby="frec-cierre-title"
    >
      <div className="frec-cierre__panel">
        <div className="frec-cierre__shell">
          {/* Aquí la fecha, no el formato: es el cierre y lo que queda por
              decidir es cuándo. */}
          <FrecuenciaBadge icono={<CalendarDays size={15} strokeWidth={2} />}>
            {EVENTO.fechaCorta}
          </FrecuenciaBadge>

          <h2
            id="frec-cierre-title"
            className="frec-cierre__title"
            data-reveal="title"
          >
            Te espero {EVENTO.fechaLarga} para{" "}
            <em>recordar quién eres</em> más allá del ruido, el miedo y las
            versiones que ya no te representan.
          </h2>

          <p className="frec-cierre__lead" data-reveal>
            Si algo dentro de ti sabe que ha llegado el momento de encarnar la
            versión más alineada con tu Ser, este es el lugar.
          </p>

          <div className="frec-cierre__actions" data-reveal>
            <FrecuenciaCta variant="gold" />

            <a
              href={LINKS.soporte}
              className="frec-support"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.012-1.374l-.36-.214-3.733.977.998-3.645-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              Contacta con soporte
            </a>
          </div>

          <ul
            className="frec-schedules frec-schedules--on-panel"
            aria-label="Horarios por país"
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
      </div>

      <footer className="frec-footer">
        <p>
          © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos
          los derechos reservados
        </p>
      </footer>
    </section>
  );
}
