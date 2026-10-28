import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Datos from "@/components/activacion-v4/Av4Datos";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { EVENTO } from "@/components/activacion-v4/config";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";

/**
 * Hero en vino profundo: logotipo, etiqueta, titular, bajada, horarios y CTA,
 * con los datos reales rotando debajo; Aida fundida con el fondo a la derecha.
 * En escritorio todo entra en 750px de alto.
 */
export default function Av4Hero() {
  const { hero, ctaPrincipal } = useContenido();

  return (
    <section className="av4-hero" aria-labelledby="av4-hero-title">
      <div className="av4-hero__foto" aria-hidden="true" />

      <div className="av4-hero__shell">
        <div className="av4-hero__copy">
          <Av4Lockup sello />

          <div className="av4-hero__tag">
            <Av4Tag>
              {EVENTO.fechaCorta} · {EVENTO.formato}
            </Av4Tag>
          </div>

          <h1 id="av4-hero-title" className="av4-hero__title">
            {hero.titular}
          </h1>

          <p className="av4-hero__lead">{hero.bajada}</p>

          {/* Horarios, CTA y cinta de datos comparten ancho: el botón y la
              cinta miden lo mismo que la grilla de horarios. */}
          <div className="av4-hero__accion">
            <Av4Horarios compacto />

            {/* Va al pricing, no al checkout: saltar afuera sin ver qué incluye
                ni cuánto cuesta es la fricción que más rebota. */}
            <Av4Cta href="#av4-precio" label={ctaPrincipal} />

            <Av4Datos />
          </div>
        </div>
      </div>
    </section>
  );
}
