export default function HeroSectionADN() {
  return (
    <section className="hero-adn" aria-labelledby="hero-adn-title">
      <picture className="hero-adn-bg" aria-hidden="true">
        <source
          media="(max-width: 600px)"
          srcSet="/academia/background-1-mobile.jpg"
          width={960}
          height={1500}
        />
        <img
          src="/academia/background-1.jpg"
          alt=""
          width={1920}
          height={700}
          fetchPriority="high"
        />
      </picture>
      <div className="hero-adn-glow" aria-hidden="true" />

      <div className="hero-adn-shell">
        <div className="hero-adn-copy">

          <span className="hero-adn-urgency">
            <span className="hero-adn-urgency__dot" aria-hidden="true" />
            OFERTA DISPONIBLE SOLO HASTA AGOTARSE LAS PLAZAS
          </span>

          <div className="hero-adn-brand">
            <p className="hero-adn-brand__name">ACADEMIA ADN:</p>
            <p className="hero-adn-brand__tagline">ALINEAMIENTO DIVINO NATURAL</p>
          </div>

          <h1 id="hero-adn-title" className="hero-adn-title">
            6 SEMANAS PARA ORDENAR TU ENERGÍA Y CREAR{" "}
            <em className="hero-adn-title__accent">RESULTADOS REALES</em>
          </h1>

          <p className="hero-adn-lead">
            Un entrenamiento experiencial para integrar tu espiritualidad, tomar
            decisiones claras y sostener coherencia en salud, relaciones,
            propósito y abundancia.
          </p>

          <a href="#precio" className="hero-adn-cta">
            <span className="hero-adn-cta__star" aria-hidden="true">✦</span>
            ACCEDER AHORA
            <span className="hero-adn-cta__star" aria-hidden="true">✦</span>
          </a>

        </div>
      </div>
    </section>
  );
}
