import { CalendarDays, Clock, Ticket, Video } from "lucide-react";
import { EVENTO, HORARIOS, PRECIO } from "@/components/activacion-v4/config";

/**
 * Datos reales (fecha, hora, formato, precio) en una sola píldora pequeña que
 * los va rotando: aparecen y desaparecen de a uno, en vez de ocupar cuatro
 * tarjetas en el hero. Los cuatro están siempre en el DOM, así que un lector
 * de pantalla los lee todos; con prefers-reduced-motion se muestran en fila.
 */
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
          <Icono size={15} strokeWidth={2} aria-hidden="true" />
          <strong>{t}</strong>
          <small>{s}</small>
        </li>
      ))}
    </ul>
  );
}
