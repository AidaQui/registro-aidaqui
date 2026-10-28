import { datosItems } from "@/components/activacion-v4/Av4Datos";

/**
 * Barra de anuncio fija arriba (sólo landings por área): los mismos datos que la
 * cinta del hero, en una pasada continua. La pista lleva el grupo dos veces y
 * se desplaza -50%, así el bucle no tiene corte. La copia va aria-hidden; el
 * primer grupo es lo único que lee un lector de pantalla. Con
 * prefers-reduced-motion queda quieta y sin copia.
 */
const REPETICIONES = 3;

export default function Av4Barra() {
  const items = datosItems();

  const grupo = (copia: boolean) => (
    <ul
      className="av4-barra__grupo"
      aria-hidden={copia || undefined}
      aria-label={copia ? undefined : "Datos de la experiencia"}
    >
      {Array.from({ length: REPETICIONES }).flatMap((_, r) =>
        items.map(({ Icono, t, s }) => (
          <li key={`${r}-${s}`} aria-hidden={r > 0 || undefined}>
            <Icono size={14} strokeWidth={2} aria-hidden="true" />
            <strong>{t}</strong>
            <small>{s}</small>
            <i aria-hidden="true" />
          </li>
        )),
      )}
    </ul>
  );

  return (
    <div className="av4-barra">
      <div className="av4-barra__pista">
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  );
}
