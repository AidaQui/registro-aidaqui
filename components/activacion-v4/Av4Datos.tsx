import { CalendarDays, Clock, Ticket, Video } from "lucide-react";
import { EVENTO, HORARIOS, PRECIO } from "@/components/activacion-v4/config";

/** Fila de datos reales (fecha, hora, formato, precio). Sin cifras inventadas. */
export default function Av4Datos() {
  const p = HORARIOS[0];
  const items = [
    { Icono: CalendarDays, t: EVENTO.fechaCorta, s: "Fecha" },
    { Icono: Clock, t: p.hora, s: `Hora de ${p.pais}` },
    { Icono: Video, t: EVENTO.formato, s: "Formato" },
    { Icono: Ticket, t: PRECIO.actual.replace("€", " €"), s: PRECIO.nota },
  ];
  return (
    <ul className="av4-datos" aria-label="Datos de la experiencia">
      {items.map(({ Icono, t, s }) => (
        <li key={s}>
          <span className="av4-datos__icono">
            <Icono size={22} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <strong>{t}</strong>
          <small>{s}</small>
        </li>
      ))}
    </ul>
  );
}
