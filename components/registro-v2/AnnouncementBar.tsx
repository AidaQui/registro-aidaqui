import { useEffect, useState } from "react";
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

/**
 * Barra fija arriba de toda la página: qué es, cuándo y cuánto falta.
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

  const espana = evento.horarios.find((h) => h.pais === "España");

  const unidades: { valor: number | undefined; label: string }[] = [
    { valor: restante?.d, label: "días" },
    { valor: restante?.h, label: "hs" },
    { valor: restante?.m, label: "min" },
    { valor: restante?.s, label: "seg" },
  ];

  return (
    <div className="ent-announce" role="region" aria-label="Próximo entrenamiento">
      <p className="ent-announce__text">
        <span>3 horas en vivo</span>
        {/* En mobile el nombre se oculta: la barra es fija y con él ocupaba
            tres renglones */}
        <span className="ent-announce__name">
          <span className="ent-announce__sep" aria-hidden="true">✦</span>
          <span>{evento.nombre}</span>
        </span>
        <span className="ent-announce__sep" aria-hidden="true">✦</span>
        <span>{evento.fecha}</span>
        {espana && (
          <>
            <span className="ent-announce__sep" aria-hidden="true">✦</span>
            <span>
              {espana.hora} {espana.pais}
            </span>
          </>
        )}
      </p>

      {restante === null ? (
        <p className="ent-announce__live">¡Estamos en vivo!</p>
      ) : (
        <div className="ent-announce__countdown" aria-label="Cuenta regresiva" role="timer">
          {unidades.map(({ valor, label }) => (
            <span className="ent-announce__unit" key={label}>
              <span className="ent-announce__num">
                {valor === undefined ? "--" : dosCifras(valor)}
              </span>
              <span className="ent-announce__label">{label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
