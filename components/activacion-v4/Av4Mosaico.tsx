import Image from "next/image";

/** Tira de fotos de Aida entre secciones; sólo imágenes de la propia página. */
const FOTOS = [
  "/activacion-v4/momento-1.jpg",
  "/activacion-v4/contexto.jpg",
  "/activacion-v4/bio-1.jpg",
  "/activacion-v4/bio-3.jpg",
  "/activacion-v4/momento-2.jpg",
  "/activacion-v4/bio-2.jpg",
];

export default function Av4Mosaico() {
  return (
    <div className="av4-mosaico" aria-hidden="true">
      {FOTOS.map((src) => (
        <div key={src} className="av4-mosaico__foto">
          <Image src={src} alt="" fill sizes="20vw" className="av4-cover" />
        </div>
      ))}
    </div>
  );
}
