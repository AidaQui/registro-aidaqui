/**
 * Radiografía de tu ADN — preguntas, códigos y cálculo del resultado.
 *
 * El mapeo es por posición y es el mismo en las seis preguntas cerradas:
 * A→control, B→hiperexigencia, C→escasez, D→validacion,
 * E→supervivencia, F→desconexion, G→autosabotaje.
 *
 * ⚠️ LOS IDENTIFICADORES NO CAMBIAN AUNQUE SÍ LOS NOMBRES VISIBLES.
 * Son la clave de todo: los usa el cálculo, son las claves de FICHAS y son
 * lo que se guarda en Supabase. Renombrarlos dejaría ilegibles los registros
 * ya guardados.
 *
 * Este patrón tiene TRES vocabularios, y conviene no mezclarlos:
 *   · el identificador   — aquí abajo; cálculo, FICHAS y Supabase
 *   · el nombre visible  — "Código de Control"; en resultados.ts
 *   · la etiqueta de MailerLite — "Seguridad"; en ETIQUETA_MAILERLITE
 */

export const CODIGOS = [
  "control",
  "hiperexigencia",
  "escasez",
  "validacion",
  "supervivencia",
  "desconexion",
  "autosabotaje",
] as const;

export type Codigo = (typeof CODIGOS)[number];

/** Compatibilidad con el nombre anterior del tipo. */
export type Patron = Codigo;

/**
 * Lo que se manda a MailerLite en el campo `patron_dominante`.
 *
 * NO son los identificadores de arriba, y es deliberado. La automatización
 * del cliente ya estaba montada con estos siete nombres —uno por correo— y
 * sus condiciones comparan carácter por carácter. Traducir aquí, en el borde
 * con MailerLite, cuesta una línea; renombrar los códigos por todo el
 * proyecto obligaría a migrar las filas que Supabase ya tiene guardadas.
 *
 * El orden es el mismo en las dos listas porque salen del mismo material.
 *
 * ⚠️ TIENEN QUE COINCIDIR EXACTAMENTE CON EL VALOR DE CADA CONDICIÓN:
 * mayúscula inicial incluida, y la tilde de «Protección» incluida. Si en
 * MailerLite se renombra uno, hay que cambiarlo aquí el mismo día o esa rama
 * deja de coincidir — sin error, sin aviso, y esas personas se quedan sin
 * vídeo.
 */
export const ETIQUETA_MAILERLITE: Record<Codigo, string> = {
  control: "Seguridad",
  hiperexigencia: "Merecimiento",
  escasez: "Suficiencia",
  validacion: "Pertenencia",
  supervivencia: "Protección",
  desconexion: "Autoridad",
  autosabotaje: "Identidad",
};

/** El orden de las opciones dentro de cada pregunta define a qué código suman. */
const ORDEN: Codigo[] = [
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
  /** Ausente en la pregunta abierta */
  opciones?: string[];
  /** La séptima es de texto libre: no puntúa */
  abierta?: boolean;
  ayuda?: string;
  /**
   * Ilustración de la situación, en /public/diagnostico/img/img-preguntas.
   *
   * La ruta va escrita en cada pregunta y NO se deduce del índice.
   * Deducirla (imagen = indice + 1) parece más corto y es una trampa: el
   * día que se reordenen o se intercale una pregunta, cada situación
   * quedaría ilustrada con la escena de otra sin que nada falle ni avise.
   */
  imagen?: string;
};

export const PREGUNTAS: Pregunta[] = [
  {
    id: "p1",
    imagen: "/diagnostico/img/img-preguntas/1.png",
    enunciado:
      "Cuando algo importante no sale como esperabas, ¿qué suele ocurrir primero dentro de ti?",
    opciones: [
      "Empiezo a pensar qué puedo hacer para solucionarlo.",
      "Me pregunto qué hice mal o si podría haber hecho algo mejor.",
      "Me preocupa perder lo que había conseguido.",
      "Necesito hablarlo con alguien para saber qué hacer.",
      "Mi cuerpo se activa y reacciono antes de poder procesarlo.",
      "Intento encontrar qué enseñanza o respuesta me falta.",
      "Pierdo impulso y termino volviendo a comportamientos anteriores.",
    ],
  },
  {
    id: "p2",
    imagen: "/diagnostico/img/img-preguntas/2.png",
    enunciado:
      "Cuando algo que deseas profundamente no se manifiesta como esperabas, ¿qué interpretación aparece primero?",
    opciones: [
      "Quizá estoy intentando forzar algo que debería aprender a soltar.",
      "Siento que todavía hay algo en mí que necesito trabajar para estar preparada.",
      "Me cuesta confiar en que habrá otra oportunidad o que algo mejor llegará.",
      "Empiezo a cuestionar mi decisión y busco referencias fuera.",
      "Aunque intento confiar, internamente siento amenaza o inseguridad.",
      "Intento encontrar qué enseñanza, señal o mensaje no estoy viendo.",
      "Empiezo a dudar de mí y vuelvo a formas conocidas de actuar.",
    ],
  },
  {
    id: "p3",
    imagen: "/diagnostico/img/img-preguntas/3.png",
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
    imagen: "/diagnostico/img/img-preguntas/4.png",
    enunciado:
      "¿Cuál de estas contradicciones reconoces más profundamente en tu proceso?",
    opciones: [
      "He aprendido a confiar, pero sigo intentando asegurar el resultado.",
      "He aprendido a amarme, pero sigo relacionándome conmigo desde la exigencia.",
      "He trabajado la abundancia, pero todavía hay decisiones que tomo desde la carencia.",
      "Sé lo que valgo, pero todavía me afecta que otros no lo vean.",
      "Comprendo mis heridas, pero mi cuerpo todavía reacciona desde ellas.",
      "He encontrado muchas respuestas, pero sigo dudando de mi propia verdad.",
      "Sé quién quiero ser, pero sigo volviendo a mi antigua versión.",
    ],
  },
  {
    id: "p5",
    imagen: "/diagnostico/img/img-preguntas/5.png",
    /* En el documento original las opciones venían desordenadas; se
       reordenaron para respetar el mapeo por posición de las demás. */
    enunciado:
      "Cuando alguien importante para ti no responde como esperabas, ¿qué es lo que más te cuesta sostener?",
    opciones: [
      "Aceptar que no puedo controlar lo que la otra persona haga.",
      "No preguntarme qué hice mal o qué debería haber hecho diferente.",
      "Confiar en que puedo estar bien aunque ese vínculo cambie o termine.",
      "Mantenerme firme en lo que siento aunque la otra persona no lo comprenda.",
      "No reaccionar desde experiencias o heridas anteriores.",
      "Escuchar lo que realmente siento sin necesitar analizarlo o entenderlo todo.",
      "No volver a dinámicas que sé que ya no quiero repetir.",
    ],
  },
  {
    id: "p6",
    imagen: "/diagnostico/img/img-preguntas/6.png",
    enunciado:
      "Si mañana tu realidad cambiara por completo y recibieras eso que llevas tanto tiempo deseando, ¿qué crees que te costaría más sostener?",
    opciones: [
      "Disfrutarlo sin intentar controlar que permanezca.",
      "Sentir que realmente estoy preparada y soy suficiente para esa realidad.",
      "Confiar en que puedo tenerlo sin miedo a perderlo.",
      "Vivirlo sin necesitar demostrar nada ni recibir reconocimiento externo.",
      "Sentirme segura en una realidad completamente nueva para mí.",
      "Confiar en mí para transitarla sin buscar constantemente respuestas fuera.",
      "Sostener la versión de mí capaz de vivir esa realidad sin regresar a lo conocido.",
    ],
  },
  {
    id: "p7",
    imagen: "/diagnostico/img/img-preguntas/7.png",
    enunciado:
      "Si nadie pudiera decepcionarse, juzgarte o cuestionar tus decisiones, ¿qué sentirías que tienes permiso de hacer diferente?",
    ayuda: "No hay una respuesta correcta. Solo observa lo que aparece.",
    abierta: true,
  },
];

/** Las que puntúan: la séptima es abierta y queda fuera del cálculo. */
export const PREGUNTAS_CERRADAS = PREGUNTAS.filter((p) => !p.abierta);

/** Índice de opción (0-6) → código al que suma. */
export function codigoDeOpcion(indice: number): Codigo | null {
  return ORDEN[indice] ?? null;
}

export type Respuestas = Record<string, number>;

export type Diagnostico = {
  dominante: Codigo;
  puntajes: Record<Codigo, number>;
  huboEmpate: boolean;
};

/**
 * Calcula el código dominante a partir de las respuestas cerradas.
 *
 * Con seis preguntas y siete códigos el empate sigue siendo frecuente, así
 * que el desempate es parte del funcionamiento normal. El orden lo fija el
 * documento del diagnóstico:
 *
 *   1. La pregunta 6 —la que proyecta a futuro— manda.
 *   2. Si no resuelve, la pregunta 5.
 *   3. Si sigue empatado, la respuesta más reciente entre las empatadas.
 *
 * El tercer criterio garantiza que siempre haya un ganador: recorre las
 * preguntas de atrás hacia adelante y devuelve el primer código empatado que
 * encuentra.
 */
export function calcularDiagnostico(respuestas: Respuestas): Diagnostico {
  const puntajes = Object.fromEntries(
    CODIGOS.map((codigo) => [codigo, 0])
  ) as Record<Codigo, number>;

  for (const pregunta of PREGUNTAS_CERRADAS) {
    const indice = respuestas[pregunta.id];
    if (typeof indice !== "number") continue;
    const codigo = codigoDeOpcion(indice);
    if (codigo) puntajes[codigo] += 1;
  }

  const maximo = Math.max(...CODIGOS.map((codigo) => puntajes[codigo]));
  const empatados = CODIGOS.filter((codigo) => puntajes[codigo] === maximo);

  if (empatados.length === 1) {
    return { dominante: empatados[0], puntajes, huboEmpate: false };
  }

  for (const clave of ["p6", "p5"]) {
    const candidato = codigoDeOpcion(respuestas[clave] ?? -1);
    if (candidato && empatados.includes(candidato)) {
      return { dominante: candidato, puntajes, huboEmpate: true };
    }
  }

  /* Última red: la respuesta más reciente que esté entre las empatadas. */
  for (let i = PREGUNTAS_CERRADAS.length - 1; i >= 0; i--) {
    const candidato = codigoDeOpcion(
      respuestas[PREGUNTAS_CERRADAS[i].id] ?? -1
    );
    if (candidato && empatados.includes(candidato)) {
      return { dominante: candidato, puntajes, huboEmpate: true };
    }
  }

  return { dominante: empatados[0], puntajes, huboEmpate: true };
}
