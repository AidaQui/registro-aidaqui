import { CalendarDays, Clock } from "lucide-react";
import LightRays from "@/components/masterclass/LightRays";
import FrecuenciaBadge from "@/components/activacion/FrecuenciaBadge";
import FrecuenciaCta from "@/components/activacion/FrecuenciaCta";
import { BANDERAS } from "@/components/activacion/Banderas";
import { EVENTO, HORARIOS, LINKS } from "@/components/activacion/config";
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
        {/* LOS RAYOS DE LUZ, DETRÁS DEL CONTENIDO.

            Se reutiliza el componente de masterclass: ya está adaptado a
            TypeScript y usa el mismo ogl que el proyecto trae. Duplicarlo en
            esta carpeta sería mantener dos copias del mismo shader.

            El dorado es el de la paleta, no el blanco por defecto: sobre el
            panel violeta un rayo blanco se lee como un foco, y en dorado se
            lee como la luz que la marca ya usa.

            followMouse queda fuera: en un cierre el cursor va camino al botón,
            y unos rayos que lo persiguen tiran del ojo justo donde no toca. */}
        <div className="frec-cierre__rays" aria-hidden="true">
          {/* lightSpread bajo y rayLength largo: los rayos salen del centro
              superior y llegan hasta abajo en haces definidos. Con el spread
              alto que tenían se abrían tanto que el panel quedaba con una
              neblina uniforme en vez de rayos. */}
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffd9a0"
            raysSpeed={0.6}
            lightSpread={0.55}
            rayLength={2.2}
            fadeDistance={1.6}
            saturation={1}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.04}
            distortion={0.02}
          />
        </div>

        <div className="frec-cierre__shell">
          {/* Aquí la fecha, no el formato: es el cierre y lo que queda por
              decidir es cuándo. */}
          <FrecuenciaBadge icono={<CalendarDays size={15} strokeWidth={2} />}>
            {EVENTO.fechaCorta}
          </FrecuenciaBadge>

          {/* El nombre de la experiencia, en el mismo logotipo del hero: cierra
              donde abrió. */}
          <span className="frec-cierre__marca">{EVENTO.titulo}</span>

          <h2
            id="frec-cierre-title"
            className="frec-cierre__title"
            data-reveal="title"
          >
            Te espero este {EVENTO.fechaCorta} vía Zoom para trabajar el{" "}
            <em>desorden energético</em> y aumentar tu capacidad para procesar,
            integrar y sostener más información y consciencia.
          </h2>

          <p className="frec-cierre__lead" data-reveal>
            Si quieres salir de los bucles automáticos y empezar a encarnar la
            versión más alineada con tu Ser, reserva tu lugar ahora.
          </p>

          {/* Los horarios van antes de los botones: son el último dato que
              alguien comprueba —si le sirve la hora— y va justo antes de
              decidir, no después. */}
          <ul
            className="frec-schedules frec-schedules--on-panel"
            aria-label="Horarios por país"
          >
            {HORARIOS.map(({ pais, hora }) => {
              const Bandera = BANDERAS[pais];
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

          <div className="frec-cierre__actions" data-reveal>
            <FrecuenciaCta variant="gold" />

            {/* Misma estructura pearl que los demás CTA de la página —el
                envoltorio y el <p> son lo que el efecto necesita—, sólo que
                en verde: el color lo pone --pearl-bg desde .frec-support. */}
            <a
              href={LINKS.soporte}
              className="pearl-btn frec-cta frec-support"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pearl-wrap">
                <p>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="frec-support__icono"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.012-1.374l-.36-.214-3.733.977.998-3.645-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                  </svg>
                  Contacta con soporte
                </p>
              </div>
            </a>
          </div>
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
