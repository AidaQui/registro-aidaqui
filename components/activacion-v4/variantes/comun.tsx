import type { ReactNode } from "react";
import { EVENTO, PRECIO } from "@/components/activacion-v4/config";
import { CONTENIDO_V4, type Contenido } from "@/components/activacion-v4/contenido";

/**
 * Copy COMÚN de las cuatro landings por área (Operación Coherencia, El Código
 * Corazón, El Cierre de Ciclo y Misión Alma). Es el del cliente, tal cual:
 * Bloque A (por qué el corazón), Bloque B (este momento), Bloque C (qué
 * recibes y precio), Bloque D (quién es Aida) y los textos que se repiten.
 *
 * Lo que cambia por landing (nombre, hero, "Para ti", "La experiencia", sección
 * del área y cierre) está en el archivo de cada una. Cada archivo parte de
 * BASE_AREAS y pisa sólo lo suyo.
 *
 * El precio NO se escribe en el copy: sale de PRECIO (config.ts), así lo que
 * dice la página es siempre lo que cobra el checkout.
 */

export const oro = (t: ReactNode) => <span className="av4-oro">{t}</span>;

/** "El 15 de noviembre" con la fecha de config.ts. */
export const EL_DIA =
  EVENTO.fechaLarga.charAt(0).toUpperCase() + EVENTO.fechaLarga.slice(1);

/** Cierre del "Para ti": es el mismo en las cuatro. */
export const PARA_TI_CIERRE = (
  <>
    Esta activación es un espacio para reconectar con la verdad de tu corazón y
    recuperar el poder interior para empezar a actuar en coherencia en tu vida.
  </>
);

/** Titular de "La experiencia": es el mismo en las cuatro. */
export const EXPERIENCIA_TITULAR = (
  <>
    Una experiencia energética que se convierte en {oro("decisiones reales")}.
  </>
);

/** "A través de la meditación…": es la misma en las cuatro. */
export const EXPERIENCIA_INTRO =
  "A través de la meditación y una activación energética guiada vas a:";

/** Bloque B: los tres párrafos del cliente. */
export const CONTEXTO_PARRAFOS: ReactNode[] = [
  "Vivimos un momento de mucho ruido, información y cambios. Hay opiniones sobre todo: cómo deberías vivir, qué deberías conseguir y quién deberías ser. Y entre tantas voces, puedes terminar alejándote de la tuya.",
  "Desde mi forma de sentir este momento planetario, estamos siendo llamados a revisar las estructuras desde las que vivimos: lo que sostenemos por miedo, lo que elegimos por costumbre y lo que ya no se corresponde con quienes somos.",
  <>
    Volver al corazón es parte de esa transformación:{" "}
    <strong>recuperar una guía interior</strong> desde la que elegir con más
    consciencia lo que queremos crear.
  </>,
];

export const BASE_AREAS: Contenido = {
  ...CONTENIDO_V4,

  // Hero y precio: "Quiero mi plaza · 19€" (el monto sale de config.ts).
  ctaPrincipal: `Quiero mi plaza · ${PRECIO.actual}`,
  // "Para ti", "La experiencia" y entrada de precio.
  ctaCompra: "Quiero mi plaza",

  // Bloque A · Por qué el corazón (idéntico al de v4 salvo "deberías" y "nutran").
  experiencia: {
    ...CONTENIDO_V4.experiencia,
    etiqueta: "Por qué el corazón",
    cambios: [
      ["Decisiones", "dejas de dar vueltas y eliges sin necesitar permiso."],
      ["Relaciones", "pones límites sin culpa y atraes vínculos que te nutran."],
      ["Trabajo y propósito", "reconoces tus dones y te atreves a compartirlos."],
      ["Dinero y abundancia", "te abres a recibir sin sentir que no lo mereces."],
      ["Cuerpo y energía", "sueltas la tensión de vivir en contra de ti."],
    ],
    titular: (
      <>
        Tu mente sabe lo que deberías hacer. Tu corazón sabe{" "}
        {oro("lo que quieres de verdad")}.
      </>
    ),
  },

  // Bloque B · Este momento (sin lista ni cierre extra: el cliente sólo trae párrafos).
  contexto: {
    etiqueta: "Este momento",
    titular: (
      <>
        En medio de tanto cambio, volver a tu corazón{" "}
        {oro("cobra un nuevo sentido")}.
      </>
    ),
    parrafos: CONTEXTO_PARRAFOS,
    lineas: [],
  },

  // Bloque C · Qué recibes y precio.
  precio: {
    ...CONTENIDO_V4.precio,
    titular: () => <>¿Qué recibirás por solo {oro(PRECIO.actual)}?</>,
    incluye: [
      "Una experiencia guiada en directo vía Zoom.",
      "Una activación energética del corazón y el poder interior.",
      "Mi práctica para trabajar las creencias que te limitan.",
      "Una canalización para el grupo en directo.",
      "Prácticas para integrar la experiencia en tu día a día.",
      "Meditaciones para cultivar el amor, la alegría y la apertura a recibir.",
    ],
  },

  // Bloque D · Quién es Aida.
  bio: {
    etiqueta: "Aida Qui",
    titular: <>¿Quién guiará {oro("esta experiencia")}?</>,
    parrafos: [
      <>
        Aida Qui es una de las referentes más reconocidas en{" "}
        <strong>transformación energética</strong> y espiritualidad práctica en
        habla hispana. Es creadora de la <em>Academia ADN</em>, un movimiento y
        escuela de transformación diseñado para ayudar a las personas a elevar
        su consciencia, vivir desde una mayor coherencia y transformar todas las
        áreas de su vida.
      </>,
      "Durante años ha acompañado a miles de personas en procesos de transformación profunda. Su trabajo une espiritualidad práctica, maestría energética, sistema emocional y acción concreta: no se queda en la meditación, se lleva a las decisiones de cada día.",
    ],
  },
};
