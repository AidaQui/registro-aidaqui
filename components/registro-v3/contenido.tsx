import { Repeat2, Compass, Anchor, type LucideIcon } from "lucide-react";

// Datos del evento y textos que comparten la landing y la página de gracias.
// Si cambia la fecha o la hora, se cambia sólo aquí.

/**
 * Nombre de esta landing en la tabla `registros` y en el evento de GA4.
 * Al copiar la carpeta para una variante nueva, cambiarlo por la ruta nueva
 * (registro-v3, ...): es lo que separa los registros de cada una.
 */
export const VARIANTE = "registro-v3";

export const evento = {
  nombre: "Entrenamiento Espiritual Práctico",
  fecha: "17 de Octubre",
  formato: "Online por Zoom",
  // 18h en España es horario de verano (CEST, UTC+2): el cambio de hora
  // europeo es el 25/10, así que el 17/10 todavía rige. Argentina, Colombia
  // y México no cambian de hora (México eliminó el horario de verano en 2022:
  // CDMX es UTC-6 todo el año; sólo Quintana Roo va en UTC-5).
  horarios: [
    { hora: "18HS", pais: "España" },
    { hora: "13HS", pais: "Argentina" },
    { hora: "11HS", pais: "Colombia" },
    { hora: "10HS", pais: "México" },
  ],
  // Mismo instante en UTC, para la cuenta regresiva del announcement bar
  inicio: "2026-10-17T16:00:00Z",
};

/** Lo que se comprende en el entrenamiento (lista de ClassContentSection) */
export const aprendizajes: { icon: LucideIcon; text: React.ReactNode }[] = [
  {
    icon: Repeat2,
    text: (
      <>
        Qué te mantiene repitiendo los mismos patrones, aunque lleves años
        trabajando en ti, y cómo reconocer lo que necesitas cambiar.
      </>
    ),
  },
  {
    icon: Compass,
    text: (
      <>
        Cómo dejar de reaccionar en automático y empezar a tomar decisiones
        coherentes con la vida que quieres crear.
      </>
    ),
  },
  {
    icon: Anchor,
    text: (
      <>
        Cómo llevar tu trabajo espiritual a la práctica para sostener tus
        cambios cuando aparecen las dudas, el miedo o las situaciones de
        siempre.
      </>
    ),
  },
];
