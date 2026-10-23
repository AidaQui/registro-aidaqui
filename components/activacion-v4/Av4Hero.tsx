import Image from "next/image";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Datos from "@/components/activacion-v4/Av4Datos";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { EVENTO } from "@/components/activacion-v4/config";

/**
 * Hero en vino profundo: logotipo, etiqueta, titular, bajada, horarios y CTA;
 * Aida fundida con el fondo a la derecha y la fila de datos reales debajo.
 */
export default function Av4Hero() {
  return (
    <section className="av4-hero" aria-labelledby="av4-hero-title">
      <div className="av4-hero__foto" aria-hidden="true">
        <Image
          src="/activacion-v4/hero-aida.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1000px) 100vw, 700px"
          className="av4-cover"
        />
      </div>

      <div className="av4-hero__shell">
        <div className="av4-hero__copy">
          <Av4Lockup sello />

          <div className="av4-hero__tag">
            <Av4Tag>
              {EVENTO.fechaCorta} · {EVENTO.formato}
            </Av4Tag>
          </div>

          <h1 id="av4-hero-title" className="av4-hero__title">
            Deja de posponer{" "}
            <span className="av4-oro">la vida que de verdad quieres vivir</span>.
          </h1>

          <p className="av4-hero__lead">
            Una experiencia guiada en directo para{" "}
            <strong>reconectar con la verdad de tu corazón</strong>, reconocer
            los miedos que te frenan y activar tu poder interior para empezar a
            crear una vida que ames todos los días.
          </p>

          <Av4Horarios compacto />

          {/* Va al pricing, no al checkout: saltar afuera sin ver qué incluye
              ni cuánto cuesta es la fricción que más rebota. */}
          <Av4Cta href="#av4-precio" />

          <div className="av4-prueba">
            <Av4Sello size={64} className="av4-prueba__sello" />
            <span>Guiada en directo por Aida Qui</span>
          </div>
        </div>
      </div>

      <div className="av4-wrap av4-hero__datos">
        <Av4Datos />
      </div>
    </section>
  );
}
