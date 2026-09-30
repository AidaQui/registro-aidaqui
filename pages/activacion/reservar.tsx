import Head from "next/head";
import PuenteHero from "@/components/activacion/puente/PuenteHero";
import PuenteIncluye from "@/components/activacion/puente/PuenteIncluye";
import PuenteOctubre from "@/components/activacion/puente/PuenteOctubre";
import PuenteObjeciones from "@/components/activacion/puente/PuenteObjeciones";
import PuenteCierre from "@/components/activacion/puente/PuenteCierre";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

/**
 * Página puente entre la landing y el checkout.
 *
 *   Anuncio → /activacion → ESTA → checkout → gracias
 *
 * ── NOINDEX ──
 *
 * Es una página intermedia: quien la encuentre en un buscador llegaría sin
 * haber leído nada y vería un precio sin contexto. Que indexe la landing.
 *
 * ── SIN GradualBlur ──
 *
 * La landing lo usa para difuminar su pie. Aquí el último bloque es la card
 * de compra, y velarla por abajo taparía justo el botón.
 */
export default function ActivacionReservar() {
  return (
    <>
      <Head>
        <title>Reserva tu lugar — Activación del Ser Multidimensional</title>
        <meta
          name="description"
          content="Completa tu inscripción a la Activación del Ser Multidimensional del 10 de octubre, en vivo por Zoom."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SmoothScroll />

      <main>
        <PuenteHero />
        <PuenteIncluye />
        <PuenteOctubre />
        <PuenteObjeciones />
        <PuenteCierre />
      </main>
    </>
  );
}
