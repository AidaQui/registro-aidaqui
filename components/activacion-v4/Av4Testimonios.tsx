/* eslint-disable @next/next/no-img-element -- mismas imágenes servidas tal cual que en /lista-de-espera */
import { useState } from "react";
import { scrollSuaveA } from "@/components/academia-lista-de-espera/SmoothScroll";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMarquee } from "@/hooks/useMarquee";
import Av4Tag from "@/components/activacion-v4/Av4Tag";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import TestimonialModal from "@/components/academia-lista-de-espera/TestimonialModal";
import {
  testimonials as todosLosTestimonios,
  getInitials,
  type Testimonial,
} from "@/components/academia-lista-de-espera/testimonials-data";

/**
 * Opiniones reales de alumnas de Academia ADN (los mismos datos y pop-up que
 * /lista-de-espera). NO son de esta activación, y el titular lo dice así.
 * El modal se estiliza bajo .av4-modal-scope (ver globals.css).
 */
/* El evento ya no se llama "Activación del Corazón": la opinión que lo nombra
   así es real y no se edita, así que en estas landings no se muestra. */
const testimonials = todosLosTestimonios.filter(
  (t) => !/activaci[oó]n del coraz[oó]n/i.test(t.body),
);

export default function Av4Testimonios() {
  const ref = useScrollReveal<HTMLElement>();
  const trackRef = useMarquee<HTMLDivElement>();
  const { testimonios: c, disenio } = useContenido();
  const [active, setActive] = useState<Testimonial | null>(null);
  // "Muro": en móvil se ven las primeras y un botón despliega el resto.
  const muro = disenio?.testimonios === "muro";
  const [todos, setTodos] = useState(false);

  /* "Ver menos": pliega el muro y vuelve al inicio de la sección para que quien
     lee no quede perdido en medio de la página, ya más corta. */
  const plegar = () => {
    setTodos(false);
    requestAnimationFrame(() => scrollSuaveA("av4-testimonios"));
  };

  return (
    <>
      <section
        ref={ref}
        id={disenio ? "av4-testimonios" : undefined}
        className="av4-sec av4-sec--rosa av4-testi"
        aria-labelledby="av4-testi-title"
      >
        <div className="av4-wrap">
          <div className="av4-head" data-reveal>
            <Av4Tag>{c.etiqueta}</Av4Tag>
            <h2 id="av4-testi-title" className="av4-title">
              {c.titular}
            </h2>
            <img
              src="/lista-de-espera/testimonios/trutspilot.png"
              alt="TrustScore 4,9 sobre 5 en base a 82 opiniones"
              width={300}
              height={181}
              className="av4-testi__trust"
              loading="lazy"
            />
          </div>
        </div>

        {muro ? (
          <div className="av4-wrap">
            <div
              className={`av4-muro${todos ? " av4-muro--todos" : ""}`}
              data-reveal
            >
              {testimonials.map((item) => (
                <article className="av4-tcard av4-tcard--muro" key={item.name}>
                  <div className="av4-tcard__head">
                    <span className="av4-tcard__avatar" aria-hidden="true">
                      {item.avatar ? (
                        <img
                          src={`/lista-de-espera/testimonios/${encodeURIComponent(
                            item.avatar,
                          )}`}
                          alt=""
                          width={52}
                          height={52}
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        getInitials(item.name)
                      )}
                    </span>
                    <span className="av4-tcard__who">
                      <span className="av4-tcard__name">{item.name}</span>
                      <span className="av4-tcard__meta">
                        {item.country} · {item.date}
                      </span>
                    </span>
                  </div>

                  <img
                    src="/lista-de-espera/stars-5.svg"
                    alt="5 de 5 estrellas"
                    width={116}
                    height={20}
                    className="av4-tcard__stars"
                    loading="lazy"
                    draggable={false}
                  />

                  <h3 className="av4-tcard__title">{item.title}</h3>
                  {/* El largo del texto manda: las tarjetas salen de alturas distintas. */}
                  <p
                    className="av4-tcard__text"
                    style={{
                      WebkitLineClamp:
                        item.body.length < 450 ? 4 : item.body.length < 800 ? 7 : 10,
                    }}
                  >
                    {item.body}
                  </p>

                  <button
                    type="button"
                    className="av4-tcard__more"
                    onClick={() => setActive(item)}
                  >
                    Ver más
                  </button>
                </article>
              ))}
            </div>
            <div className="av4-muro__mas">
              <button
                type="button"
                className="av4-tcard__more"
                aria-expanded={todos}
                onClick={() => (todos ? plegar() : setTodos(true))}
              >
                {todos ? "Ver menos" : "Ver más"}
              </button>
            </div>
          </div>
        ) : (
        <div className="av4-marquee" data-reveal>
          <div className="av4-marquee__track" ref={trackRef}>
            {[...testimonials, ...testimonials].map((item, i) => {
              const isClone = i >= testimonials.length;
              return (
                <article
                  className="av4-tcard"
                  key={`${item.name}-${i}`}
                  aria-hidden={isClone}
                >
                  <div className="av4-tcard__head">
                    <span className="av4-tcard__avatar" aria-hidden="true">
                      {item.avatar ? (
                        <img
                          src={`/lista-de-espera/testimonios/${encodeURIComponent(
                            item.avatar,
                          )}`}
                          alt=""
                          width={52}
                          height={52}
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        getInitials(item.name)
                      )}
                    </span>
                    <span className="av4-tcard__who">
                      <span className="av4-tcard__name">{item.name}</span>
                      <span className="av4-tcard__meta">
                        {item.country} · {item.date}
                      </span>
                    </span>
                  </div>

                  <img
                    src="/lista-de-espera/stars-5.svg"
                    alt="5 de 5 estrellas"
                    width={116}
                    height={20}
                    className="av4-tcard__stars"
                    loading="lazy"
                    draggable={false}
                  />

                  <h3 className="av4-tcard__title">{item.title}</h3>
                  <p className="av4-tcard__text">{item.body}</p>

                  <button
                    type="button"
                    className="av4-tcard__more"
                    onClick={() => setActive(item)}
                    tabIndex={isClone ? -1 : undefined}
                  >
                    Ver más
                  </button>
                </article>
              );
            })}
          </div>
        </div>
        )}
      </section>

      <div className="av4-modal-scope">
        <TestimonialModal
          testimonial={active}
          onClose={() => setActive(null)}
        />
      </div>
    </>
  );
}
