import { useEffect, useState } from "react";
import { CalendarDays, Clock, Radio, Sparkles, type LucideIcon } from "lucide-react";
import { evento } from "@/components/registro-v2/contenido";

type Restante = { d: number; h: number; m: number; s: number };

const INICIO_MS = Date.parse(evento.inicio);

function calcularRestante(ahora: number): Restante | null {
  const diff = INICIO_MS - ahora;
  if (diff <= 0) return null;
  const total = Math.floor(diff / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

const dosCifras = (n: number) => String(n).padStart(2, "0");

const espana = evento.horarios.find((h) => h.pais === "España");

/** Lo que dice la barra, cada cosa con su ícono */
const datos: { icon: LucideIcon; texto: string }[] = [
  { icon: Radio, texto: "3 horas en vivo" },
  { icon: Sparkles, texto: evento.nombre },
  { icon: CalendarDays, texto: evento.fecha },
  ...(espana ? [{ icon: Clock, texto: `${espana.hora} ${espana.pais}` }] : []),
];

/** Una tanda de datos, separados sólo por espacio (los íconos ya marcan
 *  dónde empieza cada uno) */
function Datos({ copia = false }: { copia?: boolean }) {
  return (
    <ul
      className={`rv2-announce__items${copia ? " rv2-announce__items--copia" : ""}`}
      aria-hidden={copia || undefined}
    >
      {datos.map(({ icon: Icon, texto }) => (
        <li className="rv2-announce__item" key={texto}>
          <Icon className="rv2-announce__icon" size={14} strokeWidth={2.2} aria-hidden="true" />
          <span>{texto}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Barra fija arriba de toda la página: qué es, cuándo y cuánto falta.
 * En escritorio los datos van en una fila; en mobile no entran y pasan en
 * un carrusel infinito (la tanda va dos veces y se corre media pista).
 * La cuenta se calcula recién en el cliente; en el render del servidor van
 * guiones para que la hidratación no choque con la hora del navegador.
 */
export default function AnnouncementBar() {
  const [restante, setRestante] = useState<Restante | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setRestante(calcularRestante(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const unidades: { valor: number | undefined; label: string }[] = [
    { valor: restante?.d, label: "días" },
    { valor: restante?.h, label: "hs" },
    { valor: restante?.m, label: "min" },
    { valor: restante?.s, label: "seg" },
  ];

  return (
    <div className="rv2-announce" role="region" aria-label="Próximo entrenamiento">
      <div className="rv2-announce__ticker">
        <div className="rv2-announce__track">
          <Datos />
          <Datos copia />
        </div>
      </div>

      {restante === null ? (
        <p className="rv2-announce__live">¡Estamos en vivo!</p>
      ) : (
        <div className="rv2-announce__countdown" aria-label="Cuenta regresiva" role="timer">
          {unidades.map(({ valor, label }) => (
            <span className="rv2-announce__unit" key={label}>
              <span className="rv2-announce__num">
                {valor === undefined ? "--" : dosCifras(valor)}
              </span>
              <span className="rv2-announce__label">{label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
