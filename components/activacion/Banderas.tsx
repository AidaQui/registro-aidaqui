/**
 * Circular flags for the schedule chips, drawn inline.
 *
 * Inline SVG rather than image files: at 18px these are three or four stripes,
 * so a vector stays crisp at any density and costs no extra request. The
 * clipPath is what makes them round without a wrapper.
 *
 * They are simplified on purpose — the stripes and the main charge, no coats
 * of arms. At this size a detailed emblem turns into a smudge, and the flag is
 * recognised by its colours anyway.
 */

import { useId } from "react";

type Props = {
  className?: string;
};

const SIZE = 18;

/**
 * The clipPath id comes from useId, not from a constant: these flags render
 * twice on the page (hero and closing), and two clipPaths sharing an id leave
 * the browser resolving both to whichever came first.
 */
function Marco({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const id = useId();

  return (
    <svg
      className={className}
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={id}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>{children}</g>
      {/* Aro interior: separa la bandera del fondo del chip sin sumar un borde
          al contenedor, que recortaría el círculo. */}
      <circle
        cx="12"
        cy="12"
        r="11.5"
        fill="none"
        stroke="rgba(46, 32, 64, 0.18)"
      />
    </svg>
  );
}

export function BanderaEspana({ className }: Props) {
  return (
    <Marco className={className}>
      <rect width="24" height="24" fill="#AA151B" />
      <rect y="6" width="24" height="12" fill="#F1BF00" />
    </Marco>
  );
}

export function BanderaArgentina({ className }: Props) {
  return (
    <Marco className={className}>
      <rect width="24" height="24" fill="#74ACDF" />
      <rect y="8" width="24" height="8" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="2.4" fill="#F6B40E" />
    </Marco>
  );
}

export function BanderaMexico({ className }: Props) {
  return (
    <Marco className={className}>
      <rect width="24" height="24" fill="#FFFFFF" />
      <rect width="8" height="24" fill="#006847" />
      <rect x="16" width="8" height="24" fill="#CE1126" />
      <circle cx="12" cy="12" r="2.2" fill="#8C6239" />
    </Marco>
  );
}

export function BanderaColombia({ className }: Props) {
  return (
    <Marco className={className}>
      <rect width="24" height="24" fill="#FCD116" />
      <rect y="12" width="24" height="6" fill="#003893" />
      <rect y="18" width="24" height="6" fill="#CE1126" />
    </Marco>
  );
}

/** Keyed by the `pais` value in config.ts. */
export const BANDERAS: Record<string, React.ComponentType<Props>> = {
  España: BanderaEspana,
  Argentina: BanderaArgentina,
  México: BanderaMexico,
  Colombia: BanderaColombia,
};
