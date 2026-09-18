import { useRef } from "react";
import Image from "next/image";
import FrecuenciaCta from "@/components/frecuencia/FrecuenciaCta";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const entregables = [
  { src: "/activacion/card-1.webp", alt: "Sesión principal en vivo" },
  { src: "/activacion/card-2.webp", alt: "Acompañamiento durante la experiencia" },
  { src: "/activacion/card-3.webp", alt: "Prácticas de integración" },
  { src: "/activacion/card-4.webp", alt: "Materiales de apoyo" },
  { src: "/activacion/card-5.webp", alt: "Comunidad de participantes" },
];

const bonos = [
  { src: "/activacion/card-6.webp", alt: "Activación guiada 1" },
  { src: "/activacion/card-7.webp", alt: "Activación guiada 2" },
];

const MAX_TILT = 6; // grados

export default function RecibirasSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-recibiras"
      aria-labelledby="frec-recibiras-title"
    >
      <div className="frec-recibiras__panel" aria-hidden="true" />

      <div className="frec-shell">
        <h2
          id="frec-recibiras-title"
          className="frec-section-title frec-section-title--on-panel"
          data-reveal="title"
        >
          ¿Qué <em>recibirás</em>?
        </h2>

        <ul className="frec-recibiras__grid" data-reveal-group data-reveal-fade>
          {entregables.map((card, i) => (
            <TiltCard key={i} {...card} index={i} />
          ))}
        </ul>

        <div className="frec-bonus">
          <h3 className="frec-bonus__title" data-reveal>
            Dos activaciones guiadas para integrar después del encuentro
          </h3>

          <ul className="frec-bonus__grid" data-reveal-group data-reveal-fade>
            {bonos.map((card, i) => (
              <TiltCard key={i} {...card} index={i} />
            ))}
          </ul>

          <p className="frec-bonus__body" data-reveal>
            Dos prácticas poderosas para ayudarte a limpiar cargas energéticas,
            recalibrar tu energía y sostener esta nueva etapa de tu vida.
          </p>
        </div>

        <div className="frec-recibiras__cta" data-reveal>
          <FrecuenciaCta variant="gold" />
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);

  function handleMove(e: React.MouseEvent<HTMLLIElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <li
      ref={ref}
      className="frec-tilt-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="frec-tilt-card__inner">
        <span className="frec-tilt-card__num" aria-hidden="true">
          0{index + 1}
        </span>
        {/* Native size is 734x414 — declaring half of it made Next serve a
            downscaled file that the browser then stretched back up */}
        <Image
          src={src}
          alt={alt}
          width={734}
          height={414}
          sizes="(max-width: 700px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="frec-tilt-card__img"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      <div className="frec-tilt-card__spotlight" aria-hidden="true" />
    </li>
  );
}
