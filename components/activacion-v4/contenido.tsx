import type { ReactNode } from "react";
import { CTA_LABEL } from "@/components/activacion-v4/config";

/**
 * Todo el texto editable de la landing v4 (y de sus variantes de prueba).
 *
 * Es .tsx porque los titulares llevan marcas en línea:
 *   <span className="av4-oro">…</span>  palabra de acento (color + cursiva)
 *   <strong>…</strong>                  negrita
 *   <br />                              salto de línea
 * Los campos `string` son texto plano; los `ReactNode` aceptan esas marcas.
 *
 * Fecha, horarios, precio y enlaces NO están acá: viven en config.ts y son
 * iguales para todas las variantes.
 *
 * Cómo se usa: cada página envuelve su <main> en <Av4ContenidoProvider> con un
 * Contenido. /activacion-v4 usa CONTENIDO_V4 (el default del contexto); cada
 * variante parte de CONTENIDO_V4 y pisa sólo lo que cambia (ver variantes/).
 */

const oro = (t: string) => <span className="av4-oro">{t}</span>;

/** Foto enmarcada opcional (mismas medidas reales que `hero.retrato`). */
export type FotoContenido = {
  src: string;
  /** Medidas reales del archivo, para que next/image reserve el espacio. */
  ancho: number;
  alto: number;
  /** object-position del encuadre dentro del marco (por defecto, el del CSS). */
  posicion?: string;
};

export type Contenido = {
  /**
   * Nombre de la landing en el logotipo (hero, entrada de precio, cierre y pie)
   * y en la diapositiva del MacBook. v4 lleva "Activación del Corazón…".
   */
  marca: {
    /** Nombre completo, para lectores de pantalla. */
    nombre: string;
    /** Primera línea del logotipo, en mayúsculas (p. ej. "OPERACIÓN"). */
    linea1: string;
    /** Segunda línea, en mayúsculas y color de acento (p. ej. "COHERENCIA"). */
    linea2: string;
    /** Línea en cursiva bajo la segunda (sólo v4: "y el Poder Interior"). */
    script?: string;
    /** Diapositiva del MacBook: [línea normal, línea en cursiva]. */
    macbook: [string, string];
  };

  /** Texto del botón principal (hero, ancla al precio). */
  ctaPrincipal: string;
  /** Texto del botón de compra de la sección de precio y del botón bajo las señales. */
  ctaCompra: string;

  hero: {
    /** Etiqueta sobre el titular. Sin ella: "{fecha} · {formato}". */
    etiqueta?: string;
    titular: ReactNode;
    bajada: ReactNode;
    /** Línea corta bajo la bajada: "Para mujeres que…". Opcional. */
    paraMujeres?: ReactNode;
    /**
     * Retrato enmarcado opcional. Sin él, el hero es el de v4 (foto a pantalla
     * completa que pone el CSS). Con él, el hero cambia de composición:
     *   "ovalo" → centrado, retrato ovalado con halo arriba del texto
     *   "arco"  → texto a la izquierda y retrato en arco a la derecha
     * Para cambiar la foto de una variante, se cambia `src` (y su tamaño real).
     */
    retrato?: {
      forma: "ovalo" | "arco";
      src: string;
      /** Medidas reales del archivo, para que next/image reserve el espacio. */
      ancho: number;
      alto: number;
      /** object-position del encuadre dentro del marco (por defecto, centrado). */
      posicion?: string;
    };
  };

  identificacion: {
    etiqueta: string;
    titular: ReactNode;
    texto: ReactNode;
    /** Cinco tarjetas: título (primera cláusula) + texto (el resto). */
    senales: { titulo: string; texto: string }[];
    /**
     * Alternativa a `senales`: cinco frases enteras, cada una en una tarjeta con
     * su número grande ("01", "02"…). Si está, manda sobre `senales`.
     */
    items?: string[];
    cierre: ReactNode;
  };

  /**
   * Sección "La experiencia" (sólo las landings por área; v4 no la tiene):
   * titular, introducción, "A través de…", cuatro resultados y el MacBook.
   */
  laExperiencia?: {
    etiqueta: string;
    titular: ReactNode;
    /** Primero activamos el corazón. Después… (cambia por área). */
    texto: string;
    /** "A través de la meditación y una activación energética guiada vas a:" */
    intro: string;
    items: string[];
  };

  /**
   * Sección del área (sólo las landings por área): es el ángulo de cada una.
   * Título, uno o dos párrafos, el "Cuando…:" con cuatro resultados y un aviso
   * pequeño opcional.
   */
  area?: {
    etiqueta: string;
    titular: ReactNode;
    parrafos: ReactNode[];
    /** "Cuando vuelves a la coherencia:" */
    intro: string;
    items: string[];
    aviso?: string;
    /**
     * Foto del área, opcional. Sin ella, la sección es sólo texto + panel.
     * Con ella, aparece enmarcada en arco con el panel superpuesto.
     */
    foto?: FotoContenido;
  };

  experiencia: {
    etiqueta: string;
    titular: ReactNode;
    texto: string;
    /** Exactamente dos (cada una lleva su icono en el componente). */
    preguntas: { pregunta: ReactNode; respuesta: string }[];
    tituloCambios: ReactNode;
    /** [área, qué cambia] */
    cambios: [string, string][];
  };

  contexto: {
    etiqueta: string;
    titular: ReactNode;
    parrafos: ReactNode[];
    /** Lista de líneas bajo los párrafos. Vacía = no se pinta. */
    lineas: string[];
    /** Párrafo final. Opcional. */
    cierre?: ReactNode;
    /** Foto del bloque. Sin ella, se usa /activacion-v4/contexto.jpg (v4). */
    foto?: FotoContenido;
  };

  precio: {
    /** Recibe el monto sin moneda ("19") para armar "por solo 19 euros". */
    titular: (monto: string) => ReactNode;
    /** Se reparten: 3 a la izquierda del ticket y el resto a la derecha. */
    incluye: string[];
    todoPor: string;
    sellos: { seguro: string; unico: string };
  };

  bio: {
    etiqueta: string;
    titular: ReactNode;
    parrafos: ReactNode[];
  };

  momento: {
    etiqueta: string;
    titular: ReactNode;
    parrafos: ReactNode[];
    tituloIntencion: ReactNode;
    intenciones: string[];
    cierre: ReactNode;
  };

  testimonios: {
    etiqueta: string;
    titular: ReactNode;
  };

  cierre: {
    /** Titular y subtítulo sobre la entrada. Opcionales (v4 no los lleva). */
    titular?: ReactNode;
    subtitulo?: string;
    /** Texto del botón de la entrada. Sin él, el CTA por defecto. */
    cta?: string;
    despedida: string;
    ctaSoporte: string;
  };
};

export const CONTENIDO_V4: Contenido = {
  marca: {
    nombre: "Activación del Corazón y el Poder Interior",
    linea1: "ACTIVACIÓN",
    linea2: "DEL CORAZÓN",
    script: "y el Poder Interior",
    macbook: ["Activación del Corazón", "y el Poder Interior"],
  },

  ctaPrincipal: CTA_LABEL,
  ctaCompra: "Activa tu poder",

  hero: {
    titular: (
      <>
        Deja de posponer {oro("la vida que de verdad quieres vivir")}.
      </>
    ),
    bajada: (
      <>
        Una experiencia guiada en directo para{" "}
        <strong>reconectar con la verdad de tu corazón</strong>, reconocer los
        miedos que te frenan y activar tu poder interior para empezar a crear
        una vida que ames todos los días.
      </>
    ),
  },

  identificacion: {
    etiqueta: "Para ti",
    titular: (
      <>
        Sientes que algo tiene que cambiar.
        <br />
        {oro("Y ya no quieres seguir ignorándolo.")}
      </>
    ),
    texto: (
      <>
        Por fuera sigues con tu vida. Pero por dentro reconoces que hay
        decisiones, relaciones o formas de vivir que ya no se corresponden con
        lo que <strong>de verdad quieres</strong>.
      </>
    ),
    senales: [
      {
        titulo: "Te cuesta reconocer qué quieres de verdad,",
        texto:
          "entre lo que esperan los demás y lo que te has acostumbrado a elegir.",
      },
      {
        titulo: "Sientes que necesitas un cambio,",
        texto: "pero el miedo a equivocarte te mantiene en el mismo lugar.",
      },
      {
        titulo: "Buscas respuestas y aprobación fuera,",
        texto:
          "aunque hay algo dentro de ti que lleva tiempo pidiendo ser escuchado.",
      },
      {
        titulo: "Has trabajado mucho en ti,",
        texto:
          "pero sigues aplazando decisiones, callando lo que necesitas o dejando tus deseos para después.",
      },
      {
        titulo: "Quieres vivir con propósito,",
        texto:
          "compartir tus dones y sentir que la vida que estás construyendo tiene sentido para ti.",
      },
    ],
    cierre: (
      <>
        Esta activación es un espacio para{" "}
        <strong>reconectar con la verdad de tu corazón</strong> y recuperar el
        poder interior para empezar a actuar en coherencia con ella.
      </>
    ),
  },

  experiencia: {
    etiqueta: "La experiencia",
    titular: (
      <>
        Tu mente sabe lo que debería hacer. Tu corazón sabe{" "}
        {oro("lo que quieres de verdad")}.
      </>
    ),
    texto:
      "El corazón no es solo un músculo. Tiene su propio sistema nervioso, con miles de neuronas, y envía constantemente información a tu cerebro. Por eso lo has sentido tantas veces: esa certeza en el pecho antes de que la mente encuentre las palabras.",
    preguntas: [
      {
        pregunta: <>¿Qué se guarda en {oro("tu corazón")}?</>,
        respuesta:
          "Lo que deseas de verdad, antes de que lo filtren el miedo y las expectativas de los demás. Las heridas que te hicieron cerrarte. Tu intuición. La sabiduría de tu alma.",
      },
      {
        pregunta: <>¿Qué pasa cuando vives {oro("desconectada")} de él?</>,
        respuesta:
          "Decides con la cabeza y te arrepientes con el cuerpo. Buscas aprobación fuera. Aguantas relaciones, trabajos y rutinas que ya no son tuyas.",
      },
    ],
    tituloCambios: <>¿Qué cambia cuando te activas {oro("desde el corazón")}?</>,
    cambios: [
      ["Decisiones", "dejas de dar vueltas y eliges sin necesitar permiso."],
      ["Relaciones", "pones límites sin culpa y atraes vínculos que te nutren."],
      ["Trabajo y propósito", "reconoces tus dones y te atreves a compartirlos."],
      ["Dinero y abundancia", "te abres a recibir sin sentir que no lo mereces."],
      ["Cuerpo y energía", "sueltas la tensión de vivir en contra de ti."],
    ],
  },

  contexto: {
    etiqueta: "Este momento",
    titular: (
      <>
        En medio de tanto cambio, volver a tu corazón{" "}
        {oro("cobra un nuevo sentido")}.
      </>
    ),
    parrafos: [
      "Vivimos un momento de mucho ruido, información y cambios. Hay opiniones sobre todo: cómo deberías vivir, qué deberías conseguir y quién deberías ser.",
      <strong key="voces">
        Y entre tantas voces, puedes terminar alejándote de la tuya.
      </strong>,
      "Desde mi forma de sentir este momento planetario, estamos siendo llamados a revisar las estructuras desde las que vivimos: lo que sostenemos por miedo, lo que elegimos por costumbre y lo que ya no se corresponde con quienes somos.",
      "Quizá también lo estás sintiendo.",
    ],
    lineas: [
      "Relaciones que necesitan una nueva forma.",
      "Prioridades que han cambiado.",
      "Deseos que vuelven con fuerza.",
      "Una necesidad cada vez más profunda de vivir con verdad.",
    ],
    cierre: (
      <>
        Volver al corazón es parte de esa transformación:{" "}
        <strong>recuperar una guía interior</strong> desde la que elegir con más
        consciencia lo que queremos crear, individualmente y como comunidad.
      </>
    ),
  },

  precio: {
    titular: (monto) => (
      <>
        ¿Qué recibirás por solo {oro(`${monto} euros`)}?
      </>
    ),
    incluye: [
      "Una experiencia guiada vía Zoom",
      "Prácticas para integrar la experiencia en tu día a día.",
      "Meditaciones para cultivar el amor, la alegría y la apertura a recibir.",
      "Mi práctica para trabajar las creencias que te limitan.",
      "Una canalización para el grupo en directo.",
    ],
    todoPor: "Todo por",
    sellos: { seguro: "Compra segura", unico: "Pago único" },
  },

  bio: {
    etiqueta: "Aida Qui",
    titular: <>¿Quién guiará {oro("esta experiencia")}?</>,
    parrafos: [
      <>
        Aida Qui es una de las referentes más reconocidas en{" "}
        <strong>transformación energética</strong> y espiritualidad práctica en
        habla hispana.
      </>,
      <>
        Es creadora de la <em>Academia ADN</em>, un movimiento y escuela de
        transformación diseñado para ayudar a las personas a elevar su
        consciencia, vivir desde una mayor coherencia y transformar todas las
        áreas de su vida.
      </>,
      <>
        Durante años ha acompañado a miles de personas en procesos de
        transformación profunda, ayudándolas a cambiar su realidad{" "}
        <strong>desde la raíz</strong>: su energía, su identidad y la forma en la
        que habitan su vida.
      </>,
      "Su trabajo une espiritualidad práctica, maestría energética, sistema emocional y transformación profunda para ayudar a las personas a dejar atrás viejas versiones de sí mismas y comenzar a vivir desde una frecuencia más auténtica, consciente y alineada.",
    ],
  },

  momento: {
    etiqueta: "Es momento",
    titular: (
      <>
        Es momento de darle a lo que sientes{" "}
        {oro("un lugar en la vida que estás creando")}.
      </>
    ),
    parrafos: [
      "Quizá llevas tiempo esperando a sentirte completamente preparada.",
      "A tener más seguridad. A que desaparezca el miedo. A que los demás entiendan lo que quieres hacer.",
      <>
        Puedes empezar hoy por <strong>escucharte con honestidad</strong> y
        reconocer qué decisión estás dejando en manos de esa espera.
      </>,
    ],
    tituloIntencion: <>Mi {oro("intención")} para este encuentro es:</>,
    /** Cuatro: cada una va con su foto (intencion-1..4.webp), en ese orden. */
    intenciones: [
      "Que puedas escucharte con más honestidad.",
      "Que reconozcas dónde estás eligiendo por miedo, por costumbre o por la necesidad de aprobación.",
      "Que vuelvas a dar valor a tus deseos y encuentres un paso concreto para empezar a honrarlos.",
      "Y que recuperes tu poder para sostener lo que sabes que es verdad para ti: tomar esa decisión, expresar lo que necesitas y dar forma a la vida que de verdad quieres vivir.",
    ],
    cierre: (
      <>
        Tu corazón tiene una voz.{" "}
        {oro("Es momento de darle espacio en tus decisiones.")}
      </>
    ),
  },

  testimonios: {
    etiqueta: "Testimonios",
    titular: (
      <>
        Lo que dicen quienes ya han <br className="av4-br-web" />
        trabajado con {oro("Aida")}
      </>
    ),
  },

  cierre: {
    despedida: "Te espero, alma bella.",
    ctaSoporte: "Contacta con soporte",
  },
};
