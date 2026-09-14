import type { Codigo } from "@/components/diagnostico/preguntas";

/**
 * Contenido de los siete códigos.
 *
 * Los NOMBRES VISIBLES usan la nomenclatura de "código"; los identificadores
 * técnicos (control, hiperexigencia…) siguen siendo los mismos en
 * preguntas.ts, porque son los que lee la automatización de MailerLite.
 *
 * En pantalla se muestra la ficha corta. El desarrollo completo —cómo se
 * expresa, el código raíz y lo que hay que integrar— llega por correo en el
 * vídeo correspondiente, así que aquí no se duplica.
 */

export type FichaCodigo = {
  titulo: string;
  frase: string;
  descripcion: string;
  detras: string;
  integrar: string;
};

export const FICHAS: Record<Codigo, FichaCodigo> = {
  control: {
    titulo: "Código de Control",
    frase: "Si no lo controlo, algo puede salir mal.",
    descripcion:
      "Has hecho mucho trabajo interno, pero una parte de ti sigue necesitando anticipar, entender y controlar lo que ocurre para sentirse segura. Puede manifestarse como sobrepensar, dificultad para soltar, querer saber cómo va a suceder todo, exigencia o frustración cuando la realidad no responde como esperabas.",
    detras: "Necesidad de seguridad.",
    integrar:
      "Confianza, rendición y capacidad de permanecer en lo desconocido sin volver automáticamente al control.",
  },
  hiperexigencia: {
    titulo: "Código de Exigencia",
    frase: "Todavía no soy suficiente para estar donde quiero estar.",
    descripcion:
      "Tu crecimiento se ha convertido, sin darte cuenta, en otra forma de exigirte. Siempre existe una versión más evolucionada, más sana, más consciente o más preparada que necesitas alcanzar antes de permitirte sentirte suficiente. Incluso el desarrollo personal puede convertirse en una persecución.",
    detras: "Asociación entre valor y desempeño.",
    integrar: "Dejar de utilizar la evolución para rechazarse en el presente.",
  },
  escasez: {
    titulo: "Código de Carencia",
    frase: "Tengo que hacer más para poder recibir más.",
    descripcion:
      "Intelectualmente puedes creer en la abundancia, pero tu sistema sigue funcionando desde la sensación de que nunca hay suficiente: dinero, tiempo, oportunidades, amor o incluso capacidad personal. Por eso haces, fuerzas, acumulas, te preocupas o tienes dificultad para recibir sin sentir que primero tienes que merecerlo.",
    detras: "Miedo a que no haya suficiente.",
    integrar: "Suficiencia, merecimiento y apertura a recibir.",
  },
  validacion: {
    titulo: "Código de Validación Externa",
    frase: "Sé quién soy… hasta que alguien deja de confirmármelo.",
    descripcion:
      "Puedes haber trabajado mucho tu autoestima y, aun así, seguir midiendo inconscientemente tu valor a través de cómo te perciben los demás. Aparece al compararte, buscar aprobación, necesitar reconocimiento, tener miedo a decepcionar o modificar quién eres para sentirte aceptada.",
    detras: "Asociación entre aceptación y seguridad o pertenencia.",
    integrar: "Validación interna y soberanía.",
  },
  supervivencia: {
    titulo: "Código de Supervivencia Emocional",
    frase:
      "Sé que estoy a salvo, pero mi cuerpo todavía vive como si tuviera que protegerme.",
    descripcion:
      "Tu mente puede haber comprendido muchísimas cosas que tu cuerpo todavía no ha integrado. Por eso determinadas situaciones siguen activando respuestas automáticas: huir, bloquearte, reaccionar, cerrarte, defenderte o volver a comportamientos que creías superados.",
    detras: "Protección.",
    integrar:
      "Seguridad interna y una nueva respuesta ante aquello que antes representaba una amenaza.",
  },
  desconexion: {
    titulo: "Código de Búsqueda Infinita",
    frase: "He aprendido tanto de otros que ya no sé qué es verdad para mí.",
    descripcion:
      "Has leído, escuchado, hecho cursos, terapias o procesos espirituales. Tienes muchísimo conocimiento. Pero cuanto más buscas respuestas, más difícil puede volverse escuchar la tuya. Tu siguiente nivel no necesita necesariamente otra respuesta externa.",
    detras: "Desconfianza en la propia guía.",
    integrar: "Conexión con el Ser, intuición y discernimiento interno.",
  },
  autosabotaje: {
    titulo: "Código de Retorno a la Antigua Identidad",
    frase:
      "Quiero cambiar… pero cuando estoy a punto de hacerlo, vuelvo a lo conocido.",
    descripcion:
      "Hay una parte consciente de ti que desea una nueva realidad y otra que sigue identificando lo conocido como seguro. Por eso puedes avanzar muchísimo y, justo cuando llega el momento de sostener una nueva versión de ti, procrastinas, dudas, retrocedes o recreas circunstancias conocidas.",
    detras: "Fidelidad a la identidad conocida.",
    integrar:
      "Capacidad de sostener una nueva identidad incluso cuando todavía se siente desconocida.",
  },
};

/** Copy de la landing del lead magnet. */
export const LANDING = {
  titulo: "Radiografía de tu ADN",
  subtitulo:
    "Descubre qué código inconsciente sigue dirigiendo tu vida aunque creas que ya lo has trabajado.",
  promesa:
    "En menos de 2 minutos, identifica el Código Dominante que está condicionando tu forma de pensar, sentir y actuar, y descubre qué necesitas integrar para empezar a trascenderlo.",
  /* Las palabras clave de la promesa, para la cinta que separa el
     formulario de las tarjetas.

     Son los conceptos del párrafo que antes vivía en el hero: los dos
     minutos, el código dominante, los tres verbos que nombra y los dos
     movimientos que propone. El párrafo se retiró de la portada; esto
     es lo que queda de él, reducido a lo que se recuerda.

     El separador NO va aquí: lo pone la cinta entre vuelta y vuelta, y
     duplicarlo dejaría dos seguidos en la costura. */
  palabrasClave:
    "2 minutos ✦ Código Dominante ✦ Pensar ✦ Sentir ✦ Actuar ✦ Integrar ✦ Trascender",
  cta: "EMPEZAR MI RADIOGRAFÍA",
  bloqueTitulo: "Lo que vas a descubrir",
  bloqueSubtitulo:
    "Al terminar recibirás una lectura personalizada de tu Código Dominante y de cómo está operando actualmente en tu vida.",
  puntos: [
    {
      numero: "01",
      titulo: "Tu Código Dominante",
      texto:
        "La programación inconsciente que hoy tiene más peso sobre tu forma de pensar, sentir y actuar.",
    },
    {
      numero: "02",
      titulo: "Cómo se expresa en tu realidad",
      texto:
        "Las formas en las que ese código sigue manifestándose en tu vida, incluso cuando conscientemente crees haberlo trabajado.",
    },
    {
      numero: "03",
      titulo: "El código raíz",
      texto:
        "La información más profunda que hace que sigas regresando al mismo lugar, aunque mentalmente ya sepas que quieres responder diferente.",
    },
    {
      numero: "04",
      titulo: "Lo que necesitas integrar",
      texto:
        "La nueva información que necesitas llevar de la comprensión a la experiencia para empezar a trascender ese código.",
    },
  ],
};
