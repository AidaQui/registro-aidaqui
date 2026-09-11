import type { Patron } from "@/components/diagnostico/preguntas";

/**
 * Contenido de los siete patrones.
 *
 * En pantalla se muestra la ficha corta: título, frase y descripción. El
 * desarrollo completo —cómo se manifiesta, por qué se repite y el primer
 * paso— llega por correo en el vídeo correspondiente, así que aquí no se
 * duplica.
 */

export type FichaPatron = {
  numero: string;
  titulo: string;
  frase: string;
  descripcion: string;
  detras: string;
  integrar: string;
};

export const FICHAS: Record<Patron, FichaPatron> = {
  control: {
    numero: "01",
    titulo: "El patrón de control",
    frase: "Si no lo controlo, algo puede salir mal.",
    descripcion:
      "Has hecho mucho trabajo interno, pero una parte de ti sigue necesitando anticipar, entender y controlar lo que ocurre para sentirse segura. Puede manifestarse como sobrepensar, dificultad para soltar, querer saber cómo va a suceder todo, exigencia o frustración cuando la realidad no responde como esperabas.",
    detras: "Necesidad de seguridad.",
    integrar:
      "Confianza, rendición y capacidad de permanecer en lo desconocido sin volver automáticamente al control.",
  },
  hiperexigencia: {
    numero: "04",
    titulo: "El patrón de hiperexigencia",
    frase: "Todavía no soy suficiente para estar donde quiero estar.",
    descripcion:
      "Tu crecimiento se ha convertido, sin darte cuenta, en otra forma de exigirte. Siempre existe una versión más evolucionada, más sana, más consciente o más preparada que necesitas alcanzar antes de permitirte sentirte suficiente. Incluso el desarrollo personal puede convertirse en una persecución.",
    detras: "Asociación entre valor y desempeño.",
    integrar: "Dejar de utilizar la evolución para rechazarse en el presente.",
  },
  escasez: {
    numero: "03",
    titulo: "El patrón de escasez",
    frase: "Tengo que hacer más para poder recibir más.",
    descripcion:
      "Intelectualmente puedes creer en la abundancia, pero tu sistema sigue funcionando desde la sensación de que nunca hay suficiente: dinero, tiempo, oportunidades, amor o incluso capacidad personal. Por eso haces, fuerzas, acumulas, te preocupas o tienes dificultad para recibir sin sentir que primero tienes que merecerlo.",
    detras: "Miedo a que no haya suficiente.",
    integrar: "Suficiencia, merecimiento y apertura a recibir.",
  },
  validacion: {
    numero: "02",
    titulo: "El patrón de validación",
    frase: "Sé quién soy… hasta que alguien deja de confirmármelo.",
    descripcion:
      "Puedes haber trabajado mucho tu autoestima y, aun así, seguir midiendo inconscientemente tu valor a través de cómo te perciben los demás. Aparece al compararte, buscar aprobación, necesitar reconocimiento, tener miedo a decepcionar o modificar quién eres para sentirte aceptada.",
    detras: "Asociación entre aceptación y seguridad o pertenencia.",
    integrar: "Validación interna y soberanía.",
  },
  supervivencia: {
    numero: "05",
    titulo: "El patrón de supervivencia",
    frase:
      "Sé que estoy a salvo, pero mi cuerpo todavía vive como si tuviera que protegerme.",
    descripcion:
      "Tu mente puede haber comprendido muchísimas cosas que tu cuerpo todavía no ha integrado. Por eso determinadas situaciones siguen activando respuestas automáticas: huir, bloquearte, reaccionar, cerrarte, defenderte o volver a comportamientos que creías superados.",
    detras: "Protección.",
    integrar:
      "Seguridad interna y una nueva respuesta ante aquello que antes representaba una amenaza.",
  },
  desconexion: {
    numero: "06",
    titulo: "El patrón de desconexión",
    frase: "He aprendido tanto de otros que ya no sé qué es verdad para mí.",
    descripcion:
      "Has leído, escuchado, hecho cursos, terapias o procesos espirituales. Tienes muchísimo conocimiento. Pero cuanto más buscas respuestas, más difícil puede volverse escuchar la tuya. Tu siguiente nivel no necesita necesariamente otra respuesta externa.",
    detras: "Desconfianza en la propia guía.",
    integrar: "Conexión con el Ser, intuición y discernimiento interno.",
  },
  autosabotaje: {
    numero: "07",
    titulo: "El patrón de autosabotaje",
    frase:
      "Quiero cambiar… pero cuando estoy a punto de hacerlo, vuelvo a lo conocido.",
    descripcion:
      "Hay una parte consciente de ti que desea una nueva realidad y otra que sigue identificando lo conocido como seguro. Por eso puedes avanzar muchísimo y, justo cuando llega el momento de sostener una nueva versión de ti, procrastinas, dudas, retrocedes o recreas circunstancias conocidas.",
    detras: "Fidelidad a la identidad conocida.",
    integrar:
      "Capacidad de sostener una nueva identidad incluso cuando todavía se siente desconocida.",
  },
};

/** Copy de la landing del diagnóstico. */
export const LANDING = {
  titulo: "Radiografía de tu ADN",
  subtitulo:
    "Descubre qué patrón inconsciente sigue dirigiendo tu vida aunque creas que ya lo has trabajado.",
  promesa:
    "En menos de 2 minutos, identifica el patrón que está condicionando tu forma de pensar, sentir y actuar, y descubre cuál es el primer paso para empezar a trascenderlo.",
  bloqueTitulo: "Lo que vas a descubrir",
  bloqueSubtitulo:
    "Al terminar recibirás una lectura personalizada de tu patrón dominante y cómo está operando actualmente en tu vida.",
  puntos: [
    {
      numero: "01",
      titulo: "Tu patrón dominante",
      texto:
        "El patrón inconsciente que hoy tiene más peso sobre tus pensamientos, emociones y decisiones.",
    },
    {
      numero: "02",
      titulo: "Cómo se manifiesta en tu vida",
      texto:
        "Las formas en las que puede estar condicionando tu realidad sin que te des cuenta.",
    },
    {
      numero: "03",
      titulo: "Por qué sigues repitiéndolo",
      texto:
        "Qué hace que vuelvas al mismo lugar incluso después de haberlo comprendido o trabajado.",
    },
    {
      numero: "04",
      titulo: "Tu primer paso para trascenderlo",
      texto:
        "El movimiento que necesitas empezar a integrar para dejar de reaccionar desde ese patrón.",
    },
  ],
};
