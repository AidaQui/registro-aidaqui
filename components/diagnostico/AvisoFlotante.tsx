import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { scrollSuaveA } from "@/components/academia-lista-de-espera/SmoothScroll";

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * EL AVISO QUE SUBE DESDE ABAJO
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Sale al intentar reproducir el vídeo: dice que el recurso llega DESPUÉS del
 * diagnóstico y, pasados unos segundos, lleva al formulario y se va.
 *
 * ── POR QUÉ ESTO Y NO UN alert() NI UN MODAL ──
 *
 * Un modal bloquea la página y obliga a cerrarlo. Para decir una sola frase que
 * además termina en una acción automática, es una puerta de más: informa e
 * interrumpe, cuando aquí sólo hace falta lo primero. Con esto se puede seguir
 * leyendo mientras está puesto.
 *
 * El candado que aparece sobre la imagen dice que el vídeo está bloqueado; esto
 * dice qué hacer para desbloquearlo. Son dos cosas distintas y por eso no se
 * pisan: encima de la imagen va el estado, aquí la salida.
 *
 * ── SE DESMONTA DE VERDAD, PERO DESPUÉS DE SALIR ──
 *
 * Quitarlo del árbol en cuanto se cierra se lo lleva de golpe: no hay nada que
 * animar si el nodo ya no existe. De ahí los dos estados —primero `saliendo`,
 * luego desmontar—, encadenados por `animationend`, que garantiza que el
 * desmontaje ocurre cuando la animación termina DE VERDAD y no cuando un
 * temporizador cree que debería.
 *
 * ── LOS DOS TEMPORIZADORES VIVEN EN REFS ──
 *
 * Uno cuenta hasta el salto y otro es la red del `animationend`. Guardados en
 * refs se pueden cancelar al desmontar; en variables sueltas, un cierre rápido
 * dejaría un setState apuntando a un árbol que ya no existe.
 */

/* 3 s es lo que tarda en leerse la frase con calma. Menos y el desplazamiento
   sorprende a media lectura; más y deja de sentirse como consecuencia del clic.
   La barra de abajo cuenta exactamente este tiempo, así que el salto nunca
   llega sin avisar.

   ⚠️ Si el texto crece, hay que subir esta espera o el salto llegará a media
   frase. */
const ESPERA_ANTES_DEL_SALTO = 3000;

/* Red por si `animationend` no llega —pasa si la pestaña se va a segundo plano
   a mitad de la salida—. Por encima de la duración real (320 ms) para no
   cortarla nunca. */
const RESPALDO_SALIDA = 600;

type Props = {
  texto: string;
  /** id del elemento al que se baja al terminar la cuenta. Sin almohadilla: se
   *  resuelve con getElementById, no con un selector. */
  destino: string;
  alCerrar: () => void;
};

export default function AvisoFlotante({ texto, destino, alCerrar }: Props) {
  const [saliendo, setSaliendo] = useState(false);
  const temporizadorSalto = useRef<number | null>(null);
  const temporizadorRespaldo = useRef<number | null>(null);

  useEffect(() => {
    temporizadorSalto.current = window.setTimeout(() => {
      /* El aviso empieza a irse A LA VEZ que la página se desplaza: si esperara
         a terminar de bajar, se quedaría flotando sobre el formulario justo
         cuando hay que empezar a escribir en él.

         ⚠️ VA POR scrollSuaveA Y NO POR scrollIntoView. Esta pantalla monta
         Lenis, que lleva su propia posición de scroll y la reescribe en cada
         fotograma: un desplazamiento nativo lanzado por fuera se pelea con ella
         y se queda a medias o vuelve al sitio. La función le pide el movimiento
         a Lenis cuando está vivo y cae al nativo cuando no. */
      scrollSuaveA(destino);

      /* ── Y SE DEJA EL CURSOR PUESTO EN EL CAMPO ──

         "Te llevo al formulario" tiene que NOTARSE, y el desplazamiento solo no
         siempre basta: en una pantalla alta el formulario ya está a la vista
         cuando se pulsa el vídeo, así que el viaje es de unos pocos píxeles y
         no se lee como que haya pasado nada. Con el foco puesto, el campo se
         enciende y se puede escribir sin tocar nada más: eso sí se ve, mida lo
         que mida el salto.

         preventScroll es imprescindible: enfocar arrastra la página al campo
         por su cuenta, de un tirón y sin suavizar, y eso volvería a pelearse
         con el desplazamiento que se acaba de pedir. */
      document
        .getElementById(destino)
        ?.querySelector<HTMLInputElement>("input, textarea")
        ?.focus({ preventScroll: true });

      setSaliendo(true);
      temporizadorRespaldo.current = window.setTimeout(
        alCerrar,
        RESPALDO_SALIDA,
      );
    }, ESPERA_ANTES_DEL_SALTO);

    return () => {
      if (temporizadorSalto.current !== null) {
        window.clearTimeout(temporizadorSalto.current);
      }
      if (temporizadorRespaldo.current !== null) {
        window.clearTimeout(temporizadorRespaldo.current);
      }
    };
  }, [destino, alCerrar]);

  return (
    /* La banda ocupa el ancho de la ventana para poder centrar la tarjeta, y va
       sin eventos de puntero para no robarle los clics a lo que tenga debajo;
       la tarjeta se los devuelve para sí misma.

       role="status" y no "alert": un lector de pantalla lo anuncia cuando
       termina lo que esté diciendo, en vez de cortarse a media frase. Esto no
       es una emergencia. */
    <div className="dg-aviso" role="status" aria-live="polite">
      <div
        className="dg-aviso__caja"
        data-saliendo={saliendo}
        /* El desmontaje va atado al final de la animación de SALIDA. Se
           comprueba `saliendo` porque este mismo manejador salta también al
           terminar la de entrada. */
        onAnimationEnd={() => {
          if (saliendo) alCerrar();
        }}
      >
        <div className="dg-aviso__cuerpo">
          <span className="dg-aviso__icono" aria-hidden="true">
            <LockKeyhole size={17} strokeWidth={2} />
          </span>
          <p className="dg-aviso__texto">{texto}</p>
        </div>

        {/* LA BARRA DE CUENTA ATRÁS, a ras del canto inferior. Se vacía de
            izquierda a derecha en el mismo tiempo que espera el temporizador:
            el desplazamiento deja de ser una sorpresa y pasa a ser algo que se
            veía venir.

            La duración va en línea porque tiene que ser EXACTAMENTE la misma
            constante que usa el setTimeout; escrita también en el CSS, las dos
            se desincronizarían al primer retoque.

            Se detiene al salir: la barra ya no cuenta nada mientras el aviso se
            va, y seguir animándola llama la atención sobre la esquina que está
            desapareciendo. */}
        <div className="dg-aviso__pista" aria-hidden="true">
          <div
            className="dg-aviso__barra"
            style={
              {
                animationDuration: `${ESPERA_ANTES_DEL_SALTO}ms`,
                animationPlayState: saliendo ? "paused" : "running",
              } as CSSProperties
            }
          />
        </div>
      </div>
    </div>
  );
}
