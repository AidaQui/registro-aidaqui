import { useEffect, useState } from "react";
import HelixCanvas from "@/components/diagnostico/HelixCanvas";

/**
 * Pantalla de escaneo entre la última pregunta y el resultado.
 *
 * El resultado ya está calculado cuando esta pantalla aparece: no se está
 * esperando al servidor. La espera es deliberada — un veredicto que aparece
 * de golpe se lee como un formulario enviado, y lo que se está entregando es
 * una lectura personal. Cuatro segundos bastan para que se sienta un proceso
 * sin llegar a impacientar.
 *
 * Las fases no son decorativas: nombran lo que se está leyendo, y eso es lo
 * que convierte la espera en parte del valor en vez de en tiempo muerto.
 */

type Props = {
  /** El patrón ya llegó del servidor */
  listo: boolean;
  onFin: () => void;
};

const FASES = [
  "Leyendo tus respuestas",
  "Cruzando patrones de comportamiento",
  "Identificando el patrón dominante",
  "Preparando tu radiografía",
];

/* Duración total repartida entre las cuatro fases. */
/* Cinco segundos y no cuatro: el escaneo es lo único que separa la última
   respuesta del veredicto, y a cuatro se percibía como una pausa técnica.
   Con cinco hay tiempo de leer las cuatro fases y el resultado llega como
   algo analizado, no como un formulario que respondió rápido.

   ⚠️ TAMBIÉN CUBRE LA ESPERA REAL DEL SERVIDOR: el envío arranca a la vez
   que esta animación, así que alargarla da más margen para que la respuesta
   llegue antes de que termine. */
const DURACION = 5000;
const POR_FASE = DURACION / FASES.length;

export default function Escaneando({ listo, onFin }: Props) {
  const [fase, setFase] = useState(0);
  const [cumplido, setCumplido] = useState(false);

  /* El temporizador corre una sola vez, al montar. Solo marca que el tiempo
     mínimo pasó: la salida la decide el efecto de abajo. */
  useEffect(() => {
    const reducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Con movimiento reducido no se retiene a nadie mirando una animación que
       no va a ver. */
    if (reducido) {
      const salto = setTimeout(() => setCumplido(true), 400);
      return () => clearTimeout(salto);
    }

    const avances = FASES.map((_, i) =>
      setTimeout(() => setFase(i), i * POR_FASE)
    );
    const cierre = setTimeout(() => setCumplido(true), DURACION);

    return () => {
      avances.forEach(clearTimeout);
      clearTimeout(cierre);
    };
  }, []);

  /* Se sale cuando se cumplen LAS DOS condiciones: el escaneo terminó y el
     patrón llegó. Manda la que tarde más.

     Si la red va rápida —lo normal— el escaneo es lo que marca el ritmo. Si
     va lenta, la hélice sigue girando hasta que haya resultado, y la espera
     se vive como parte del análisis en vez de como una pantalla colgada. */
  useEffect(() => {
    if (cumplido && listo) onFin();
  }, [cumplido, listo, onFin]);

  return (
    <div className="dg-scan" role="status" aria-live="polite">
      <p className="dg-scan__eyebrow">Analizando tu ADN</p>

      {/* ── LA HÉLICE NO SE ENCUADRA ──

          Antes el escenario recortaba con overflow+radio, y ese corte a los
          costados delataba una caja donde tendría que haber aire: la hélice
          se apoya en el fondo, no vive dentro de un marco.

          EL RECORTE SOLO LO NECESITA EL HAZ, que se desplaza fuera de su
          recorrido por arriba y por abajo. Por eso lleva pista propia: recorta
          lo que hay que recortar sin arrastrar a la hélice. */}
      <div className="dg-scan__stage">
        {/* Más alta que antes (300): sobre el fondo oscuro la hélice necesita
            cuerpo para leerse como una hélice y no como puntos sueltos. */}
        <HelixCanvas height={360} opacity={0.95} />

        {/* La línea que recorre la hélice de arriba abajo: es lo que dice
            "esto te está midiendo" sin escribirlo. */}
        <span className="dg-scan__track" aria-hidden="true">
          <span className="dg-scan__beam" />
        </span>
      </div>

      <p className="dg-scan__phase" key={fase}>
        {FASES[fase]}
      </p>

      <div className="dg-scan__dots" aria-hidden="true">
        {FASES.map((_, i) => (
          <span
            key={i}
            className={`dg-scan__dot${i <= fase ? " is-on" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
