import { useState } from "react";
import { PREGUNTAS } from "@/components/diagnostico/preguntas";
import type { Patron } from "@/components/diagnostico/preguntas";

type Props = {
  nombre: string;
  email: string;
  telefono: string;
  onResultado: (patron: Patron) => void;
};

/**
 * Las cuatro preguntas, una por pantalla.
 *
 * Una sola pregunta a la vez y no un formulario largo: el cuestionario
 * promete "menos de 2 minutos", y ver las cuatro juntas con siete opciones
 * cada una lo desmiente antes de empezar.
 *
 * Al elegir una opción avanza solo, sin botón de continuar. La última envía.
 */
export default function Cuestionario({
  nombre,
  email,
  telefono,
  onResultado,
}: Props) {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const pregunta = PREGUNTAS[indice];
  const esUltima = indice === PREGUNTAS.length - 1;
  const progreso = Math.round((indice / PREGUNTAS.length) * 100);

  async function enviar(finales: Record<string, number>) {
    setEnviando(true);
    setError("");

    try {
      const resp = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nombre,
          email,
          phone: telefono,
          answers: finales,
        }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error("fallo");

      onResultado(data.patron as Patron);
    } catch {
      setError("Ha habido un problema. Por favor, inténtalo de nuevo.");
      setEnviando(false);
    }
  }

  function elegir(opcion: number) {
    if (enviando) return;

    const actualizadas = { ...respuestas, [pregunta.id]: opcion };
    setRespuestas(actualizadas);

    if (esUltima) {
      enviar(actualizadas);
    } else {
      setIndice((previo) => previo + 1);
    }
  }

  return (
    <div className="dg-quiz">
      <div className="dg-quiz__head">
        <span className="dg-quiz__step">
          Pregunta {indice + 1} de {PREGUNTAS.length}
        </span>
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

      {/* La clave por pregunta reinicia la animación de entrada en cada paso */}
      <div className="dg-quiz__body" key={pregunta.id}>
        <h2 className="dg-quiz__question">{pregunta.enunciado}</h2>

        <ul className="dg-quiz__options">
          {pregunta.opciones.map((opcion, i) => (
            <li key={i}>
              <button
                type="button"
                className="dg-quiz__option"
                onClick={() => elegir(i)}
                disabled={enviando}
              >
                <span className="dg-quiz__letter" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                {opcion}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {indice > 0 && !enviando && (
        <button
          type="button"
          className="dg-quiz__back"
          onClick={() => setIndice((previo) => previo - 1)}
        >
          ← Volver a la anterior
        </button>
      )}

      {enviando && (
        <p className="dg-quiz__loading" role="status">
          Calculando tu radiografía…
        </p>
      )}

      {error && (
        <p className="dg-quiz__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
