import { whatsappGroupUrl, WhatsAppIcon, SoporteLink } from "@/components/registro-v3/whatsapp";

// Primera pantalla de /registro-v3/gracias. Reusa la hero de la landing
// (misma foto, mismo velo y mismo comportamiento en mobile) para que el
// paso del formulario a esta página se sienta continuo, y pone arriba de
// todo lo único que falta hacer: entrar al grupo de WhatsApp.
export default function GraciasHero() {
  return (
    <section
      className="hero-section hero-section--mc hero-section--rv3 rv3-gracias"
      aria-labelledby="rv3-gracias-title"
    >
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="rv3-gracias__eyebrow">
            <span aria-hidden="true">✦</span>
            Lugar reservado
            <span aria-hidden="true">✦</span>
          </p>

          <h1 id="rv3-gracias-title" className="rv3-gracias__title">
            ¡Tu inscripción está{" "}
            <em className="rv3-promise__accent">casi completa</em>!
          </h1>

          <div
            className="rv3-gracias__progress"
            role="progressbar"
            aria-valuenow={87}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso de inscripción"
          >
            <div className="rv3-gracias__progress-fill">
              <span>87%</span>
            </div>
          </div>

          <div className="rv3-gracias__step">
            <span className="rv3-gracias__tag">Último paso</span>
            <h2 className="rv3-gracias__step-title">Únete al grupo de WhatsApp</h2>
            <p className="rv3-gracias__step-body">
              Este es un grupo cerrado y libre de SPAM. Aquí recibirás el enlace
              de acceso al entrenamiento.
            </p>
            <a
              href={whatsappGroupUrl}
              className="pearl-btn rv3-gracias__vip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pearl-wrap">
                <p>
                  <span className="rv3-gracias__wa" aria-hidden="true"><WhatsAppIcon /></span>
                  Únete al grupo VIP ahora
                </p>
              </div>
            </a>
          </div>

          {/* Fila del mismo ancho que la card: el botón queda centrado
              sobre el eje de la card y no sobre toda la columna */}
          <div className="rv3-gracias__support-row">
            <SoporteLink />
          </div>
        </div>
      </div>
    </section>
  );
}
