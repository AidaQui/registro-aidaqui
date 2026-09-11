/**
 * Radiografía de tu ADN — preguntas, patrones y cálculo del resultado.
 *
 * El mapeo es por posición y es el mismo en las cuatro preguntas:
 * A→control, B→hiperexigencia, C→escasez, D→validacion,
 * E→supervivencia, F→desconexion, G→autosabotaje.
 *
 * Los identificadores van en minúscula y sin tildes a propósito: son los
 * valores que viajan a MailerLite y contra los que compara la automatización
 * que elige el vídeo. Si alguno llevara tilde, esa rama no coincidiría nunca.
 */

export const PATRONES = [
  "control",
  "hiperexigencia",
  "escasez",
  "validacion",
  "supervivencia",
  "desconexion",
  "autosabotaje",
] as const;

export type Patron = (typeof PATRONES)[number];

/** El orden de las opciones dentro de cada pregunta define a qué patrón suman. */
const ORDEN_PATRONES: Patron[] = [
  "control",
  "hiperexigencia",
  "escasez",
  "validacion",
  "supervivencia",
  "desconexion",
  "autosabotaje",
];

export type Pregunta = {
  id: string;
  enunciado: string;
  /** En el mismo orden que ORDEN_PATRONES */
  opciones: string[];
};

export const PREGUNTAS: Pregunta[] = [
  {
    id: "p1",
    enunciado:
      "Cuando algo importante no sale como esperabas, ¿qué suele ocurrir primero dentro de ti?",
    opciones: [
      "Empiezo a pensar qué puedo hacer para solucionarlo.",
      "Me pregunto qué hice mal o si fui suficiente.",
      "Me preocupa perder lo que había conseguido.",
      "Busco la opinión de alguien para saber qué hacer.",
      "Mi cuerpo se activa y reacciono antes de poder pensarlo.",
      "Intento encontrar qué enseñanza o respuesta me falta.",
      "Pierdo impulso y termino volviendo a comportamientos anteriores.",
    ],
  },
  {
    id: "p2",
    enunciado:
      "Cuando algo que deseas profundamente no se manifiesta como esperabas, ¿qué interpretación aparece primero?",
    opciones: [
      "Quizá estoy intentando forzar algo que debería aprender a soltar.",
      "Siento que todavía hay algo en mí que necesito trabajar para estar preparada.",
      "Me cuesta confiar en que habrá otra oportunidad o que algo mejor llegará.",
      "Me pregunto si estoy tomando la decisión correcta y busco referencias fuera.",
      "Aunque intento confiar, internamente siento amenaza o inseguridad.",
      "Intento encontrar qué enseñanza, señal o mensaje no estoy viendo.",
      "Empiezo a dudar de mí y vuelvo a formas conocidas de actuar.",
    ],
  },
  {
    id: "p3",
    enunciado:
      "¿En cuál de estas situaciones sientes que pierdes más fácilmente tu centro?",
    opciones: [
      "Cuando las cosas escapan de mis manos.",
      "Cuando siento que podría haber hecho algo mejor.",
      "Cuando mi estabilidad económica o material se tambalea.",
      "Cuando alguien importante para mí desaprueba mis decisiones.",
      "Cuando algo despierta una emoción muy intensa en mí.",
      "Cuando no sé qué camino elegir.",
      "Cuando estoy entrando en una etapa completamente nueva.",
    ],
  },
  {
    id: "p4",
    /* Las opciones venían en otro orden en el documento original; se
       reordenaron para respetar el mapeo por posición de las demás. */
    enunciado:
      "¿Cuál de estas contradicciones reconoces más profundamente en tu proceso?",
    opciones: [
      "He aprendido a confiar, pero sigo intentando asegurar el resultado.",
      "He aprendido a amarme, pero sigo relacionándome conmigo desde la exigencia.",
      "He trabajado la abundancia, pero todavía hay decisiones que tomo desde la carencia.",
      "Conozco mi valor, pero todavía hay partes de mí que necesitan verlo reflejado fuera.",
      "Comprendo mis heridas, pero mi cuerpo todavía reacciona desde ellas.",
      "He encontrado muchas respuestas, pero sigo dudando de mi propia verdad.",
      "Sé quién quiero ser, pero sigo volviendo a mi antigua versión.",
    ],
  },
];

/** Índice de opción (0-6) → patrón al que suma. */
export function patronDeOpcion(indice: number): Patron | null {
  return ORDEN_PATRONES[indice] ?? null;
}

export type Respuestas = Record<string, number>;

export type Diagnostico = {
  dominante: Patron;
  puntajes: Record<Patron, number>;
  huboEmpate: boolean;
};

/**
 * Calcula el patrón dominante a partir de las respuestas.
 *
 * Con cuatro preguntas y siete patrones el empate es lo habitual (2-1-1, o
 * incluso 1-1-1-1), así que el desempate no es un caso raro: es parte del
 * funcionamiento normal. Lo resuelve la última pregunta, la de las
 * contradicciones, por ser la más introspectiva de las cuatro.
 *
 * Si esa pregunta no está entre las empatadas —o no se respondió— se recurre
 * al orden de PATRONES, que deja el resultado estable ante los mismos datos.
 */
export function calcularDiagnostico(respuestas: Respuestas): Diagnostico {
  const puntajes = Object.fromEntries(
    PATRONES.map((patron) => [patron, 0])
  ) as Record<Patron, number>;

  for (const pregunta of PREGUNTAS) {
    const indice = respuestas[pregunta.id];
    if (typeof indice !== "number") continue;
    const patron = patronDeOpcion(indice);
    if (patron) puntajes[patron] += 1;
  }

  const maximo = Math.max(...PATRONES.map((patron) => puntajes[patron]));
  const empatados = PATRONES.filter((patron) => puntajes[patron] === maximo);

  if (empatados.length === 1) {
    return { dominante: empatados[0], puntajes, huboEmpate: false };
  }

  const patronDesempate = patronDeOpcion(respuestas.p4 ?? -1);
  const dominante =
    patronDesempate && empatados.includes(patronDesempate)
      ? patronDesempate
      : empatados[0];

  return { dominante, puntajes, huboEmpate: true };
}
