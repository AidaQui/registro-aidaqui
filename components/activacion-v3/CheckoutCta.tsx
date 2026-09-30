import { CHECKOUT_URL } from "@/components/activacion-v3/config";

type Props = {
  /** "gold" para los CTA que van sobre panel violeta. */
  variant?: "violet" | "gold";
  label: string;
  className?: string;
};

/**
 * El botón que lleva al checkout, sólo para la página puente.
 *
 * ── POR QUÉ NO ES FrecuenciaCta ──
 *
 * Comparte su aspecto —las mismas clases pearl, el mismo dorado— pero no su
 * destino ni su comportamiento: FrecuenciaCta apunta a LINKS.registro, que es
 * el redirector de la landing, y este apunta al checkout, que todavía no
 * existe. Meter los dos casos en un componente obligaría a que el de la
 * landing cargue con la rama del botón deshabilitado, que allí no puede pasar.
 *
 * ── MIENTRAS NO HAYA URL ──
 *
 * Se renderiza como <button disabled> en vez de como enlace. No es un
 * placeholder olvidable: es visible en la página y no se puede pulsar, así
 * que la falta se nota antes de publicar en vez de mandar gente a ninguna
 * parte. Al cargar CHECKOUT_URL pasa a <a> solo.
 */
export default function CheckoutCta({
  variant = "violet",
  label,
  className = "",
}: Props) {
  const classes = [
    "pearl-btn",
    "frec-cta",
    variant === "gold" ? "frec-cta--gold" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contenido = (
    <div className="pearl-wrap">
      <p>
        <span className="pearl-star" aria-hidden="true">
          ✦
        </span>
        {label}
        <span className="pearl-star" aria-hidden="true">
          ✦
        </span>
      </p>
    </div>
  );

  if (!CHECKOUT_URL) {
    return (
      <button
        type="button"
        className={`${classes} frec-cta--pendiente`}
        disabled
        aria-describedby="checkout-pendiente"
      >
        {contenido}
      </button>
    );
  }

  return (
    <a
      href={CHECKOUT_URL}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      {contenido}
    </a>
  );
}
