import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMarquee } from "@/hooks/useMarquee";
import TestimonialModal from "@/components/academia-lista-de-espera/TestimonialModal";
import {
  testimonials,
  getInitials,
  type Testimonial,
} from "@/components/academia-lista-de-espera/testimonials-data";

export default function TestimonialsSection() {
  const ref = useScrollReveal<HTMLElement>();
  const trackRef = useMarquee<HTMLDivElement>();
  const [active, setActive] = useState<Testimonial | null>(null);

  return (
    <>
      <section ref={ref} className="testi testi-espera" aria-labelledby="testi-title">
        <div className="testi-shell">
          <h2 id="testi-title" className="testi-espera__title" data-reveal="title">
            Esto es lo que cuentan quienes ya atravesaron{" "}
            <em>Academia ADN</em>.
          </h2>

          <img
            src="/lista-de-espera/testimonios/trutspilot.png"
            alt="TrustScore 4,9 sobre 5 en base a 82 opiniones"
            width={480}
            height={290}
            className="testi-trustpilot"
            data-reveal
          />
        </div>

        {/* Marquee a ancho completo: la fila se duplica para que el bucle
            no tenga corte visible al reiniciarse. */}
        <div className="testi-marquee" data-reveal>
          <div className="testi-marquee__track" ref={trackRef}>
            {[...testimonials, ...testimonials].map((item, i) => {
              const isClone = i >= testimonials.length;

              return (
                <article
                  className="testi-card"
                  key={`${item.name}-${i}`}
                  aria-hidden={isClone}
                >
                  <div className="testi-card__head">
                    <span className="testi-card__avatar" aria-hidden="true">
                      {item.avatar ? (
                        <img
                          src={`/lista-de-espera/testimonios/${encodeURIComponent(
                            item.avatar
                          )}`}
                          alt=""
                          width={48}
                          height={48}
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        getInitials(item.name)
                      )}
                    </span>

                    <span className="testi-card__who">
                      <span className="testi-card__name">{item.name}</span>
                      <span className="testi-card__meta">
                        {item.country} · {item.date}
                      </span>
                    </span>
                  </div>

                  <img
                    src="/lista-de-espera/stars-5.svg"
                    alt="5 de 5 estrellas"
                    width={116}
                    height={20}
                    className="testi-card__stars"
                    loading="lazy"
                    draggable={false}
                  />

                  <h3 className="testi-card__title">{item.title}</h3>

                  <p className="testi-card__text">{item.body}</p>

                  <button
                    type="button"
                    className="testi-card__more"
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
      </section>

      <TestimonialModal testimonial={active} onClose={() => setActive(null)} />
    </>
  );
}
