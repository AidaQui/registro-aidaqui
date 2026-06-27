import {
  Video,
  Users,
  PlayCircle,
  Sparkles,
  MessageCircleHeart,
  Coins,
  HeartHandshake,
  Activity,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type IncludedItem = {
  icon: React.ReactNode;
  text: React.ReactNode;
  bonus?: boolean;
};

const items: IncludedItem[] = [
  {
    icon: <Video size={22} strokeWidth={2} aria-hidden="true" />,
    text: <>10 sesiones en vivo de 2 hrs con AIDA</>,
  },
  {
    icon: <Users size={22} strokeWidth={2} aria-hidden="true" />,
    text: <>Acceso a comunidad privada durante el proceso de 6 semanas</>,
  },
  {
    icon: <PlayCircle size={22} strokeWidth={2} aria-hidden="true" />,
    text: <>Acceso durante 6 meses a +20Hrs de grabaciones</>,
  },
  {
    icon: <Sparkles size={22} strokeWidth={2} aria-hidden="true" />,
    text: <>Herramientas prácticas para integrar tu espiritualidad</>,
  },
  {
    icon: <MessageCircleHeart size={22} strokeWidth={2} aria-hidden="true" />,
    text: <>Acceso a soporte privado durante el proceso</>,
  },
  {
    icon: <Coins size={22} strokeWidth={2} aria-hidden="true" />,
    text: <>Masterclass Bonus libertad financiera</>,
    bonus: true,
  },
  {
    icon: <HeartHandshake size={22} strokeWidth={2} aria-hidden="true" />,
    text: <>Masterclass bonus libertad de amar</>,
    bonus: true,
  },
  {
    icon: <Activity size={22} strokeWidth={2} aria-hidden="true" />,
    text: <>Masterclass Bonus balance energía interna</>,
    bonus: true,
  },
];

export default function IncludedSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="included" aria-labelledby="included-title">
      <div className="included-bg" aria-hidden="true" />

      <div className="included-shell">
        <p className="included-eyebrow" data-reveal>
          Lo que incluye
        </p>
        <h2 id="included-title" className="included-title" data-reveal="title">
          Esto es lo que <em>obtendrás</em>
        </h2>

        <ul className="included-list" data-reveal-group data-reveal-fade>
          {items.map((item, i) => (
            <li
              key={i}
              className={`included-item${item.bonus ? " included-item--bonus" : ""}`}
            >
              <span className="included-item__icon" aria-hidden="true">
                {item.icon}
              </span>
              <p className="included-item__text">
                {item.bonus && <span className="included-item__tag">Bonus</span>}
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
