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
 * El Código Corazón (dinero y abundancia) · /codigo-corazon · tema
 * av4--arcilla. Copy del cliente, tal cual. Lo común a las cuatro landings
 * está en comun.tsx; fecha, horarios, precio y enlaces, en config.ts.
 */

/** Para <meta name="description">: es la bajada del hero, en texto plano. */
export const DESCRIPCION_CODIGO_CORAZON =
  "Descubre la creencia que te hace sentir que no mereces recibir, y activa el código que abre tu abundancia.";

export const CONTENIDO_CODIGO_CORAZON: Contenido = {
  ...BASE_AREAS,

  marca: {
    nombre: "El Código Corazón",
    linea1: "EL CÓDIGO",
    linea2: "CORAZÓN",
    macbook: ["El Código", "Corazón"],
  },

  hero: {
    etiqueta: `El Código Corazón · ${EVENTO.fechaCorta}`,
    titular: (
      <>
        El dinero no se bloquea en tu cuenta. {oro("Se bloquea en tu corazón.")}
      </>
    ),
    bajada: DESCRIPCION_CODIGO_CORAZON,
    paraMujeres:
      "Para mujeres que dan muchísimo y reciben mucho menos de lo que merecen.",
  },

  identificacion: {
    etiqueta: "Para ti",
    titular: (
      <>
        ¿Trabajas el doble y {oro("recibes la mitad")}?
      </>
    ),
    texto:
      "Por fuera haces todo lo que se supone que hay que hacer. Pero el dinero no llega, o llega y se va igual de rápido.",
    senales: [],
    items: [
      "Te cuesta cobrar lo que vales, y acabas regalando tu tiempo y tu trabajo.",
      "El dinero llega y se esfuma, como si algo dentro de ti no te dejara retenerlo.",
      "Sientes culpa por querer más, como si la abundancia y la espiritualidad estuvieran peleadas.",
      "Has hecho cursos de manifestación y finanzas, pero sigues en el mismo techo.",
      "Das a todos sin medida, pero te cuesta muchísimo recibir.",
    ],
    cierre: PARA_TI_CIERRE,
  },

  laExperiencia: {
    etiqueta: "La experiencia",
    titular: EXPERIENCIA_TITULAR,
    texto:
      "Primero activamos el corazón. Después llevamos lo que descubras a tu relación con el dinero, con tu trabajo y con lo que te permites recibir.",
    intro: EXPERIENCIA_INTRO,
    items: [
      "Reconocer la creencia que te hace sentir que no mereces recibir.",
      "Soltar la culpa de querer más.",
      "Conectar con tu corazón y tu poder interior.",
      "Salir con una decisión concreta sobre tu dinero o tu trabajo.",
    ],
  },

  // Foto del Bloque B acorde al ángulo de la landing.
  contexto: {
    ...BASE_AREAS.contexto,
    foto: { src: "/activacion-v4/contexto-codigo.webp", ancho: 600, alto: 750, posicion: "50% 25%" },
  },

  area: {
    etiqueta: "El corazón y el dinero",
    titular: (
      <>
        No es que no sepas ganar dinero. {oro("Es que no te permites recibirlo.")}
      </>
    ),
    parrafos: [
      "Puedes saber todas las estrategias, pero si en tu corazón hay una parte que cree que no lo merece, que tener más es ego o que el dinero aleja del alma, vas a sabotear cada oportunidad sin darte cuenta.",
      <>
        Ese es el código:{" "}
        <strong>
          lo que tu corazón cree sobre recibir decide cuánto dejas entrar en tu
          vida.
        </strong>
      </>,
    ],
    intro: "Cuando activas tu corazón:",
    items: [
      "Pones precio a tu trabajo sin justificarte ni pedir perdón.",
      "Dejas de sentir que la abundancia y la espiritualidad son incompatibles.",
      "Te abres a recibir sin culpa: dinero, ayuda, oportunidades.",
      "Tomas decisiones de trabajo desde la confianza, no desde la escasez.",
    ],
    // Foto del área pendiente: se genera con IA (ver chat).
  },

  // Presentación de cada sección (ver `Disenio` en contenido.tsx): lo que da ritmo propio a esta landing.
  disenio: {
    paraTi: "titulos",
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
    testimonios: "muro",
  },

  cierre: {
    ...BASE_AREAS.cierre,
    titular: (
      <>
        Tu abundancia no está fuera.{" "}
        {oro("Está esperando a que te permitas recibirla.")}
      </>
    ),
    subtitulo: `${EL_DIA} activamos juntas el código de tu corazón.`,
    cta: BASE_AREAS.ctaPrincipal,
  },
};
