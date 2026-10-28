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
 * Misión Alma (propósito) · /mision-alma · tema av4--amanecer. Copy del
 * cliente, tal cual. Los testimonios son los actuales (el cliente confirmó que
 * encajan con esta landing). Lo común a las cuatro landings está en
 * comun.tsx; fecha, horarios, precio y enlaces, en config.ts.
 */

/** Para <meta name="description">: es la bajada del hero, en texto plano. */
export const DESCRIPCION_MISION_ALMA =
  "Una noche para escuchar con claridad lo que tu alma te pide, reconocer tus dones y dar el primer paso hacia la vida que viniste a vivir.";

export const CONTENIDO_MISION_ALMA: Contenido = {
  ...BASE_AREAS,

  marca: {
    nombre: "Misión Alma",
    linea1: "MISIÓN",
    linea2: "ALMA",
    macbook: ["Misión", "Alma"],
  },

  // Sin `retrato`: el hero es una foto a todo el ancho que pone el CSS
  // (.av4--amanecer .av4-hero__foto), de /registro-v1/.
  hero: {
    etiqueta: `Misión Alma · ${EVENTO.fechaCorta}`,
    titular: (
      <>
        Sabes que viniste a hacer algo más.{" "}
        {oro("Y cada año que pasa, se te nota más.")}
      </>
    ),
    bajada: DESCRIPCION_MISION_ALMA,
    paraMujeres:
      "Para mujeres que tienen una vida que funciona, pero sienten que no es la suya.",
  },

  identificacion: {
    etiqueta: "Para ti",
    titular: (
      <>
        Tu vida funciona.{" "}
        {oro("Pero algo dentro de ti sabe que no es esto.")}
      </>
    ),
    texto:
      "Por fuera cumples con todo. Pero por dentro hay una voz que lleva tiempo pidiéndote algo distinto, y cada vez es más difícil no escucharla.",
    senales: [],
    items: [
      "Sientes que tienes un propósito, pero no sabes cuál es ni por dónde empezar.",
      "Tu trabajo te da estabilidad, pero no te da sentido.",
      "Tienes dones que no estás compartiendo, por miedo, por falta de tiempo o porque no te crees capaz.",
      "Has leído, meditado y hecho cursos, pero sigues sin dar el paso.",
      "Sientes que el tiempo pasa y la vida que imaginabas sigue esperando.",
    ],
    cierre: PARA_TI_CIERRE,
  },

  laExperiencia: {
    etiqueta: "La experiencia",
    titular: EXPERIENCIA_TITULAR,
    texto:
      "Primero activamos el corazón. Después llevamos lo que descubras a tu trabajo, a tus proyectos y a la forma en que quieres aportar al mundo.",
    intro: EXPERIENCIA_INTRO,
    items: [
      "Escuchar con claridad lo que tu alma te está pidiendo.",
      "Reconocer los dones que has estado escondiendo.",
      "Conectar con tu corazón y tu poder interior.",
      "Salir con el primer paso concreto hacia tu propósito.",
    ],
  },

  // Foto del Bloque B acorde al ángulo de la landing.
  contexto: {
    ...BASE_AREAS.contexto,
    foto: { src: "/activacion-v2/item5.jpg", ancho: 1086, alto: 1448, posicion: "50% 40%" },
  },

  area: {
    etiqueta: "El corazón y tu propósito",
    titular: (
      <>
        Tu propósito no se piensa. {oro("Se siente.")}
      </>
    ),
    parrafos: [
      "Por eso no lo encuentras haciendo listas ni tests. La mente busca la opción segura; el corazón sabe para qué viniste. Mientras decidas solo con la cabeza, vas a seguir eligiendo lo que esperan de ti.",
    ],
    intro: "Cuando escuchas tu misión desde el corazón:",
    items: [
      "Sabes con claridad qué quieres aportar y a quién.",
      "Dejas de esperar el momento perfecto y das el primer paso.",
      "Conviertes tus dones en un proyecto, un servicio o una nueva etapa profesional.",
      "Sientes que tu día a día por fin tiene sentido.",
    ],
    foto: { src: "/activacion-v4/area-mision.webp", ancho: 470, alto: 588, posicion: "50% 20%" },
  },

  // Presentación de cada sección (ver `Disenio` en contenido.tsx): lo que da ritmo propio a esta landing.
  disenio: {
    cambia: { tipo: "fotos", fotos: [
        { src: "/activacion-v4/cambia-mision-decisiones.webp" },
        { src: "/activacion-v4/cambia-mision-relaciones.webp" },
        { src: "/activacion-v4/cambia-mision-trabajo.webp" },
        { src: "/activacion-v4/cambia-mision-dinero.webp" },
        { src: "/activacion-v4/cambia-mision-cuerpo.webp" },
      ] },
    precio: {
      tipo: "bento",
      fotos: [
        { src: "/activacion-v4/experiencia.jpg", posicion: "50% 12%" }, // Zoom
        undefined, // activación del corazón
        { src: "/masterclass/aida-2.jpg", posicion: "34% 40%" }, // creencias
        { src: "/activacion-v2/item2.jpg", posicion: "50% 35%" }, // canalización
        undefined, // prácticas
        { src: "/activacion-v4/contexto.jpg", posicion: "50% 40%" }, // meditaciones
      ],
    },
    bio: {
      tipo: "mosaico",
      fotos: [
        { src: "/activacion-v4/momento-2.jpg", alt: "Aida Qui" },
        { src: "/activacion-v4/bio-1.jpg", posicion: "50% 58%" },
        { src: "/activacion-v4/momento-4.jpg", posicion: "50% 30%" },
        { src: "/activacion-v4/mosaico-escenario.webp", posicion: "30% 40%" },
        { src: "/registro-v2/hero.webp", posicion: "80% 30%" },
      ],
    },
  },

  cierre: {
    ...BASE_AREAS.cierre,
    titular: (
      <>
        Tu alma no te pide que lo sepas todo.{" "}
        {oro("Te pide que des el primer paso.")}
      </>
    ),
    subtitulo: `${EL_DIA} activamos tu misión desde el corazón.`,
    cta: BASE_AREAS.ctaPrincipal,
  },
};
