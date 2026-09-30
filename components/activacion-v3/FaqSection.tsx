import { Plus } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Las cuatro dudas que quedan justo antes de pagar.
 *
 * ── POR QUÉ <details> Y NO UN ACORDEÓN PROPIO ──
 *
 * El elemento nativo ya trae todo lo que un acordeón necesita: abre y cierra
 * sin JavaScript, es accesible por teclado, lo anuncian los lectores de
 * pantalla y el buscador lee el contenido aunque esté cerrado. Un acordeón
 * hecho a mano tendría que replicar eso con estado, aria-expanded y manejo de
 * foco para llegar al mismo sitio.
 *
 * Quedan abiertas varias a la vez a propósito: quien viene a comprobar dos
 * cosas no tiene por qué perder la primera al abrir la segunda.
 *
 * ── POR QUÉ SÓLO CUATRO ──
 *
 * Son las cuatro que aparecen con el dedo sobre el botón. Un FAQ largo en una
 * landing de bajo ticket trabaja en contra: cada pregunta extra sugiere una
 * objeción que la persona no tenía.
 */

const PREGUNTAS = [
  {
    pregunta: "¿Necesito experiencia previa?",
    respuesta:
      "No. La experiencia está diseñada para que puedas atravesarla aunque sea tu primer acercamiento a este tipo de trabajo.",
  },
  {
    pregunta: "¿Qué pasa si no puedo conectarme en vivo?",
    respuesta:
      "Vas a recibir la grabación completa para vivir la experiencia posteriormente.",
  },
  {
    pregunta: "¿Las clases quedan grabadas?",
    respuesta:
      "Sí. Cada encuentro queda grabado y vas a tener el acceso a las grabaciones.",
  },
  {
    /* El aviso de spam va en la respuesta y no en una nota aparte: quien
       pregunta esto lo hace después de comprar y de no ver el correo, y ése
       es el momento exacto en que sirve saberlo. */
    pregunta: "¿Cómo accedo después de comprar?",
    respuesta:
      "Al confirmar tu inscripción vas a recibir acceso a un grupo privado de WhatsApp mediante email (revisa spam o promociones) y mediante WhatsApp, donde te compartimos las fechas, los accesos y todo lo que necesitas para el encuentro.",
  },
  {
    pregunta: "¿Cuánto tiempo tengo para inscribirme?",
    respuesta:
      "Las inscripciones están abiertas hasta el 9 de octubre a las 23:59.",
  },
  {
    pregunta: "¿Desde qué país puedo participar?",
    respuesta:
      "Desde cualquier lugar. La experiencia se realiza online mediante Zoom.",
  },
];

export default function FaqSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="frec-faq" aria-labelledby="frec-faq-title">
      <div className="frec-shell">
        <h2
          id="frec-faq-title"
          className="frec-section-title"
          data-reveal="title"
        >
          Preguntas <em>frecuentes</em>
        </h2>

        <div className="frec-faq__lista" data-reveal-group data-reveal-fade>
          {PREGUNTAS.map(({ pregunta, respuesta }) => (
            <details key={pregunta} className="frec-faq__item">
              <summary className="frec-faq__pregunta">
                {pregunta}
                {/* El signo gira a equis al abrirse; la rotación la hace el
                    CSS leyendo [open] en el padre. */}
                <span className="frec-faq__mas" aria-hidden="true">
                  <Plus size={18} strokeWidth={2} />
                </span>
              </summary>

              <p className="frec-faq__respuesta">{respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
