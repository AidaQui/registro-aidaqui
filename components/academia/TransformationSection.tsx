import { useRef } from "react";
import { Flame, Compass, Sprout, Eye, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Card = {
  icon: React.ReactNode;
  text: React.ReactNode;
};

const cards: Card[] = [
  {
    icon: <Flame size={26} strokeWidth={1.8} aria-hidden="true" />,
    text: (
      <>
        Vas a entrenar tu cuerpo físico, emocional, mental y energético para
        alinearte con tu verdad.
      </>
    ),
  },
  {
    icon: <Compass size={26} strokeWidth={1.8} aria-hidden="true" />,
    text: (
      <>
        Vas a integrar herramientas reales para sostener tu bienestar y tu
        frecuencia, incluso en los momentos de caos.
      </>
    ),
  },
  {
    icon: <Sprout size={26} strokeWidth={1.8} aria-hidden="true" />,
    text: (
      <>
        Vas a dejar de acumular información y empezar a vivir desde tu sabiduría
        encarnada.
      </>
    ),
  },
  {
    icon: <Eye size={26} strokeWidth={1.8} aria-hidden="true" />,
    text: (
      <>
        Vas a activar tu intuición, tus dones y tu propósito desde una base
        sólida.
      </>
    ),
  },
  {
    icon: <Users size={26} strokeWidth={1.8} aria-hidden="true" />,
    text: (
      <>
        Vas a sentirte acompañada por una comunidad consciente que eleva,
        sostiene y refleja tu mejor versión.
      </>
    ),
  },
];

const MAX_TILT = 6; // grados

export default function TransformationSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="transform" aria-labelledby="transform-title">
      <div className="transform-bg" aria-hidden="true" />
      <div className="transform-orb transform-orb--gold" aria-hidden="true" />
      <div className="transform-orb transform-orb--violet" aria-hidden="true" />

      <div className="transform-shell">
        <p className="transform-eyebrow" data-reveal>
          Tu proceso
        </p>
        <h2 id="transform-title" className="transform-title" data-reveal="title">
          Lo que vas a <em>vivir</em>
        </h2>

        <ul className="transform-grid" data-reveal-group data-reveal-fade>
          {cards.map((card, i) => (
            <TransformCard key={i} card={card} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TransformCard({ card, index }: { card: Card; index: number }) {
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
      className="transform-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="transform-card__inner">
        <span className="transform-card__num" aria-hidden="true">
          0{index + 1}
        </span>
        <span className="transform-card__icon" aria-hidden="true">
          {card.icon}
        </span>
        <p className="transform-card__text">{card.text}</p>
      </div>
      <div className="transform-card__spotlight" aria-hidden="true" />
    </li>
  );
}
