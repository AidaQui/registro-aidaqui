import { Sparkles, PlayCircle, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Las tres dudas que quedan con el dedo sobre el botón.
 *
 * ── POR QUÉ NO ES UN ACORDEÓN ──
 *
 * La landing usa <details> plegables para su FAQ, que allí tiene sentido:
 * son más preguntas y cada una interesa a distinta gente. Aquí son tres y
 * caben abiertas. Un acordeón obligaría a pulsar para descubrir que la
 * respuesta tranquiliza, y en un pre-checkout cada pulsación de más es una
 * oportunidad de abandonar.
 *
 * Abiertas y en fila se leen de un vistazo sin tocar nada.
 */

const OBJECIONES = [
  {
    Icono: Sparkles,
    titulo: "¿Nunca hiciste una activación?",
    texto:
      "No necesitas experiencia previa. Aida va a guiarte durante todo el proceso.",
  },
  {
    Icono: PlayCircle,
    titulo: "¿No puedes estar en vivo?",
    texto:
      "Vas a recibir la grabación completa para que puedas vivir la experiencia posteriormente.",
  },
  {
    Icono: Globe,
    titulo: "¿Dónde se realiza?",
    texto:
      "La experiencia es online por Zoom, por lo que puedes participar desde cualquier lugar.",
  },
];

export default function PuenteObjeciones() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="puente-obj" aria-label="Últimas dudas">
      <div className="frec-shell">
        <ul className="puente-obj__lista" data-reveal-group data-reveal-fade>
          {OBJECIONES.map(({ Icono, titulo, texto }) => (
            <li key={titulo} className="puente-obj__card">
              <span className="puente-obj__icono" aria-hidden="true">
                <Icono size={20} strokeWidth={1.8} />
              </span>
              <h3 className="puente-obj__titulo">{titulo}</h3>
              <p className="puente-obj__texto">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
