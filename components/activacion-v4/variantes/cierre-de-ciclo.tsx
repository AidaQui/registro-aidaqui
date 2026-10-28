import { EVENTO } from "@/components/activacion-v4/config";
import type { Contenido } from "@/components/activacion-v4/contenido";
import {
  BASE_AREAS,
  CONTEXTO_PARRAFOS,
  EL_DIA,
  EXPERIENCIA_INTRO,
  EXPERIENCIA_TITULAR,
  PARA_TI_CIERRE,
  oro,
} from "@/components/activacion-v4/variantes/comun";

/**
 * El Cierre de Ciclo (relaciones) · /cierre-de-ciclo · tema av4--lavanda.
 * Copy del cliente, tal cual. Lo común a las cuatro landings está en
 * comun.tsx; fecha, horarios, precio y enlaces, en config.ts.
 */

/** Para <meta name="description">: es la bajada del hero, en texto plano. */
export const DESCRIPCION_CIERRE_DE_CICLO =
  "Aprovecha la energía de los portales de cierre de año para soltar los vínculos y patrones que te drenan, y abrir espacio a relaciones que te nutran.";

export const CONTENIDO_CIERRE_DE_CICLO: Contenido = {
  ...BASE_AREAS,

  marca: {
    nombre: "El Cierre de Ciclo",
    linea1: "EL CIERRE",
    linea2: "DE CICLO",
    macbook: ["El Cierre", "de Ciclo"],
  },

  hero: {
    etiqueta: `El Cierre de Ciclo · ${EVENTO.fechaCorta}`,
    titular: (
      <>
        No entres en 2027{" "}
        {oro("cargando las relaciones que ya cerraron en tu corazón")}.
      </>
    ),
    bajada: DESCRIPCION_CIERRE_DE_CICLO,
    paraMujeres:
      "Para mujeres que siempre están para todos y sienten que nadie está para ellas.",
    // Retrato en óvalo centrado: para cambiar la foto, cambiar `src` y sus medidas.
    retrato: {
      forma: "ovalo",
      src: "/activacion-v4/hero-lavanda.webp",
      ancho: 700,
      alto: 750,
      posicion: "50% 22%",
    },
  },

  identificacion: {
    etiqueta: "Para ti",
    titular: (
      <>
        Hay relaciones que ya terminaron dentro de ti.{" "}
        {oro("Pero sigues sosteniéndolas.")}
      </>
    ),
    texto:
      "Por fuera todo sigue igual. Pero por dentro sabes que hay vínculos, dinámicas y versiones de ti que ya no pueden acompañarte al año que viene.",
    senales: [],
    items: [
      "Repites el mismo patrón con distintas personas: en la pareja, en la familia, en el trabajo.",
      "Te cuesta poner límites sin sentir culpa o miedo a perder a alguien.",
      "Das mucho más de lo que recibes, y llegas agotada a cada encuentro.",
      "Sigues enganchada a alguien o algo que tu corazón ya soltó, pero tu mente no.",
      "Quieres relaciones que te nutran, pero no sabes cómo dejar espacio para ellas.",
    ],
    cierre: PARA_TI_CIERRE,
  },

  laExperiencia: {
    etiqueta: "La experiencia",
    titular: EXPERIENCIA_TITULAR,
    texto:
      "Primero activamos el corazón. Después llevamos lo que descubras a tus relaciones de pareja, familia, amistad y trabajo.",
    intro: EXPERIENCIA_INTRO,
    items: [
      "Reconocer qué vínculos y patrones ya cumplieron su ciclo.",
      "Soltar la carga emocional que te mantiene enganchada.",
      "Conectar con tu corazón y tu poder interior.",
      "Salir con un límite o una decisión concreta sobre una relación.",
    ],
  },

  // Bloque B: los tres párrafos comunes y, sólo en esta landing, el de los portales.
  contexto: {
    ...BASE_AREAS.contexto,
    parrafos: [
      ...CONTEXTO_PARRAFOS,
      // TODO: confirmar portales con el cliente. El texto original dice
      // "[nombrar los portales que trabaje Aida, por ejemplo 11/11 y 12/12]":
      // se usó su propio ejemplo (11/11 y 12/12).
      "Los portales de cierre de año 11/11 y 12/12 son una ventana energética para cerrar lo que ya terminó. Lo que sueltes ahora no entra contigo al próximo ciclo.",
    ],
    foto: { src: "/activacion-v4/contexto-cierre.webp", ancho: 600, alto: 750, posicion: "50% 20%" },
  },

  area: {
    etiqueta: "El corazón y tus relaciones",
    titular: (
      <>
        Tus relaciones son {oro("el espejo de cómo te tratas a ti")}.
      </>
    ),
    parrafos: [
      "Cuando vives desconectada de tu corazón, eliges desde la carencia: te quedas donde no te valoran, das para que te quieran y callas para no perder. Y atraes una y otra vez el mismo tipo de vínculo.",
    ],
    intro: "Cuando cierras el ciclo desde el corazón:",
    items: [
      "Pones límites con amor, sin culpa y sin dramas.",
      "Dejas de repetir el mismo patrón en la pareja y en el trabajo.",
      "Sueltas a quien ya no es para ti sin quedarte enganchada.",
      "Haces espacio para relaciones de igual a igual, personales y profesionales.",
    ],
    // Foto del área pendiente: se genera con IA (ver chat).
  },

  cierre: {
    ...BASE_AREAS.cierre,
    titular: (
      <>
        El año se cierra igual para todas.{" "}
        {oro("Lo que cambia es lo que decides llevarte.")}
      </>
    ),
    subtitulo: `${EL_DIA} cerramos el ciclo desde el corazón.`,
    cta: BASE_AREAS.ctaPrincipal,
  },
};
