import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";

type Props = {
  onOpenForm: () => void;
};

export default function HeroSectionEspera({ onOpenForm }: Props) {
  return (
    <section className="espera-hero" aria-labelledby="hero-espera-title">
      <div className="espera-hero__bg" aria-hidden="true" />

      <div className="espera-hero__shell">
        <div className="espera-hero__copy">
          <AcademiaBadge />

          <h1 id="hero-espera-title" className="espera-hero__title">
            EL CONOCIMIENTO ABRE PUERTAS.
            <br />
            PERO EN LA INTEGRACIÓN ESTÁ LA{" "}
            <em className="espera-hero__accent">TRANSFORMACIÓN</em>.
          </h1>

          <p className="espera-hero__lead">
            Un entrenamiento para recordar quién eres más allá de tus patrones,
            recuperar tu poder y aprender a vivir desde tu verdadero Ser.
          </p>

          <button type="button" className="pearl-btn espera-cta" onClick={onOpenForm}>
            <div className="pearl-wrap">
              <p>
                <span className="pearl-star" aria-hidden="true">✦</span>
                QUIERO ACCEDER A LA LISTA
                <span className="pearl-star" aria-hidden="true">✦</span>
              </p>
            </div>
          </button>

          <p className="espera-hero__note">
            Plazas limitadas · Acceso anticipado y condiciones especiales
          </p>
        </div>

        <div className="espera-hero__media">
          <img
            src="/lista-de-espera/aida.png"
            alt="Aida Qui"
            width={870}
            height={1080}
            className="espera-hero__img"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
