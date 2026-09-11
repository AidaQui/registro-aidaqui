import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cuestionario from "@/components/diagnostico/Cuestionario";
import Resultado from "@/components/diagnostico/Resultado";
import { LANDING } from "@/components/diagnostico/resultados";
import type { Patron } from "@/components/diagnostico/preguntas";
import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";

/*
 * /diagnostico — la Radiografía de tu ADN.
 *
 * SE LLEGA DESDE LA PÁGINA DE GRACIAS DEL REGISTRO, que arrastra los datos en
 * la URL. Por eso aquí no hay formulario: quien llega ya los dejó, y pedirlos
 * otra vez es la forma más rápida de perder a la mitad.
 *
 * Quien entre sin esos datos ve una invitación a registrarse en vez del
 * cuestionario. No es un control de acceso —la URL no es secreta—, pero evita
 * el caso que sí importa: alguien completando las cuatro preguntas para que el
 * resultado no se le pueda enviar a ninguna parte.
 *
 * TRES ESTADOS EN UNA SOLA RUTA: presentación, cuestionario y resultado. Sin
 * navegación entre páginas, así el avance es inmediato y no hay ventana para
 * abandonar entre pantalla y pantalla.
 */

type Fase = "intro" | "quiz" | "resultado";

export default function DiagnosticoPage() {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>("intro");
  const [patron, setPatron] = useState<Patron | null>(null);
  const [datos, setDatos] = useState({ nombre: "", email: "", telefono: "" });

  /* Los parámetros solo están disponibles cuando el router se hidrata, así
     que la lectura va en un efecto y no en el primer render. */
  useEffect(() => {
    if (!router.isReady) return;
    const { n, e, t } = router.query;
    setDatos({
      nombre: typeof n === "string" ? n : "",
      email: typeof e === "string" ? e : "",
      telefono: typeof t === "string" ? t : "",
    });
  }, [router.isReady, router.query]);

  const tieneEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email);

  return (
    <>
      <Head>
        <title>Radiografía de tu ADN | Aida Qui</title>
        <meta name="description" content={LANDING.subtitulo} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="dg-page">
        <div className="dg-page__bg" aria-hidden="true" />

        <div className="dg-page__shell">
          {fase === "intro" && (
            <section className="dg-intro">
              <AcademiaBadge />

              <h1 className="dg-intro__title">{LANDING.titulo}</h1>
              <p className="dg-intro__subtitle">{LANDING.subtitulo}</p>
              <p className="dg-intro__promise">{LANDING.promesa}</p>

              {tieneEmail ? (
                <>
                  <button
                    type="button"
                    className="pearl-btn espera-cta"
                    onClick={() => setFase("quiz")}
                  >
                    <div className="pearl-wrap">
                      <p>
                        <span className="pearl-star" aria-hidden="true">✦</span>
                        EMPEZAR MI RADIOGRAFÍA
                        <span className="pearl-star" aria-hidden="true">✦</span>
                      </p>
                    </div>
                  </button>
                  <p className="dg-intro__note">
                    4 preguntas · Menos de 2 minutos
                  </p>
                </>
              ) : (
                <div className="dg-intro__locked">
                  <p className="dg-intro__locked-text">
                    La radiografía es para quienes ya están en la lista de
                    espera de Academia ADN. Apúntate y podrás hacerla al
                    instante.
                  </p>
                  <a href="/lista-de-espera" className="pearl-btn espera-cta">
                    <div className="pearl-wrap">
                      <p>
                        <span className="pearl-star" aria-hidden="true">✦</span>
                        IR A LA LISTA DE ESPERA
                        <span className="pearl-star" aria-hidden="true">✦</span>
                      </p>
                    </div>
                  </a>
                </div>
              )}

              <div className="dg-intro__block">
                <p className="dg-intro__block-title">{LANDING.bloqueTitulo}</p>
                <p className="dg-intro__block-subtitle">
                  {LANDING.bloqueSubtitulo}
                </p>

                <ul className="dg-intro__points">
                  {LANDING.puntos.map((punto) => (
                    <li key={punto.numero} className="dg-point">
                      <span className="dg-point__num" aria-hidden="true">
                        {punto.numero}
                      </span>
                      <p className="dg-point__title">{punto.titulo}</p>
                      <p className="dg-point__text">{punto.texto}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {fase === "quiz" && (
            <Cuestionario
              nombre={datos.nombre}
              email={datos.email}
              telefono={datos.telefono}
              onResultado={(resultado) => {
                setPatron(resultado);
                setFase("resultado");
                window.scrollTo({ top: 0 });
              }}
            />
          )}

          {fase === "resultado" && patron && (
            <Resultado patron={patron} email={datos.email} />
          )}
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
