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
/*
 * PARTE LA DESCRIPCIÓN EN TRAMOS A LA VISTA Y TRAMOS VELADOS.
 *
 * Los tramos a velar vienen marcados con [[dobles corchetes]] en el texto de
 * resultados.ts —ver allí por qué se marca en el texto y no aquí—. Esto sólo
 * los separa.
 *
 * El paréntesis de captura en el `split` es lo que hace el trabajo: con él, el
 * resultado conserva TAMBIÉN los trozos que coinciden, y no sólo lo que queda
 * entre ellos. Así la lista sale alternando —claro, velado, claro, velado…— y
 * basta mirar si el trozo empezaba por corchete para saber cuál es cuál.
 *
 * Una descripción sin marcas devuelve un solo tramo, en claro: quitar los
 * corchetes de una ficha la deja legible entera, sin tocar este archivo.
 */
/* `[\s\S]` y no `.` con el flag `s`: ese flag exige ES2018 y el tsconfig del
   proyecto apunta por debajo, así que el type check del build lo rechaza. La
   clase de caracteres hace exactamente lo mismo —incluido el salto de línea—
   sin pedir nada al compilador. */
const MARCA_VELADA = /\[\[([\s\S]+?)\]\]/g;

function partirDescripcion(texto: string) {
  return texto
    .split(/(\[\[[\s\S]+?\]\])/g)
    .filter(Boolean)
    .map((trozo, i) => ({
      /* La clave es el índice porque un mismo texto puede repetirse en dos
         tramos y React necesita distinguirlos. La lista es fija: se calcula del
         mismo string en cada render y nunca se reordena. */
      clave: i,
      velado: trozo.startsWith("[["),
      texto: trozo.replace(MARCA_VELADA, "$1"),
    }));
}

export default function Resultado({ patron, email, nombre }: Props) {
  const ficha = FICHAS[patron];
  const respondidas = PREGUNTAS.length;

  const tramos = partirDescripcion(ficha.descripcion);

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

        {/* ══ SE DA EL NOMBRE; SE VELA LO QUE LO EXPLICA ══

            EL NOMBRE DEL PATRÓN VA EN CLARO. Es lo que se ha ganado por
            responder, y sin él la pantalla no entrega nada: "tu patrón
            dominante es" seguido de una mancha no es intriga, es un error.
            Además lo hace suyo —ya tiene nombre— y da algo que contar.

            LO QUE SE VELA ES EL DESARROLLO: la frase entera y, de la
            descripción, todo menos su arranque. Ahí es donde se dice CÓMO se
            manifiesta y QUÉ hacer con ello, que es exactamente lo que promete
            el correo. Leído aquí, el correo pierde su motivo.

            LAS PRIMERAS PALABRAS SÍ SE LEEN. Un bloque borroso entero se salta
            con la vista; un párrafo que empieza a hablarle a la persona —"Has
            hecho mucho trabajo interno, pero una parte de ti sigue
            necesitando…"— y se difumina justo donde iba a concretar, se queda
            enganchado. El corte es el gancho.

            aria-hidden en lo velado: para un lector de pantalla el desenfoque
            no existe, y leería en voz alta justo lo que se está tapando. Lo
            que sí anuncia es la nota de debajo, en texto plano.

            Y la cortina no es una caja fuerte: el texto está en el HTML y quien
            abra el inspector lo verá. `user-select: none` frena el camino
            corto —subrayar y copiar—, que es como se lee un borroso sin
            despeinarse. */}
        <h1 className="dg-resultado__title">{ficha.titulo}</h1>

        <p className="dg-resultado__quote dg-velado" aria-hidden="true">
          «{ficha.frase}»
        </p>

        <p className="dg-resultado__text">
          {tramos.map((tramo) =>
            tramo.velado ? (
              <span
                key={tramo.clave}
                className="dg-resultado__velo-inline"
                aria-hidden="true"
              >
                {tramo.texto}
              </span>
            ) : (
              <span key={tramo.clave}>{tramo.texto}</span>
            ),
          )}
        </p>

        <p className="dg-resultado__velo-nota">
          Tu lectura completa te espera en el correo.
        </p>

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

      {/* ⚠️ AQUÍ IBAN "LO QUE HAY DETRÁS" Y "LO QUE NECESITA INTEGRAR".

          Se retiraron enteras. Eran las dos únicas piezas de la pantalla que
          entregaban el contenido en claro —la raíz del patrón y la salida—, y
          justo por eso no podían quedarse: con el diagnóstico velado arriba y
          estas dos legibles debajo, lo que se tapaba en un sitio se regalaba en
          el otro, y quien las leyera ya no necesitaba abrir el correo.

          Son lo que se promete en el email, no el anticipo. Su texto sigue en
          `ficha.detras` y `ficha.integrar` (resultados.ts), intacto y listo por
          si vuelven a hacer falta aquí. */}

      {/* ══ 2. EL CIERRE ══ */}
      <div className="dg-resultado__cierre">
        <section className="dg-resultado__mail">
          <span className="dg-resultado__medallon" aria-hidden="true">
            <MailIcon />
          </span>
          {/* EN PLURAL Y SIN "EN VÍDEO".

              "Ya te envié" hablaba en primera persona del singular, como si lo
              mandara Aida a mano; el envío es de la marca y va en plural.

              "En vídeo" se cae porque compromete un formato concreto: si la
              lectura llega en texto, esta línea deja de ser cierta y la
              promesa se rompe en el peor sitio, que es el correo que la
              persona acaba de esperar.

              "Este código" y no "este patrón": es el término con el que la
              página lleva llamándolo desde el hero —"tu código dominante"—, y
              cambiarlo justo aquí hace dudar de si se habla de lo mismo. */}
          <p className="dg-resultado__mail-text">
            Ya enviamos a <strong>{email}</strong> tu lectura completa. Cómo se
            manifiesta este código en tu vida, por qué sigues repitiendo ese
            patrón y cuál es tu primer paso para trascenderlo.
          </p>
          {/* El aviso del spam va aquí y no al pie: es una instrucción sobre
              este correo concreto, y lejos de él no se entendería de qué
              habla. */}
          <p className="dg-resultado__mail-nota">
            Si no lo ves en unos minutos, mira en spam o en la pestaña de
            promociones.
          </p>
        </section>

        {/* EL MARCO DE LA LUZ QUE GIRA.

            Es un envoltorio y no un `border` de la propia tarjeta porque lo que
            recorre el contorno es un degradado cónico animado, y un borde no
            puede llevar degradado con redondeo. El truco: el degradado se pinta
            en ESTE div, la tarjeta de dentro lleva su fondo opaco, y del
            degradado sólo asoma el píxel de relleno que los separa.

            No es el mismo recurso que un borde encendido fijo. Un tramo corto
            de luz dando vueltas no dice "esto importa", dice "esto te está
            esperando", y esta tarjeta es lo único que queda por hacer en toda
            la página.

            ⚠️ Su redondeo es el de la tarjeta + 1px (el relleno). Con el mismo
            valor, la curva de fuera cae por dentro de la de dentro y el filo se
            ve más fino en las esquinas que en los lados. */}
        <div className="dg-resultado__marco">
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
    </div>
  );
}
