import Head from "next/head";
import GraciasHero from "@/components/registro-v2/GraciasHero";

// Gracias de registro-v2: una sola pantalla con lo único que falta hacer
// (entrar al grupo de WhatsApp), más el pie. Tuvo debajo los chips de fecha,
// un repaso del contenido y el cierre de la landing, pero repetía todo lo
// que la persona acababa de leer.
export default function GraciasRegistroV2() {
  return (
    <>
      <Head>
        <title>¡Lugar reservado! — Entrenamiento Práctico Gratuito | Aida Qui</title>
        <meta
          name="description"
          content="Tu lugar en el entrenamiento gratuito está reservado. Únete al grupo de WhatsApp para recibir el enlace de acceso a la sesión en vivo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>
      <main className="ent ent-gracias-page">
        <GraciasHero />
        <footer className="ent-footer">
          <p className="closing-footer-copy">
            © 2026 Aida Qui · Divine Alignment LLC · Todos los derechos reservados
          </p>
        </footer>
      </main>
    </>
  );
}
