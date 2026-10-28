import Image from "next/image";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Datos from "@/components/activacion-v4/Av4Datos";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Prueba from "@/components/activacion-v4/Av4Prueba";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { EVENTO } from "@/components/activacion-v4/config";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";

/**
 * Hero en vino profundo: logotipo, etiqueta, titular, bajada, horarios y CTA,
 * con los datos reales rotando debajo; Aida fundida con el fondo a la derecha.
 * En escritorio todo entra en 750px de alto.
 *
 * Si el contenido trae `hero.retrato`, la composición cambia (óvalo centrado o
 * arco a la derecha, ver contenido.tsx) y la foto a pantalla completa no se
 * pinta. Sin retrato, el marcado es el de siempre y la foto la pone el CSS
 * (cada variante puede darle la suya).
 */
export default function Av4Hero() {
  const { hero, ctaPrincipal, disenio } = useContenido();
  const { retrato } = hero;
  // Algunas landings funden "Para mujeres que…" en la bajada, como última frase.
  const paraEnBajada = !!disenio?.heroParaEnBajada && !!hero.paraMujeres;

  return (
    <section
      className={retrato ? `av4-hero av4-hero--${retrato.forma}` : "av4-hero"}
      aria-labelledby="av4-hero-title"
    >
      {!retrato && <div className="av4-hero__foto" aria-hidden="true" />}

      <div className="av4-hero__shell">
        <div className="av4-hero__copy">
          <Av4Lockup sello />

          <div className="av4-hero__tag">
            <Av4Tag>
              {hero.etiqueta ?? `${EVENTO.fechaCorta} · ${EVENTO.formato}`}
            </Av4Tag>
          </div>

          <h1 id="av4-hero-title" className="av4-hero__title">
            {hero.titular}
          </h1>

          <p className="av4-hero__lead">
            {hero.bajada}
            {paraEnBajada && (
              <>
                {" "}
                <span className="av4-hero__para-in">{hero.paraMujeres}</span>
              </>
            )}
          </p>

          {hero.paraMujeres && !paraEnBajada && (
            <p className="av4-hero__para">{hero.paraMujeres}</p>
          )}

          {/* Horarios, CTA y cinta de datos comparten ancho: el botón y la
              cinta miden lo mismo que la grilla de horarios. */}
          <div className="av4-hero__accion">
            <Av4Horarios compacto />

            {/* Va al pricing, no al checkout: saltar afuera sin ver qué incluye
                ni cuánto cuesta es la fricción que más rebota. */}
            <Av4Cta href="#av4-precio" label={ctaPrincipal} />

            <Av4Datos />
          </div>

          {disenio?.prueba === "hero" && <Av4Prueba className="av4-prueba--hero" />}
        </div>

        {retrato && (
          <div className="av4-hero__retrato" aria-hidden="true">
            <div className="av4-hero__marco">
              {/* LCP de la variante: se precarga. */}
              <Image
                src={retrato.src}
                alt=""
                width={retrato.ancho}
                height={retrato.alto}
                preload
                sizes={
                  retrato.forma === "ovalo"
                    ? "(max-width: 640px) 230px, 290px"
                    : "(max-width: 640px) 78vw, (max-width: 1000px) 400px, 490px"
                }
                className="av4-hero__img"
                style={{ objectPosition: retrato.posicion }}
              />
            </div>
            {retrato.forma === "arco" && (
              <svg
                className="av4-hero__rama"
                viewBox="0 0 120 150"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              >
                <path d="M104 146C84 112 74 76 46 6" />
                <path d="M92 124c-18-3-30-13-34-28 16 2 30 12 34 28Z" />
                <path d="M80 98c-17 0-29-9-36-23 17 0 30 9 36 23Z" />
                <path d="M68 70c-15-3-25-12-29-26 15 1 26 10 29 26Z" />
                <path d="M91 114c14-6 21-17 22-32-14 5-21 16-22 32Z" />
                <path d="M77 86c13-6 19-16 20-29-13 5-19 15-20 29Z" />
                <path d="M62 56c11-6 17-14 17-26-11 5-17 14-17 26Z" />
              </svg>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
