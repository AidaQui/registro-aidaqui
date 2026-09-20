import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Inclinación máxima de la foto, en grados. */
const MAX_TILT = 9;

export default function SobreAida() {
  const ref = useScrollReveal<HTMLElement>();

  /*
   * LA FOTO SIGUE AL PUNTERO.
   *
   * Sustituye al zoom que tenía: ampliar la imagen recortaba el encuadre y se
   * comía las líneas del diseño. Inclinarla no toca el recorte, sólo la gira.
   *
   * Los ángulos viajan como variables CSS y no como transform en línea para
   * que la regla decida cómo se componen: así el reveal de entrada puede usar
   * su propio transform sin que uno pise al otro.
   */
  function inclinar(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * MAX_TILT).toFixed(2)}deg`);
  }

  function enderezar(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <section ref={ref} className="frec-aida" aria-labelledby="frec-aida-title">
      <div className="frec-shell frec-aida__shell">
        {/* La foto entra desde la izquierda y el texto desde la derecha: es la
            única sección con dos columnas, y hacerlas converger dice que son
            una sola pieza. En el resto de la página todo sigue entrando desde
            abajo, que es lo que acompaña al scroll. */}
        <div
          className="frec-aida__media"
          data-reveal="left"
          onMouseMove={inclinar}
          onMouseLeave={enderezar}
        >
          {/* Native size is 870x1068 */}
          <Image
            src="/lista-de-espera/aida.webp"
            alt="Aida Qui"
            width={870}
            height={1068}
            sizes="(max-width: 1023px) 80vw, 420px"
            quality={90}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <div className="frec-aida__copy">
          <p className="frec-aida__eyebrow" data-reveal="right">
            ¿Quién guiará esta experiencia?
          </p>

          <h2 id="frec-aida-title" className="frec-aida__name" data-reveal="title">
            AIDA QUI
          </h2>

          <div className="frec-aida__body" data-reveal="right">
            <p>
              Aida Qui es una de las referentes más reconocidas en transformación
              energética y espiritualidad práctica en habla hispana.
            </p>
            <p>
              Es creadora de la <em>Academia ADN</em>, un movimiento y escuela de
              transformación diseñado para ayudar a las personas a elevar su
              consciencia, vivir desde una mayor coherencia y transformar todas
              las áreas de su vida.
            </p>
            <p>
              Durante años ha acompañado a miles de personas en procesos de
              transformación profunda, ayudándolas a cambiar su realidad desde la
              raíz: su energía, su identidad y la forma en la que habitan su
              vida.
            </p>
            <p>
              Su trabajo une espiritualidad práctica, maestría energética,
              sistema emocional y transformación profunda para ayudar a las
              personas a dejar atrás viejas versiones de sí mismas y comenzar a
              vivir desde una frecuencia más auténtica, consciente y alineada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
