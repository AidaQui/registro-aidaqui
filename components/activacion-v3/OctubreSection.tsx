import { Sparkles } from "lucide-react";
import FrecuenciaCta from "@/components/activacion-v3/FrecuenciaCta";
import { OCTUBRE } from "@/components/activacion-v3/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Octubre como recorrido, y el 10/10 como su punto central.
 *
 * ── QUÉ SUSTITUYE ──
 *
 * Aquí vivía un bloque largo sobre el cambio de consciencia planetaria. Decía
 * algo cierto pero inverificable y abstracto, y en tráfico frío eso no sostiene
 * una decisión de compra: se lee, se asiente y no mueve nada.
 *
 * Esta sección dice lo concreto que ese bloque rodeaba: octubre tiene cuatro
 * momentos, el encuentro cae en el segundo, y por eso es ese día y no otro.
 * Una razón fechada convence donde una cosmología no llega.
 *
 * ── LA LÍNEA TEMPORAL ──
 *
 * Cuatro hitos en fila. El del 10 va destacado —más grande, con halo y con su
 * rótulo propio— porque es el único que la persona tiene que retener; los otros
 * tres existen para darle contexto, no para competir.
 *
 * En móvil la fila pasa a columna con la línea corriendo en vertical: cuatro
 * hitos en fila a 360px dejarían los rótulos ilegibles.
 *
 * ── LO QUE NO ESTÁ ──
 *
 * No se afirma que el momento "no se repite en nueve años". Es el dato más
 * persuasivo de todo el material y también el único que no podemos explicar
 * todavía, así que queda fuera hasta que el cliente confirme de dónde sale.
 * Una escasez que no se puede sostener cuesta más de lo que suma.
 */

export default function OctubreSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="frec-octubre"
      aria-labelledby="frec-octubre-title"
    >
      {/* El resplandor va detrás de todo y en su propia capa: sobre el panel
          oscuro es lo que hace que la línea temporal se lea como un tramo
          iluminado y no como una tabla. */}
      <div className="frec-octubre__glow" aria-hidden="true" />

      <div className="frec-shell">
        <div className="frec-octubre__intro">
          <h2
            id="frec-octubre-title"
            className="frec-octubre__title"
            data-reveal="title"
          >
            Octubre no es <em>un mes más</em> dentro de este recorrido
            energético.
          </h2>

          <p className="frec-octubre__lead" data-reveal>
            Durante octubre existen cuatro momentos principales.
          </p>
        </div>

        <ol className="frec-octubre__linea" data-reveal-group data-reveal-fade>
          {OCTUBRE.map(({ dia, nombre, protagonista }) => (
            <li
              key={dia}
              className="frec-octubre__hito"
              data-protagonista={protagonista ? "si" : undefined}
            >
              <span className="frec-octubre__punto" aria-hidden="true" />

              <span className="frec-octubre__dia">
                {dia}
                <span className="frec-octubre__mes">/10</span>
              </span>

              <span className="frec-octubre__nombre">{nombre}</span>

              {protagonista && (
                <span className="frec-octubre__sello">
                  <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
                  El encuentro
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="frec-octubre__texto">
          <p data-reveal>
            Dentro del enfoque energético de Aida, estas cuatro fechas contienen
            el <strong>código del 1</strong>: una energía asociada al inicio, la
            decisión y la creación de una nueva dirección.
          </p>

          <p data-reveal>
            Por eso octubre no se vive como un único portal aislado, sino como
            un recorrido que comienza el 1, alcanza uno de sus puntos centrales
            el 10 y continúa desarrollándose hasta el 28.
          </p>
        </div>

        {/* El remate en su propia caja: es el punto donde el recorrido de
            octubre y la experiencia dejan de ser dos temas y pasan a ser uno.
            Suelto entre los párrafos anteriores se leería como un tercero. */}
        <div className="frec-octubre__remate" data-reveal>
          <p className="frec-octubre__remate-fuerte">
            La Activación del Ser Multidimensional sucede en el{" "}
            <em>corazón de ese proceso</em>.
          </p>

          <p className="frec-octubre__remate-texto">
            Durante el encuentro trabajaremos para liberar desorden interno y
            preparar tu sistema mental, emocional, físico y energético para
            atravesar conscientemente el resto del recorrido de octubre.
          </p>
        </div>

        {/* La preparación previa va aparte y en menor peso: es un entregable,
            no parte del argumento de por qué octubre importa. Mezclado arriba
            diluiría el remate; aquí funciona como el último empujón antes del
            botón. */}
        <div className="frec-octubre__previa" data-reveal>
          <p className="frec-octubre__previa-titulo">
            Tu preparación comienza antes del encuentro.
          </p>
          <p className="frec-octubre__previa-texto">
            Desde el momento en que te registras, comenzaremos a acompañarte
            para preparar tu energía y llegar al 10/10 con mayor consciencia,
            claridad y dirección.
          </p>
        </div>

        <div className="frec-octubre__cta" data-reveal>
          <FrecuenciaCta
            variant="gold"
            href="#frec-precio-title"
            label="Quiero vivir la Activación"
          />
        </div>
      </div>
    </section>
  );
}
