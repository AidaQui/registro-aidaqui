import type { Patron } from "@/components/diagnostico/preguntas";
import { FICHAS } from "@/components/diagnostico/resultados";

const whatsappGroupUrl =
  "https://chat.whatsapp.com/JBThHsrH03wJyIAbU4LbpA?mode=gi_t";

const WhatsAppIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.012-1.374l-.36-.214-3.733.977.998-3.645-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

type Props = {
  patron: Patron;
  email: string;
};

/**
 * Pantalla final: el patrón dominante y el paso siguiente.
 *
 * Muestra la ficha corta y anuncia que el desarrollo completo llega por
 * correo. El vídeo no se reproduce aquí a propósito: la entrega por email es
 * lo que confirma la dirección y lo que deja abierto el canal.
 */
export default function Resultado({ patron, email }: Props) {
  const ficha = FICHAS[patron];

  return (
    <div className="dg-resultado">
      <p className="dg-resultado__eyebrow">Tu patrón dominante</p>

      <h1 className="dg-resultado__title">{ficha.titulo}</h1>

      <p className="dg-resultado__quote">«{ficha.frase}»</p>

      <p className="dg-resultado__text">{ficha.descripcion}</p>

      <div className="dg-resultado__pair">
        <div className="dg-resultado__box">
          <p className="dg-resultado__box-label">Lo que hay detrás</p>
          <p className="dg-resultado__box-text">{ficha.detras}</p>
        </div>
        <div className="dg-resultado__box">
          <p className="dg-resultado__box-label">Lo que necesita integrar</p>
          <p className="dg-resultado__box-text">{ficha.integrar}</p>
        </div>
      </div>

      <div className="dg-resultado__mail">
        <p className="dg-resultado__mail-label">Revisa tu correo</p>
        <p className="dg-resultado__mail-text">
          Te hemos enviado a <strong>{email}</strong> tu lectura completa en
          vídeo: cómo se manifiesta este patrón en tu vida, por qué sigues
          repitiéndolo y cuál es tu primer paso para trascenderlo.
        </p>
      </div>

      <a
        href={whatsappGroupUrl}
        className="dg-resultado__cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="dg-resultado__cta-border" aria-hidden="true" />
        <span className="dg-resultado__cta-face">
          <span className="dg-resultado__cta-icon" aria-hidden="true">
            <WhatsAppIcon />
          </span>
          UNIRME A LA COMUNIDAD
        </span>
      </a>

      <p className="dg-resultado__note">
        En la comunidad de WhatsApp recibirás novedades y serás de las primeras
        personas en saber cuándo abrimos las plazas de Academia ADN.
      </p>
    </div>
  );
}
