import { CalendarDays, Clock, Ticket, Video } from "lucide-react";
import { EVENTO, HORARIOS, PRECIO } from "@/components/activacion-v4/config";

/**
 * Datos reales (fecha, hora, formato, precio) en una cinta que se desliza sin
 * parar y se desvanece en los bordes. Va dentro de .av4-hero__accion, así que
 * mide lo mismo que el botón.
 *
 * La lista se renderiza dos veces para que el bucle no tenga corte: la
 * animación mueve la pista -50% y al reiniciar el contenido es idéntico. La
 * copia va con aria-hidden para que un lector de pantalla lea los datos una
 * sola vez. Con prefers-reduced-motion la cinta queda quieta y sin copia.
 */
/** Los datos de la cinta; también los usa la barra de anuncio de las landings por área. */
export function datosItems() {
  const p = HORARIOS[0];
  return [
    { Icono: CalendarDays, t: EVENTO.fechaCorta, s: "Fecha" },
    { Icono: Clock, t: p.hora, s: `Hora de ${p.pais}` },
    { Icono: Video, t: EVENTO.formato, s: "Formato" },
    { Icono: Ticket, t: PRECIO.actual.replace("€", " €"), s: PRECIO.nota },
  ];
}

export default function Av4Datos() {
  const items = datosItems();

  const lista = (copia: boolean) => (
    <ul
      className={`av4-datos__lista${copia ? " av4-datos__lista--copia" : ""}`}
      aria-label={copia ? undefined : "Datos de la experiencia"}
      aria-hidden={copia || undefined}
    >
      {items.map(({ Icono, t, s }) => (
        <li key={s}>
          <Icono size={15} strokeWidth={2} aria-hidden="true" />
          <strong>{t}</strong>
          <small>{s}</small>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="av4-datos">
      <div className="av4-datos__pista">
        {lista(false)}
        {lista(true)}
      </div>
    </div>
  );
}
