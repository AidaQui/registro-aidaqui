import { BookOpen, Brain, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const knowledge = [
  {
    icon: <BookOpen size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: <>Sabes qué deberías hacer.</>,
  },
  {
    icon: <Brain size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: <>Entiendes tus patrones.</>,
  },
  {
    icon: <Zap size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: <>Conoces la teoría.</>,
  },
];

type Props = {
  onOpenForm: () => void;
};

export default function GapSection({ onOpenForm }: Props) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="gap-section" aria-labelledby="gap-title">
      <div className="gap-section__bg" aria-hidden="true" />

      <div className="gap-shell">
        {/* Intro centrada: titular y bajada apilados */}
        <div className="gap-intro">
          <h2 id="gap-title" className="gap-intro__title" data-reveal="title">
            Después de ADN, dejarás de buscar fuera las respuestas que{" "}
            <em>solo puedes encontrar dentro</em>.
          </h2>

          <p className="gap-intro__text" data-reveal>
            Quizás llevas años leyendo, meditando, haciendo cursos, terapia o
            trabajando en ti.
          </p>
        </div>

        {/* Las tres certezas, en fila: icono · número · texto */}
        <ul className="gap-cards" data-reveal-group data-reveal-fade>
          {knowledge.map((item, i) => (
            <li key={i} className="gap-card">
              <span className="gap-card__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="gap-card__num" aria-hidden="true">
                0{i + 1}
              </span>
              <p className="gap-card__text">{item.text}</p>
            </li>
          ))}
        </ul>

        {/* El giro: rompe la grilla a ancho completo */}
        <div className="gap-twist" data-reveal>
          <span className="gap-twist__label">Y sin embargo</span>
          <p className="gap-twist__text">
            Cuando la vida te pone a prueba, vuelves a reaccionar desde{" "}
            <em>los mismos lugares</em>.
          </p>
        </div>

        {/* Cierre: remate + explicación, alineados a la izquierda */}
        <div className="gap-close">
          <p className="gap-close__emphasis" data-reveal="title">
            Porque comprender algo no significa haberlo integrado.
          </p>

          <div className="gap-close__body" data-reveal>
            <p>
              Academia ADN nace para cerrar esa distancia entre lo que ya sabes y
              la forma en la que realmente vives.
            </p>
            <p>
              Para que todo ese conocimiento deje de existir únicamente en tu
              mente y puedas empezar a encarnarlo en tu día a día.
            </p>
          </div>

          <button
            type="button"
            className="pearl-btn espera-cta gap-close__cta"
            onClick={onOpenForm}
            data-reveal
          >
            <div className="pearl-wrap">
              <p>
                <span className="pearl-star" aria-hidden="true">✦</span>
                QUIERO ACCEDER
                <span className="pearl-star" aria-hidden="true">✦</span>
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
