import type { Patron } from "@/components/diagnostico/preguntas";
import { PREGUNTAS } from "@/components/diagnostico/preguntas";
import { FICHAS } from "@/components/diagnostico/resultados";

const whatsappGroupUrl =
  "https://chat.whatsapp.com/JBThHsrH03wJyIAbU4LbpA?mode=gi_t";

const WhatsAppIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.012-1.374l-.36-.214-3.733.977.998-3.645-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4.5 12.5l5 5 10-11"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="2.5"
      y="4.5"
      width="19"
      height="15"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M3.5 6.5l8.5 6 8.5-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Props = {
  patron: Patron;
  email: string;
  nombre?: string;
};

/**
 * Pantalla final: el patrón dominante y el paso siguiente.
 *
 * ── LA ESTRUCTURA SIGUE A LA LANDING DE REFERENCIA ──
 *
 * Tres bloques en vez de una columna corrida:
 *
 *   1. LA FICHA. Sello, rótulo, la frase que presenta y el nombre del patrón
 *      en cuerpo grande. Todo lo que identifica el resultado vive dentro de
 *      una sola pieza, así que se lee como un veredicto y no como el principio
 *      de una página.
 *
 *   2. LAS DOS CLAVES. Lo que hay detrás y lo que hay que integrar, fuera de
 *      la ficha: son lectura, no identificación.
 *
 *   3. EL CIERRE, en dos tarjetas a la par. El correo confirma lo que ya pasó;
 *      la comunidad propone lo que sigue. Una al lado de la otra dejan claro
 *      que son dos cosas distintas, y que sólo una pide actuar.
 *
 * EL NOMBRE VA EN EL RÓTULO. Es lo primero que se pidió en el formulario y
 * hasta aquí no se había usado para nada: verlo en el veredicto es lo que
 * convierte una ficha genérica en la tuya. Es opcional porque se puede llegar
 * sin haberlo dejado.
 *
 * El vídeo no se reproduce aquí a propósito: la entrega por correo es lo que
 * confirma la dirección y lo que deja el canal abierto.
 */
export default function Resultado({ patron, email, nombre }: Props) {
  const ficha = FICHAS[patron];
  const respondidas = PREGUNTAS.length;

  return (
    <div className="dg-resultado">
      {/* ══ 1. LA FICHA ══ */}
      <section className="dg-resultado__ficha">
        {/* El sello cierra el proceso antes de que se lea nada más: dice
            "esto ya está hecho", que es lo primero que se quiere saber al
            salir de la espera del escaneo. */}
        <span className="dg-resultado__sello" aria-hidden="true">
          <CheckIcon />
        </span>

        <p className="dg-resultado__eyebrow">
          Tu diagnóstico{nombre ? ` · ${nombre}` : ""}
        </p>

        {/* La frase de entrada y el nombre van separados: leídos juntos en una
            sola línea, el nombre del patrón perdería el peso que tiene que
            tener. Partidos, el nombre queda solo y manda. */}
        <p className="dg-resultado__lead">Tu patrón dominante es</p>

        <h1 className="dg-resultado__title">{ficha.titulo}</h1>

        <p className="dg-resultado__quote">«{ficha.frase}»</p>

        <p className="dg-resultado__text">{ficha.descripcion}</p>

        {/* Las dos etiquetas dicen lo mismo que el sello por otra vía: que
            esto salió de las respuestas dadas y que el proceso terminó. */}
        <div className="dg-resultado__chips">
          <span className="dg-resultado__chip">
            {respondidas} respuestas analizadas
          </span>
          <span className="dg-resultado__chip dg-resultado__chip--vivo">
            Diagnóstico listo
          </span>
        </div>
      </section>

      {/* ══ 2. LAS DOS CLAVES ══ */}
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

      {/* ══ 3. EL CIERRE ══ */}
      <div className="dg-resultado__cierre">
        <section className="dg-resultado__mail">
          <span className="dg-resultado__medallon" aria-hidden="true">
            <MailIcon />
          </span>
          <p className="dg-resultado__mail-text">
            Ya te envié a <strong>{email}</strong> tu lectura completa en vídeo:
            cómo se manifiesta este patrón en tu vida, por qué sigues
            repitiéndolo y cuál es tu primer paso para trascenderlo.
          </p>
          {/* El aviso del spam va aquí y no al pie: es una instrucción sobre
              este correo concreto, y lejos de él no se entendería de qué
              habla. */}
          <p className="dg-resultado__mail-nota">
            Si no lo ves en unos minutos, mira en spam o en la pestaña de
            promociones.
          </p>
        </section>

        <section className="dg-resultado__comunidad">
          <h2 className="dg-resultado__comunidad-title">Un último paso</h2>
          <p className="dg-resultado__note">
            En la comunidad de WhatsApp recibirás novedades y serás de las
            primeras personas en saber cuándo abrimos las plazas de Academia
            ADN.
          </p>

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
              Unirme a la comunidad
            </span>
          </a>
        </section>
      </div>
    </div>
  );
}
