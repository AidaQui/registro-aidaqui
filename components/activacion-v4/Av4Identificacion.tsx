import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Identificación: título centrado y seis tarjetas con icono. Cada afirmación
 * del cliente se parte en su primera cláusula (título) y el resto (texto),
 * sin añadir palabras. El copy vive en contenido.tsx.
 */

/**
 * Parte una frase en su primera cláusula (hasta la primera coma o dos puntos,
 * que se quita del título) y el resto, sin tocar ni añadir palabras. Si no hay
 * coma, todo va como texto y el título queda vacío.
 */
function partir(frase: string): { titulo: string; texto: string } {
  const corte = frase.search(/[,:]/);
  if (corte < 1) return { titulo: "", texto: frase };
  return {
    titulo: frase.slice(0, corte).trim(),
    texto: frase.slice(corte + 1).trim(),
  };
}

export default function Av4Identificacion() {
  const ref = useScrollReveal<HTMLElement>();
  const { identificacion: c, ctaCompra, disenio } = useContenido();
  const conTitulos = disenio?.paraTi === "titulos";
  const cronologia = disenio?.paraTi === "cronologia" && !!c.items;
  // Las landings por área traen frases enteras (`items`); v4, título + texto.
  const tarjetas = c.items
    ? c.items.map(partir)
    : c.senales.map(({ titulo, texto }) => ({
        titulo: titulo.replace(/[,:]\s*$/, ""),
        texto,
      }));

  return (
    <section
      ref={ref}
      className="av4-sec av4-sec--claro av4-ident"
      aria-labelledby="av4-ident-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <Av4Tag>{c.etiqueta}</Av4Tag>
          <h2 id="av4-ident-title" className="av4-title">
            {c.titular}
          </h2>
          <p className="av4-texto">{c.texto}</p>
        </div>

        {cronologia && c.items ? (
          /* "Cronología": una fila por frase, con numeral grande sobre una línea vertical. */
          <ol className="av4-crono" data-reveal-group data-reveal-fade>
            {c.items.map((texto, i) => (
              <li key={texto} className="av4-crono__fila">
                <span className="av4-crono__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="av4-crono__nodo" aria-hidden="true" />
                <p>{texto}</p>
              </li>
            ))}
          </ol>
        ) : conTitulos ? (
          /* "Tarjetas con título": sin números; la primera cláusula, en el color de acento. */
          <ul
            className="av4-cards av4-cards--titulos"
            data-reveal-group
            data-reveal-fade
          >
            {tarjetas.map(({ titulo, texto }) => (
              <li key={texto} className="av4-tit">
                {titulo && <h3>{titulo}</h3>}
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        ) : c.items ? (
          /* Landings por área: cada tarjeta lleva su número grande y la frase entera. */
          <ul
            className="av4-cards av4-cards--num"
            data-reveal-group
            data-reveal-fade
          >
            {c.items.map((texto, i) => (
              <li key={texto} className="av4-card">
                <div className="av4-card__in">
                  <span className="av4-num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{texto}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="av4-cards" data-reveal-group data-reveal-fade>
            {c.senales.map(({ titulo, texto }, i) => (
              <li key={titulo} className="av4-card">
                <div className="av4-card__in">
                  <span className="av4-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div
          className={`av4-pie-fila${conTitulos ? " av4-pie-fila--ancho" : ""}${cronologia ? " av4-pie-fila--crono" : ""}`}
          data-reveal
        >
          <p>{c.cierre}</p>
          <Av4Cta href="#av4-precio" label={ctaCompra} />
        </div>
      </div>
    </section>
  );
}
