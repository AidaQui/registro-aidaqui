import { whatsappGroupUrl, soporteUrl, WhatsAppIcon } from "@/components/registro-v2/whatsapp";

// Primera pantalla de /registro-v2/gracias. Reusa la hero de la landing
// (misma foto, mismo velo y mismo comportamiento en mobile) para que el
// paso del formulario a esta página se sienta continuo, y pone arriba de
// todo lo único que falta hacer: entrar al grupo de WhatsApp.
export default function GraciasHero() {
  return (
    <section
      className="hero-section hero-section--mc hero-section--ent ent-gracias"
      aria-labelledby="ent-gracias-title"
    >
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="ent-gracias__eyebrow">
            <span aria-hidden="true">✦</span>
            Lugar reservado
            <span aria-hidden="true">✦</span>
          </p>

          <h1 id="ent-gracias-title" className="ent-gracias__title">
            ¡Tu inscripción está{" "}
            <em className="ent-promise__accent">casi completa</em>!
          </h1>

          <div
            className="ent-gracias__progress"
            role="progressbar"
            aria-valuenow={87}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso de inscripción"
          >
            <div className="ent-gracias__progress-fill">
              <span>87%</span>
            </div>
          </div>

          <div className="ent-gracias__step">
            <span className="ent-gracias__tag">Último paso</span>
            <h2 className="ent-gracias__step-title">Únete al grupo de WhatsApp</h2>
            <p className="ent-gracias__step-body">
              Este es un grupo cerrado y libre de SPAM. Aquí recibirás el enlace
              de acceso al entrenamiento.
            </p>
            <a
              href={whatsappGroupUrl}
              className="pearl-btn ent-gracias__vip"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pearl-wrap">
                <p>
                  <span className="ent-gracias__wa" aria-hidden="true"><WhatsAppIcon /></span>
                  Únete al grupo VIP ahora
                </p>
              </div>
            </a>
          </div>

          {/* Fila del mismo ancho que la card: el botón queda centrado
              sobre el eje de la card y no sobre toda la columna */}
          <div className="ent-gracias__support-row">
            <a
              href={soporteUrl}
              className="ent-gracias__support"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true"><WhatsAppIcon /></span>
              ¿Dudas? Habla con soporte
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
