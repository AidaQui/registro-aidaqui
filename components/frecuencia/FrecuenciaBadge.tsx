type Props = {
  children?: React.ReactNode;
};

export default function FrecuenciaBadge({
  children = "FRECUENCIA ORIGINAL",
}: Props) {
  return (
    <span className="frec-badge">
      <span className="frec-badge__inner">
        <span className="frec-badge__logo" aria-hidden="true">
          <span className="frec-badge__pulse" />
          {/* SVG/PNG mark kept as native img: next/image adds no value at 26px */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.png" alt="" width={26} height={26} />
        </span>
        {children}
      </span>
    </span>
  );
}
