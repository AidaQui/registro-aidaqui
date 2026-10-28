import Av4Barra from "@/components/activacion-v4/Av4Barra";
import Av4Hero from "@/components/activacion-v4/Av4Hero";
import Av4Identificacion from "@/components/activacion-v4/Av4Identificacion";
import Av4Experiencia from "@/components/activacion-v4/Av4Experiencia";
import Av4Contexto from "@/components/activacion-v4/Av4Contexto";
import Av4LaExperiencia from "@/components/activacion-v4/Av4LaExperiencia";
import Av4Area from "@/components/activacion-v4/Av4Area";
import Av4Precio from "@/components/activacion-v4/Av4Precio";
import Av4Bio from "@/components/activacion-v4/Av4Bio";
import Av4Momento from "@/components/activacion-v4/Av4Momento";
import Av4Testimonios from "@/components/activacion-v4/Av4Testimonios";
import Av4Conector from "@/components/activacion-v4/Av4Conector";
import Av4Cierre from "@/components/activacion-v4/Av4Cierre";
import { Av4ContenidoProvider } from "@/components/activacion-v4/Av4ContenidoContext";
import type { Contenido } from "@/components/activacion-v4/contenido";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

/* Fondos de cada sección: salen del tema (variables de .av4), así cada
   variante pinta las costuras con su propia paleta. */
const MARFIL = "var(--av4-ivory)";
const ROSA = "var(--av4-rose-bg)";
const VINO = "var(--av4-wine)";

type Props = {
  /** Copy de la página. Sin él, el de v4. */
  contenido: Contenido;
  /** Clases de las fuentes de next/font (variables CSS) de la página. */
  fuentes: string;
  /** Modificador de tema, p. ej. "av4--arcilla". Vacío = paleta Corazón (v4). */
  tema?: string;
  /**
   * "v4" (por defecto): la estructura de /activacion-v4.
   * "areas": las cuatro landings por área (Para ti · Por qué el corazón · La
   * experiencia · Este momento · Sección del área · Precio · Aida ·
   * Testimonios · Cierre). Necesitan `laExperiencia` y `area` en el contenido.
   */
  estructura?: "v4" | "areas";
};

/** Estructura completa de la landing v4, reutilizada por v4 y sus variantes. */
export default function Av4Pagina({
  contenido,
  fuentes,
  tema = "",
  estructura = "v4",
}: Props) {
  // La barra de anuncio sólo va donde la landing la pide (disenio.barra).
  const conBarra = estructura === "areas" && !!contenido.disenio?.barra;

  return (
    <>
      {/* Más ágil que el default: la página es larga y con 2s se sentía lenta. */}
      <SmoothScroll duration={1.1} wheelMultiplier={1} />
      <Av4ContenidoProvider contenido={contenido}>
        <main
          className={`av4 ${tema} ${estructura === "areas" ? "av4--areas" : ""} ${conBarra ? "av4--barra" : ""} ${fuentes}`
            .replace(/\s+/g, " ")
            .trim()}
        >
          {conBarra && <Av4Barra />}
          <Av4Hero />
          {estructura === "areas" ? (
            <>
              <Av4Conector color={MARFIL} />
              <Av4Identificacion />
              <Av4Conector color={VINO} variante="onda" />
              <Av4Experiencia modo="corazon" />
              <Av4Conector color={ROSA} />
              <Av4LaExperiencia />
              <Av4Conector color={MARFIL} />
              <Av4Contexto />
              <Av4Conector color={ROSA} variante="onda" />
              <Av4Area />
              <Av4Conector color={VINO} />
              <Av4Precio />
              <Av4Conector color={MARFIL} variante="onda" />
              <Av4Bio />
              <Av4Conector color={ROSA} />
              <Av4Testimonios />
              <Av4Conector color={VINO} />
              <Av4Cierre />
            </>
          ) : (
            <>
              <Av4Conector color={MARFIL} />
              <Av4Identificacion />
              <Av4Conector color={VINO} variante="onda" />
              <Av4Experiencia />
              <Av4Conector color={MARFIL} />
              <Av4Contexto />
              <Av4Conector color={VINO} />
              <Av4Precio />
              <Av4Conector color={MARFIL} variante="onda" />
              <Av4Bio />
              <Av4Conector color={ROSA} />
              <Av4Testimonios />
              <Av4Momento />
              <Av4Conector color={VINO} />
              <Av4Cierre />
            </>
          )}
        </main>
      </Av4ContenidoProvider>
      <GradualBlur height="7rem" strength={2} divCount={6} />
    </>
  );
}
