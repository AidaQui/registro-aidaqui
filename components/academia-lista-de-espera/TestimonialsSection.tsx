import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMarquee } from "@/hooks/useMarquee";

const images = [
  "/testimonios/testimonio-01.webp",
  "/testimonios/testimonio-02.webp",
  "/testimonios/testimonio-03.webp",
  "/testimonios/testimonio-04.png",
  "/testimonios/testimonio-05.png",
  "/testimonios/testimonio-06.jpg",
  "/testimonios/testimonio-07.jpg",
  "/testimonios/testimonio-08.webp",
  "/testimonios/testimonio-09.webp",
  "/testimonios/testimonio-10.png",
  "/testimonios/testimonio-11.webp",
  "/testimonios/testimonio-12.png",
  "/testimonios/testimonio-13.jpg",
  "/testimonios/testimonio-14.png",
  "/testimonios/testimonio-15.webp",
  "/testimonios/testimonio-16.webp",
  "/testimonios/testimonio-17.png",
  "/testimonios/testimonio-18.webp",
  "/testimonios/testimonio-19.jpg",
  "/testimonios/testimonio-20.webp",
  "/testimonios/testimonio-21.webp",
  "/testimonios/testimonio-22.jpg",
  "/testimonios/testimonio-23.webp",
  "/testimonios/testimonio-24.webp",
  "/testimonios/testimonio-25.webp",
  "/testimonios/testimonio-26.jpg",
];

export default function TestimonialsSection() {
  const ref = useScrollReveal<HTMLElement>();
  const trackRef = useMarquee<HTMLDivElement>();

  return (
    <section ref={ref} className="testi testi-espera" aria-labelledby="testi-title">
      <div className="testi-shell">
        <h2 id="testi-title" className="testi-espera__title" data-reveal="title">
          Esto es lo que cuentan quienes ya atravesaron{" "}
          <em>Academia ADN</em>.
        </h2>

        <img
          src="/lista-de-espera/trutspilot.png"
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
          {[...images, ...images].map((src, i) => (
            <figure className="testi-marquee__item" key={`${src}-${i}`}>
              <img
                src={src}
                alt={i < images.length ? `Testimonio ${i + 1} sobre la Academia ADN` : ""}
                aria-hidden={i >= images.length}
                loading={i < 4 ? "eager" : "lazy"}
                draggable={false}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
