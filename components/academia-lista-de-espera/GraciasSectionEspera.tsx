const whatsappGroupUrl = "https://chat.whatsapp.com/JBThHsrH03wJyIAbU4LbpA?mode=gi_t";

const WhatsAppIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.012-1.374l-.36-.214-3.733.977.998-3.645-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

export default function GraciasSectionEspera() {
  return (
    <div className="espera-gracias">
      <div className="espera-gracias__bg" aria-hidden="true" />

      <section className="espera-gracias__shell" aria-labelledby="gracias-espera-title">
        <h1 className="espera-gracias__title" id="gracias-espera-title">
          ¡Estás en la <em>lista de espera!</em>
        </h1>

        <p className="espera-gracias__lead">
          Gracias por unirte. En cuanto abramos las plazas de la próxima edición
          de <strong><em>Academia ADN</em></strong>, serás de las primeras
          personas en enterarte y en poder reservar tu plaza.
        </p>

        <div className="espera-gracias__card">
          <p className="espera-gracias__card-label">PRÓXIMO PASO</p>
          <p className="espera-gracias__card-text">
            Mientras esperas, únete a la comunidad de WhatsApp de Aida Qui. Allí
            recibirás novedades, contenido y serás de las primeras personas en
            saber cuándo abramos las inscripciones para la próxima edición de
            Academia ADN.
          </p>
        </div>

        <a
          href={whatsappGroupUrl}
          className="espera-gracias__cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="espera-gracias__cta-border" aria-hidden="true" />
          <span className="espera-gracias__cta-face">
            <span className="espera-gracias__cta-icon" aria-hidden="true">
              <WhatsAppIcon />
            </span>
            UNIRME A LA COMUNIDAD
          </span>
        </a>
      </section>

      <footer className="espera-gracias__footer">
        <p>
          © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos los
          derechos reservados
        </p>
      </footer>
    </div>
  );
}
