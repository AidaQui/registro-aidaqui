import { Repeat2, Compass, Anchor, type LucideIcon } from "lucide-react";

// Datos del evento y textos que comparten la landing y la página de gracias.
// Si cambia la fecha o la hora, se cambia sólo aquí.

export const evento = {
  nombre: "Entrenamiento Espiritual Práctico",
  fecha: "17 de Octubre",
  formato: "Online por Zoom",
  // 19h en España es horario de verano (CEST, UTC+2): el cambio de hora
  // europeo es el 25/10, así que el 17/10 todavía rige. Argentina y Colombia
  // no cambian de hora.
  horarios: [
    { hora: "19HS", pais: "España" },
    { hora: "14HS", pais: "Argentina" },
    { hora: "12HS", pais: "Colombia" },
  ],
  bajada:
    "Una preparación para atravesar el portal 19/10 con más consciencia, claridad y dirección.",
  remate: "Deja el bypass espiritual y conviértete en tu propio caso de éxito.",
};

/** Lo que se comprende en el entrenamiento (cards de la landing y de gracias) */
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
        Cómo llevar tu consciencia a la práctica y sostener tus cambios cuando
        aparecen las dudas, el miedo o las situaciones de siempre.
      </>
    ),
  },
];
