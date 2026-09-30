type Props = {
  /** Icon shown before the label, at 15px to match the cap height. */
  icono?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Small pill with a rotating gold border.
 *
 * It used to carry the site favicon as a logo mark. That slot now takes an
 * icon describing the datum itself — a screen for the live format, a calendar
 * for the date — which says more in the same space than the logo did on a page
 * that is already branded.
 */
export default function FrecuenciaBadge({ icono, children }: Props) {
  return (
    <span className="frec-badge">
      <span className="frec-badge__inner">
        {icono && (
          <span className="frec-badge__icono" aria-hidden="true">
            {icono}
          </span>
        )}
        {children}
      </span>
    </span>
  );
}
