import { EVENTO } from "@/components/activacion-v4/config";
import type { Contenido } from "@/components/activacion-v4/contenido";
import {
  BASE_AREAS,
  EL_DIA,
  EXPERIENCIA_INTRO,
  EXPERIENCIA_TITULAR,
  PARA_TI_CIERRE,
  oro,
} from "@/components/activacion-v4/variantes/comun";

/**
 * Operación Coherencia (salud y energía) · /operacion-coherencia · tema
 * av4--esmeralda. Copy del cliente, tal cual. Lo común a las cuatro landings
 * está en comun.tsx; fecha, horarios, precio y enlaces, en config.ts.
 */

/** Para <meta name="description">: es la bajada del hero, en texto plano. */
export const DESCRIPCION_COHERENCIA =
  "Cansancio, tensión, noches sin descanso. 2h en directo para volver a la coherencia entre lo que sientes y lo que vives, y así recuperar tu energía vital.";

export const CONTENIDO_COHERENCIA: Contenido = {
  ...BASE_AREAS,

  marca: {
    nombre: "Operación Coherencia",
    linea1: "OPERACIÓN",
    linea2: "COHERENCIA",
    macbook: ["Operación", "Coherencia"],
  },

  hero: {
    etiqueta: `Operación Coherencia · ${EVENTO.fechaCorta}`,
    titular: (
      <>
        Tu cuerpo lleva tiempo avisándote de{" "}
        {oro("lo que tu mente no quiere ver")}.
      </>
    ),
    bajada: DESCRIPCION_COHERENCIA,
    paraMujeres:
      "Para mujeres que lo sostienen todo y sienten que su cuerpo ya no puede más.",
    // Retrato en arco, a la derecha del texto: para cambiar la foto, cambiar `src` y sus medidas.
    retrato: {
      forma: "arco",
      src: "/activacion-v4/hero-esmeralda.webp",
      ancho: 680,
      alto: 750,
      posicion: "50% 20%",
    },
  },

  identificacion: {
    etiqueta: "Para ti",
    titular: (
      <>
        ¿Te levantas cansada {oro("aunque hayas dormido")}?
      </>
    ),
    texto:
      "Por fuera sigues con tu vida. Pero tu cuerpo lleva tiempo diciendo lo que tú todavía no te atreves a decir.",
    senales: [],
    items: [
      "Vives en modo supervivencia, con la mandíbula apretada, los hombros tensos y la cabeza que no para.",
      "Duermes, pero no descansas, y llegas al final del día sin energía para ti.",
      "Sostienes a todos, pero nadie te sostiene a ti, y el cuerpo empieza a pasarte factura.",
      "Has probado de todo: dietas, terapias, rutinas. Mejoras un tiempo y vuelves al mismo punto.",
      "Sabes que algo de tu vida no encaja, y sientes que tu cuerpo lo está gritando.",
    ],
    cierre: PARA_TI_CIERRE,
  },

  laExperiencia: {
    etiqueta: "La experiencia",
    titular: EXPERIENCIA_TITULAR,
    texto:
      "Primero activamos el corazón. Después llevamos lo que descubras a tu cuerpo, a tu descanso y a la forma en que vives cada día.",
    intro: EXPERIENCIA_INTRO,
    items: [
      "Sacar a tu cuerpo del modo alerta y volver a sentir calma.",
      "Reconocer qué situación de tu vida te está drenando la energía.",
      "Conectar con tu corazón y tu poder interior.",
      "Salir con un primer paso concreto para vivir en coherencia contigo.",
    ],
  },

  area: {
    etiqueta: "Coherencia y salud",
    titular: (
      <>
        Lo que callas, {oro("tu cuerpo lo sostiene")}.
      </>
    ),
    parrafos: [
      "Cuando dices sí queriendo decir no, cuando aguantas una situación que ya no es para ti, cuando vives en contra de lo que sientes, tu cuerpo se queda en alerta. Y un cuerpo en alerta constante no descansa, no se regenera y se agota.",
      "Por eso tantas mujeres que lo han probado todo siguen igual: cuidan el cuerpo, pero no tocan la incoherencia que lo tiene en tensión.",
    ],
    intro: "Cuando vuelves a la coherencia:",
    items: [
      "Tu sistema nervioso baja la guardia y vuelves a sentir calma.",
      "Duermes y descansas de verdad.",
      "Recuperas la energía que gastabas sosteniendo lo que no es tuyo.",
      "Escuchas las señales de tu cuerpo antes de que tengan que gritar.",
    ],
    aviso:
      "Esta activación no sustituye a ningún tratamiento médico. Es un espacio para escucharte y empezar a vivir de una forma que tu cuerpo agradezca.",
    foto: { src: "/activacion-v4/area-coherencia.webp", ancho: 620, alto: 750 },
  },

  cierre: {
    ...BASE_AREAS.cierre,
    titular: (
      <>
        Tu cuerpo ya ha hablado. {oro("La pregunta es si vas a escucharlo.")}
      </>
    ),
    subtitulo: `${EL_DIA}, una noche para volver a ti y recuperar tu energía.`,
    cta: BASE_AREAS.ctaPrincipal,
  },
};
