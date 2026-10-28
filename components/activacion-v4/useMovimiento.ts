import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: reduce)";

function suscribir(aviso: () => void) {
  const mq = window.matchMedia(CONSULTA);
  mq.addEventListener("change", aviso);
  return () => mq.removeEventListener("change", aviso);
}

/**
 * `true` sólo en el navegador y si la persona no pidió reducir el movimiento.
 * En el servidor (y en el primer render) es `false`: ahí las animaciones se
 * muestran en su estado final, que es también el de movimiento reducido.
 */
export function useMovimiento(): boolean {
  return useSyncExternalStore(
    suscribir,
    () => !window.matchMedia(CONSULTA).matches,
    () => false,
  );
}
