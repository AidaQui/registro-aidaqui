import { useRef } from "react";

const MAX_TILT = 8; // grados

export type LearnItem = {
  icon: React.ReactNode;
  variant: "gold" | "violet";
  text: React.ReactNode;
  /** Si se define, la card muestra esa imagen de fondo con el texto abajo. */
  image?: string;
};

export default function LearnCard({ item }: { item: LearnItem }) {
  const ref = useRef<HTMLLIElement>(null);

  function handleMove(e: React.MouseEvent<HTMLLIElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // posición del mouse normalizada a [-1, 1] desde el centro
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * MAX_TILT).toFixed(2)}deg`);
    // brillo que sigue al cursor
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  // Card con imagen: foto arriba visible, texto apoyado sobre el shadow inferior
  if (item.image) {
    return (
      <li
        ref={ref}
        className="learn-card learn-card--photo"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div
          className="learn-photo"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="learn-photo-shade" aria-hidden="true" />
        <div className="learn-glare" aria-hidden="true" />
        <div className="learn-photo-content">
          <span className="learn-icon">{item.icon}</span>
          <p className="learn-text">{item.text}</p>
        </div>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className={`learn-card learn-card--${item.variant}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="learn-dot" />
      <div className="learn-ray" />
      <div className="learn-glare" aria-hidden="true" />
      <div className="learn-card-inner">
        <span className="learn-icon">{item.icon}</span>
        <p className="learn-text">{item.text}</p>
      </div>
      <div className="learn-line learn-line--top" />
      <div className="learn-line learn-line--left" />
      <div className="learn-line learn-line--bottom" />
      <div className="learn-line learn-line--right" />
    </li>
  );
}
