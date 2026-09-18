import Head from "next/head";
import Link from "next/link";
import { LANDING } from "@/components/diagnostico/resultados";

/**
 * /diagnostico/gracias — completion marker for the diagnostic funnel.
 *
 * The diagnostic itself runs as four phases on a single route, on purpose: no
 * page load sits between the questionnaire and the result. So the result phase
 * does not navigate here — it rewrites the URL in place with history.replaceState
 * (see pages/diagnostico/index.tsx), which is enough for Clarity and Vercel
 * Analytics to record the view while the result component stays mounted.
 *
 * This page exists for the cases that reach the URL for real: a direct hit, a
 * reload, a shared link or a bookmark. There is no result to show in those
 * cases, so it sends the visitor back to the start instead of rendering an
 * empty screen.
 */
export default function GraciasDiagnostico() {
  return (
    <>
      <Head>
        <title>Radiografía completada | Aida Qui</title>
        <meta name="description" content={LANDING.subtitulo} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="dg-page dg-page--proceso dg-gracias">
        <div className="dg-gracias__shell">
          <p className="dg-gracias__eyebrow">Radiografía de tu ADN</p>

          <h1 className="dg-gracias__title">
            Tu lectura ya está <em>en camino</em>.
          </h1>

          <p className="dg-gracias__body">
            Te la hemos enviado por correo. Si no aparece en unos minutos, revisa
            la carpeta de promociones o spam.
          </p>

          <Link href="/diagnostico" className="dg-gracias__link">
            Volver a hacer la radiografía
          </Link>
        </div>

        <footer className="dg-page__footer">
          <p>
            © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos
            los derechos reservados
          </p>
        </footer>
      </main>
    </>
  );
}
