import { useRef } from "react";
import { KeyRound, BadgePercent, Gift } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CtaBlock from "@/components/academia-lista-de-espera/CtaBlock";

type Benefit = {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
};

const benefits: Benefit[] = [
  {
    icon: <KeyRound size={26} strokeWidth={1.8} aria-hidden="true" />,
    title: "Acceso anticipado",
    text: (
      <>
        Entérate antes que nadie de la próxima apertura y ten prioridad para
        conseguir una de las plazas.
      </>
    ),
  },
  {
    icon: <BadgePercent size={26} strokeWidth={1.8} aria-hidden="true" />,
    title: "Mejores condiciones",
    text: (
      <>
        Accede a condiciones y precio especiales antes de la apertura al público.
      </>
    ),
  },
  {
    icon: <Gift size={26} strokeWidth={1.8} aria-hidden="true" />,
    title: "Regalos y bonos especiales",
    text: (
      <>
        Recibe regalos y bonos exclusivos por formar parte de la lista de espera.
      </>
    ),
  },
];

const MAX_TILT = 6; // grados

type Props = {
  onOpenForm: () => void;
};

export default function WaitlistBenefitsSection({ onOpenForm }: Props) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="transform benefits-section" aria-labelledby="benefits-title">
      <div className="benefits-section__panel" aria-hidden="true" />

      <div className="transform-shell">
        <h2 id="benefits-title" className="transform-title" data-reveal="title">
          ¿Por qué entrar a la <em>lista de espera</em> de ADN?
        </h2>

        <ul className="transform-grid" data-reveal-group data-reveal-fade>
          {benefits.map((benefit, i) => (
            <BenefitCard key={i} benefit={benefit} index={i} />
          ))}
        </ul>

        <div className="s5-cta">
          <CtaBlock
            variant="dark"
            title={
              <>
                Las plazas de cada edición <em>se agotan rápido</em>
              </>
            }
            note="Entrar en la lista no te compromete a nada"
            label="QUIERO ACCEDER A LA LISTA"
            onOpenForm={onOpenForm}
          />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
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
          {benefit.icon}
        </span>
        <p className="espera-benefit__title">{benefit.title}</p>
        <p className="transform-card__text">{benefit.text}</p>
      </div>
      <div className="transform-card__spotlight" aria-hidden="true" />
    </li>
  );
}
