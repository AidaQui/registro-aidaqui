import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  sizes: string;
  /** Esquina donde asoma el bloque caramelo. */
  bloque?: "sup-izq" | "sup-der" | "ninguno";
  /** Esquina donde se superpone el sello (opcional). */
  sello?: React.ReactNode;
  proporcion?: string;
  className?: string;
  priority?: boolean;
};

/** Foto en marco blanco con un bloque caramelo desplazado detrás de una esquina. */
export default function Av4Marco({
  src,
  alt = "",
  sizes,
  bloque = "sup-der",
  sello,
  proporcion = "4 / 5",
  className = "",
  priority,
}: Props) {
  return (
    <div className={`av4-marco av4-marco--${bloque} ${className}`.trim()}>
      <div className="av4-marco__foto" style={{ aspectRatio: proporcion }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="av4-cover"
        />
      </div>
      {sello}
    </div>
  );
}
