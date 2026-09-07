type Props = {
  title: React.ReactNode;
  note?: React.ReactNode;
  label: string;
  onOpenForm: () => void;
  /** "light" sobre fondo claro, "dark" sobre panel violeta */
  variant?: "light" | "dark";
};

/**
 * Bloque de decisión: el CTA deja de ser un botón suelto entre secciones
 * y pasa a ser un momento con titular y refuerzo propios.
 */
export default function CtaBlock({
  title,
  note,
  label,
  onOpenForm,
  variant = "light",
}: Props) {
  return (
    <div className={`cta-block cta-block--${variant}`} data-reveal>
      <p className="cta-block__title">{title}</p>

      <button type="button" className="pearl-btn espera-cta" onClick={onOpenForm}>
        <div className="pearl-wrap">
          <p>
            <span className="pearl-star" aria-hidden="true">✦</span>
            {label}
            <span className="pearl-star" aria-hidden="true">✦</span>
          </p>
        </div>
      </button>

      {note && <p className="cta-block__note">{note}</p>}
    </div>
  );
}
