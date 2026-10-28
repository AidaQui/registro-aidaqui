import Image from "next/image";
import {
  Check,
  Compass,
  Flower2,
  ListChecks,
  Radio,
  ShieldCheck,
  Sparkles,
  Tag,
  Video,
} from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Prueba from "@/components/activacion-v4/Av4Prueba";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import { EVENTO, LINKS, PRECIO } from "@/components/activacion-v4/config";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Precio con el diseño de la referencia: lo incluido a ambos lados y, en el
 * centro, una entrada troquelada (muesca arriba, medias lunas a los lados,
 * línea de perforación y código de barras decorativo). Sin logos de pago
 * inventados: sólo lo que es cierto. En móvil la entrada va primero.
 */

/** Icono de cada tarjeta del bento, en el orden de `precio.incluye`. */
const ICONOS_BENTO = [Video, Sparkles, Compass, Radio, ListChecks, Flower2];

function Lista({ items, lado }: { items: string[]; lado: "izq" | "der" }) {
  return (
    <ul className={`av4-pr__lado av4-pr__lado--${lado}`} data-reveal-group data-reveal-fade>
      {items.map((t) => (
        <li key={t}>
          <span className="av4-pr__ico" aria-hidden="true">
            <Check size={18} strokeWidth={2.6} />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Av4Precio() {
  const ref = useScrollReveal<HTMLElement>();
  const { precio: c, ctaCompra, disenio } = useContenido();
  const bento = disenio?.precio?.tipo === "bento" ? disenio.precio.fotos : null;
  const polaroid = disenio?.precio?.tipo === "polaroid" ? disenio.precio.fotos : null;
  const enTarjetas = !!(bento || polaroid);
  const monto = PRECIO.actual.replace(/€/g, "").trim();
  const moneda = PRECIO.actual.includes("€") ? "€" : "";

  return (
    <section
      ref={ref}
      id="av4-precio"
      className="av4-sec av4-sec--oscuro av4-precio"
      aria-labelledby="av4-precio-title"
    >
      <div className="av4-wrap">
        <div className="av4-head" data-reveal>
          <h2 id="av4-precio-title" className="av4-title">
            {c.titular(monto)}
          </h2>
        </div>

        {polaroid && (
          <>
            {/* "Polaroid": cada frase de lo incluido al pie de su foto instantánea, ligeramente inclinada. */}
            <ul className="av4-polas" data-reveal-group data-reveal-fade>
              {c.incluye.map((texto, i) => {
                const foto = polaroid[i];
                return (
                  <li key={texto} className="av4-pola">
                    <figure>
                      <span className="av4-pola__cinta" aria-hidden="true" />
                      <span className="av4-pola__foto">
                        {foto && (
                          <Image
                            src={foto.src}
                            alt=""
                            aria-hidden="true"
                            fill
                            sizes="(max-width: 700px) 80vw, (max-width: 1100px) 44vw, 340px"
                            className="av4-cover"
                            style={{ objectPosition: foto.posicion }}
                          />
                        )}
                      </span>
                      <figcaption>
                        <span className="av4-pola__n" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {texto}
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>

            {/* Nota de precio en línea sobre la entrada: sello con filetes, sin banda. */}
            <p className="av4-nota-precio" data-reveal>
              <span>
                {c.sellos.unico} · {PRECIO.actual}
              </span>
            </p>
          </>
        )}

        {bento && (
          <>
            {/* "Bento": lo incluido en tarjetas (unas con foto, otras con icono) y la banda de precio. */}
            <ul className="av4-bento" data-reveal-group data-reveal-fade>
              {c.incluye.map((texto, i) => {
                const foto = bento[i];
                const Icono = ICONOS_BENTO[i % ICONOS_BENTO.length];
                const retrato = foto?.formato === "retrato";
                return (
                  <li
                    key={texto}
                    className={`av4-bento__card${foto ? " av4-bento__card--foto" : ""}${retrato ? " av4-bento__card--retrato" : ""}`}
                  >
                    {foto && retrato && (
                      /* Tarjeta compuesta: textura dorada detrás y la foto en un círculo enmarcado. */
                      <span className="av4-bento__retrato" aria-hidden="true">
                        <Image
                          src={foto.src}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="(max-width: 700px) 112px, 190px"
                          className="av4-cover"
                          style={{ objectPosition: foto.posicion }}
                        />
                      </span>
                    )}
                    {foto && !retrato && (
                      <Image
                        src={foto.src}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 380px"
                        className="av4-cover"
                        style={{ objectPosition: foto.posicion }}
                      />
                    )}
                    <span className="av4-bento__ico" aria-hidden="true">
                      <Icono size={20} strokeWidth={1.8} />
                    </span>
                    <span className="av4-bento__txt">{texto}</span>
                  </li>
                );
              })}
            </ul>

            <div className="av4-banda" data-reveal>
              <span>
                {c.sellos.unico} · {PRECIO.actual}
              </span>
            </div>
          </>
        )}

        {disenio?.prueba === "precio" && (
          <div className="av4-prueba-fila" data-reveal>
            <Av4Prueba className="av4-prueba--precio" />
          </div>
        )}

        <div className={`av4-pr${enTarjetas ? " av4-pr--bento" : ""}`}>
          {!enTarjetas && <Lista items={c.incluye.slice(0, 3)} lado="izq" />}

          <div className="av4-tk" data-reveal>
            <div className="av4-tk__forma">
              <div className="av4-tk__arriba">
                <Av4Lockup tamano="grande" sello className="av4-lockup--centro" />
                <span className="av4-tk__pildora">{PRECIO.nota}</span>
              </div>

              <div className="av4-tk__perf" aria-hidden="true" />

              <div className="av4-tk__abajo">
                {PRECIO.tachado && (
                  <span className="av4-tk__tachado">{PRECIO.tachado}</span>
                )}
                <span className="av4-tk__todo">{c.todoPor}</span>
                <span className="av4-tk__precio">
                  <span className="av4-tk__monto">{monto}</span>
                  <span className="av4-tk__moneda">{moneda}</span>
                </span>

                {/* El único botón que sale de la página: aquí se paga, con lo
                    que incluye y cuánto cuesta a la vista. */}
                <Av4Cta
                  href={LINKS.registro}
                  label={ctaCompra}
                  className="av4-cta--bloque"
                  ubicacion="precio"
                />

                <ul className="av4-sellos">
                  <li>
                    <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />
                    {c.sellos.seguro}
                  </li>
                  <li>
                    <Tag size={15} strokeWidth={1.8} aria-hidden="true" />
                    {c.sellos.unico}
                  </li>
                  <li>
                    <Video size={15} strokeWidth={1.8} aria-hidden="true" />
                    {EVENTO.formato}
                  </li>
                </ul>
              </div>

              <div className="av4-barras" aria-hidden="true" />
            </div>
          </div>

          {!enTarjetas && <Lista items={c.incluye.slice(3)} lado="der" />}
        </div>
      </div>
    </section>
  );
}
