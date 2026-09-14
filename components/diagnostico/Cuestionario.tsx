import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PREGUNTAS } from "@/components/diagnostico/preguntas";

type Props = {
  onFin: (respuestas: Record<string, number>, abierta: string) => void;
  onAtras: () => void;
};

/*
 * Las siete preguntas, una por pantalla.
 *
 * YA NO ENVÍA NADA. Solo recoge y devuelve: los datos de contacto se piden
 * antes, así que cuando esto termina el envío ya tiene con qué hacerse. El
 * cuestionario se ocupa de una sola cosa.
 *
 * ── LA PANTALLA ENTRA EN CASCADA ──
 *
 * Primero el enunciado y después las opciones una detrás de otra. Con todo
 * entrando a la vez el ojo no sabe dónde mirar y las respuestas se leen como
 * un bloque de texto; escalonadas, la mirada las recorre en el orden en que
 * hay que leerlas para elegir.
 *
 * Los tiempos están apretados a propósito —la última opción ha terminado
 * antes de los 900 ms— porque esto se repite SIETE VECES seguidas. Lo que en
 * una pantalla es elegante, repetido siete veces es una espera.
 *
 * ── LOS RETARDOS VAN EN ESTILO EN LÍNEA ──
 *
 * Y no como clases: un retardo calculado en tiempo de ejecución se escribe en
 * el HTML pero no genera ninguna regla si depende de un escáner de clases.
 * Aquí es CSS plano, así que `animationDelay` es además lo más directo.
 *
 * ── LAS OPCIONES SON <button>, NO RADIOS ──
 *
 * Un grupo de radios necesita marcar y DESPUÉS pulsar "siguiente": dos gestos
 * por pregunta, catorce en total. Aquí elegir ES avanzar. El `aria-pressed`
 * dice cuál quedó elegida al volver atrás.
 */

/* El compás de la entrada, en milisegundos. */
const RITMO = {
  enunciado: 60,
  primeraOpcion: 130,
  entreOpciones: 55,
  pie: 420,
} as const;

/* Pausa entre elegir y pasar a la siguiente. Sin ella la selección no se
   percibe y el test parece haberse saltado una pregunta; con 380 ms da
   tiempo a ver el borde dorado y el check antes del cambio. */
const RETARDO_AVANCE = 380;

export default function Cuestionario({ onFin, onAtras }: Props) {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [texto, setTexto] = useState("");
  const [elegida, setElegida] = useState<number | null>(null);
  const [error, setError] = useState("");
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const salidaRef = useRef<number | undefined>(undefined);

  const pregunta = PREGUNTAS[indice];
  const progreso = Math.round(((indice + 1) / PREGUNTAS.length) * 100);

  /* El temporizador de avance se limpia al desmontar: sin esto, salir a
     mitad de la pausa dejaría un setState sobre un componente muerto. */
  useEffect(() => {
    return () => window.clearTimeout(salidaRef.current);
  }, []);

  useEffect(() => {
    if (pregunta.abierta) areaRef.current?.focus({ preventScroll: true });
  }, [pregunta.abierta]);

  function elegir(opcion: number) {
    if (elegida !== null) return;

    setElegida(opcion);
    setRespuestas((previas) => ({ ...previas, [pregunta.id]: opcion }));

    salidaRef.current = window.setTimeout(() => {
      setElegida(null);
      setIndice((previo) => previo + 1);
    }, RETARDO_AVANCE);
  }

  function enviarAbierta(e: React.FormEvent) {
    e.preventDefault();
    if (texto.trim().length < 3) {
      setError("Escribe lo primero que venga, aunque sean pocas palabras.");
      return;
    }
    onFin(respuestas, texto.trim());
  }

  function volver() {
    window.clearTimeout(salidaRef.current);
    setError("");
    setElegida(null);
    if (indice === 0) {
      onAtras();
      return;
    }
    setIndice((previo) => previo - 1);
  }

  const idEnunciado = `enunciado-${pregunta.id}`;

  return (
    <div className="dg-quiz">
      {/* LA CABECERA: VOLVER Y BARRA EN LA MISMA FILA.

          El botón de volver estaba al pie, debajo de las opciones. Ahí obliga a
          recorrer toda la lista para encontrarlo, y aparece justo donde se está
          eligiendo respuesta, compitiendo con la acción principal.

          Arriba, junto a la barra, dice otra cosa: esto es navegación, no una
          opción más. Quien quiere retroceder lo ve sin bajar, y quien no, no lo
          cruza de camino a su respuesta.

          En la primera pregunta se queda deshabilitado pero SIGUE OCUPANDO SU
          HUECO: si desapareciera, la barra cambiaría de largo al pasar de la 1
          a la 2 y el salto se vería en pantalla. */}
      <div className="dg-quiz__head">
        <button
          type="button"
          className="dg-quiz__back"
          onClick={volver}
          disabled={indice === 0}
          aria-label="Volver a la pregunta anterior"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Atrás
        </button>

        <div
          className="dg-quiz__bar"
          role="progressbar"
          aria-valuenow={progreso}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            className="dg-quiz__bar-fill"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* La clave por pregunta reinicia la cascada de entrada en cada paso */}
      <div className="dg-quiz__body" key={pregunta.id}>
        {/* ── EL HUECO DEL ENUNCIADO ESTÁ RESERVADO ──

            Los enunciados van de 78 a 150 caracteres: el más corto ocupa dos
            renglones y el más largo cuatro en móvil. En flujo normal eso
            movería las opciones de sitio en cada pregunta, y el test daría un
            salto en cada pantalla.

            El min-height reserva el alto del más largo y `align-items: flex-end`
            pega el texto abajo: la distancia entre el enunciado y la primera
            opción es siempre la misma, y lo que crece lo hace hacia arriba,
            sobre el aire que ya hay debajo de la barra.

            ⚠️ SI UN ENUNCIADO FUTURO PIDE UN RENGLÓN MÁS hay que subir ese
            número, o las opciones volverán a saltar entre preguntas. */}
        <div className="dg-quiz__prompt">
          <h2
            id={idEnunciado}
            className="dg-quiz__question dg-sube"
            style={{ animationDelay: `${RITMO.enunciado}ms` }}
          >
            {pregunta.enunciado}
          </h2>
        </div>

        {/* LA ESCENA DE LA SITUACIÓN.

            Va DESPUÉS del enunciado, como en la referencia: primero se lee la
            pregunta y después se mira la escena que la ilustra. Con la imagen
            delante, el ojo se detenía en ella y la pregunta llegaba tarde.

            ── ALTO FIJO, IGUAL QUE EL ENUNCIADO ──

            Las originales son cuadradas de 1254px. Puestas a su proporción
            ocuparían la pantalla entera y empujarían las opciones fuera de
            vista. Y, sobre todo, romperían lo mismo que el min-height del
            enunciado protege: si cada imagen midiera distinto, las opciones
            saltarían de sitio en cada pregunta.

            Por eso la banda tiene alto fijo y la imagen se recorta con
            object-fit. Todas las escenas tienen a la mujer descentrada hacia
            arriba, así que el recorte se ancla arriba (object-position) para no
            decapitarla.

            `priority` no: son siete y solo se ve una a la vez. Cargarlas todas
            de golpe pelearía con el shader del fondo. */}
        {pregunta.imagen && (
          <div
            className="dg-quiz__escena dg-sube"
            style={{ animationDelay: `${RITMO.enunciado}ms` }}
          >
            <Image
              src={pregunta.imagen}
              alt=""
              width={1254}
              height={1254}
              sizes="(max-width: 700px) 100vw, 700px"
              className="dg-quiz__escena-img"
            />
          </div>
        )}

        {pregunta.abierta ? (
          <form className="dg-quiz__open" onSubmit={enviarAbierta}>
            <textarea
              ref={areaRef}
              className="dg-quiz__textarea dg-sube"
              style={{ animationDelay: `${RITMO.primeraOpcion}ms` }}
              placeholder="Escribe aquí lo primero que venga a ti…"
              rows={5}
              value={texto}
              onChange={(ev) => {
                setTexto(ev.target.value);
                if (error) setError("");
              }}
            />

            {pregunta.ayuda && (
              <p
                className="dg-quiz__hint dg-sube"
                style={{ animationDelay: `${RITMO.primeraOpcion + 60}ms` }}
              >
                {pregunta.ayuda}
              </p>
            )}

            {error && (
              <p className="dg-quiz__error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="pearl-btn espera-cta dg-quiz__send dg-sube"
              style={{ animationDelay: `${RITMO.primeraOpcion + 120}ms` }}
            >
              <div className="pearl-wrap">
                <p>
                  <span className="pearl-star" aria-hidden="true">
                    ✦
                  </span>
                  VER MI RADIOGRAFÍA
                  <span className="pearl-star" aria-hidden="true">
                    ✦
                  </span>
                </p>
              </div>
            </button>
          </form>
        ) : (
          <ul
            className="dg-quiz__options"
            role="group"
            aria-labelledby={idEnunciado}
          >
            {pregunta.opciones?.map((opcion, i) => {
              const activa = elegida === i;
              return (
                <li key={i}>
                  <button
                    type="button"
                    aria-pressed={activa}
                    className={`dg-quiz__option dg-sube${
                      activa ? " is-chosen" : ""
                    }`}
                    style={{
                      animationDelay: `${
                        RITMO.primeraOpcion + i * RITMO.entreOpciones
                      }ms`,
                    }}
                    onClick={() => elegir(i)}
                    disabled={elegida !== null}
                  >
                    <span className="dg-quiz__letter" aria-hidden="true">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="dg-quiz__text">{opcion}</span>
                    <span className="dg-quiz__check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 12.5l5.5 5.5L20 7"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* ── EL CONTADOR, AL FINAL ──

            Encima del enunciado competía con él: lo primero que se leía en
            cada pantalla era un número y no la pregunta. Al final es lo que
            tiene que ser, una referencia para saber cuánto queda, que se
            consulta después de leer. Entra el último, por lo mismo. */}
        <div
          className="dg-quiz__foot dg-sube"
          style={{ animationDelay: `${RITMO.pie}ms` }}
        >
          <span className="dg-quiz__step">
            Pregunta {indice + 1} de {PREGUNTAS.length}
          </span>
        </div>
      </div>
    </div>
  );
}
