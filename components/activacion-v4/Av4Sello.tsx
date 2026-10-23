import Image from "next/image";

type Props = {
  className?: string;
  /** Lado en píxeles de la imagen que se pide (el archivo mide ~500). */
  size?: number;
};

/** El sello de cera morado con el árbol de la vida dorado (/favicon.png). */
export default function Av4Sello({ className = "", size = 120 }: Props) {
  return (
    <Image
      src="/favicon.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`av4-sello ${className}`.trim()}
    />
  );
}
