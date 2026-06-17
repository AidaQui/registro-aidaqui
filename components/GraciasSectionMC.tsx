import Image from "next/image";

// TODO: reemplazar por el chat/grupo de WhatsApp real de la masterclass.
// Para chat directo: https://wa.me/<codpais><numero>?text=<mensaje url-encoded>
// Para grupo: el link de invitación de WhatsApp.
const whatsappUrl =
  "https://wa.me/0000000000?text=Hola!%20Me%20anot%C3%A9%20a%20la%20masterclass%20del%2028%20de%20junio";

const WhatsAppIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.845L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 0 1-5.012-1.374l-.36-.214-3.733.977.998-3.645-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

export default function GraciasSectionMC() {
  return (
    <section className="gracias-section gracias-section--mc" aria-labelledby="gracias-mc-title">
      <div className="gracias-bg" aria-hidden="true" />
      <div className="gracias-overlay" aria-hidden="true" />

      <div className="gracias-shell">
        <Image
          src="/common/logotipo.png"
          alt="Aida Qui"
          width={420}
          height={65}
          className="gracias-logo"
          style={{ width: "100%", maxWidth: 420, height: "auto" }}
          priority
        />

        <h1 className="gracias-title" id="gracias-mc-title">
          ¡Listo! Tu lugar en la{" "}
          <mark className="gracias-highlight">MASTERCLASS GRATUITA</mark> está
          reservado
        </h1>

        <p className="gracias-subtitle">Sólo te falta un paso:</p>

        <p className="gracias-body">
          Unite al WhatsApp para recibir el enlace de acceso a la sesión en vivo
          y los recordatorios antes de que empiece.
        </p>

        <a
          href={whatsappUrl}
          className="pearl-btn gracias-pearl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="pearl-wrap">
            <p>
              <span className="gracias-wa-icon" aria-hidden="true"><WhatsAppIcon /></span>
              Acceder por WhatsApp
            </p>
          </div>
        </a>

        <div className="gracias-rule" aria-hidden="true">
          <span className="gracias-rule__line" />
          <span className="gracias-rule__gem">✦</span>
          <span className="gracias-rule__line" />
        </div>

        <div className="gracias-date">
          <p className="gracias-date__label">La masterclass es el:</p>
          <p className="gracias-date__value">28 de junio · online por Zoom</p>
        </div>
      </div>
    </section>
  );
}
