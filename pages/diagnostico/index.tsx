import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cuestionario from "@/components/diagnostico/Cuestionario";
import Escaneando from "@/components/diagnostico/Escaneando";
import FormularioContacto from "@/components/diagnostico/FormularioContacto";
import Resultado from "@/components/diagnostico/Resultado";
import { LANDING } from "@/components/diagnostico/resultados";
import type { Codigo } from "@/components/diagnostico/preguntas";
import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";

/*
 * /diagnostico — la Radiografía de tu ADN.
 *
 * EMBUDO PROPIO, NO UN PASO DE LA LISTA DE ESPERA. Se puede llegar desde
 * cualquier sitio —anuncio, historia, enlace suelto— y por eso pide los datos
 * de contacto: no da por hecho que la persona venga de ningún lado.
 *
 * LOS TRES DATOS SE PIDEN EN LA HERO, juntos y de una vez. Quien abandona a
 * mitad de las siete preguntas deja igualmente nombre, correo y teléfono, así
 * que sigue siendo alcanzable; con la captura al final, ese mismo abandono se
 * pierde entero. Y van en una sola pantalla porque tres campos cortos se
 * rellenan de corrido: partirlos en pasos añade pulsaciones para pedir
 * exactamente lo mismo.
 *
 * CUATRO ESTADOS EN UNA SOLA RUTA: presentación con formulario, cuestionario,
 * escaneo y resultado. Sin navegación entre páginas, así el avance es
 * inmediato y no hay ventana para abandonar entre pantalla y pantalla.
 */

type Fase = "intro" | "quiz" | "escaneando" | "resultado";

export default function LeadMagnetPage() {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>("intro");
  const [codigo, setCodigo] = useState<Codigo | null>(null);
  const [datos, setDatos] = useState({ nombre: "", email: "", telefono: "" });
  const [listo, setListo] = useState(false);
  const [error, setError] = useState("");

  /* Estable entre renders: el escáner la usa dentro de un efecto, y una
     función nueva en cada render lo volvería a disparar. */
  const irAResultado = useCallback(() => setFase("resultado"), []);

  /* Los parámetros solo están disponibles cuando el router se hidrata, así
     que la lectura va en un efecto y no en el primer render. */
  useEffect(() => {
    if (!router.isReady) return;
    const { n, e, t } = router.query;
    if (typeof n === "string" || typeof e === "string") {
      setDatos({
        nombre: typeof n === "string" ? n : "",
        email: typeof e === "string" ? e : "",
        telefono: typeof t === "string" ? t : "",
      });
    }
  }, [router.isReady, router.query]);

  function irA(siguiente: Fase) {
    setFase(siguiente);
    window.scrollTo({ top: 0 });
  }

  /*
   * El envío arranca a la vez que el escaneo, no después.
   *
   * Los cuatro segundos de escaneo cubren la ida y vuelta al servidor: cuando
   * la animación termina, la respuesta ya suele estar. Encadenar las dos
   * esperas —primero el servidor, luego la animación— es lo que hacía que
   * esta pantalla se sintiera larga.
   */
  async function enviar(respuestas: Record<string, number>, abierta: string) {
    setError("");
    setListo(false);
    irA("escaneando");

    try {
      const resp = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: datos.nombre,
          email: datos.email,
          phone: datos.telefono,
          answers: respuestas,
          open: abierta,
        }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error("fallo");

      setCodigo(data.patron as Codigo);
      setListo(true);
    } catch {
      setError("Ha habido un problema. Por favor, inténtalo de nuevo.");
      irA("quiz");
    }
  }

  return (
    <>
      <Head>
        <title>Radiografía de tu ADN | Aida Qui</title>
        <meta name="description" content={LANDING.subtitulo} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="dg-page">
        <div className="dg-page__bg" aria-hidden="true" />

        <div className="dg-page__shell">
          {fase === "intro" && (
            <section className="dg-intro">
              <AcademiaBadge />

              {/* "ADN" va aparte porque es la palabra que tiene que
                  quedarse: el resto del titular la acompaña. */}
              <h1 className="dg-intro__title">
                Radiografía de tu <span className="dg-intro__adn">ADN</span>
              </h1>
              <p className="dg-intro__subtitle">{LANDING.subtitulo}</p>
              <p className="dg-intro__promise">{LANDING.promesa}</p>

              {/* EL FORMULARIO ES LA LLAMADA A LA ACCIÓN: no hay un botón que
                  lleve a otra pantalla a pedir lo mismo. Rellenarlo y entrar
                  al test son el mismo gesto. */}
              <FormularioContacto
                iniciales={datos}
                onListo={(contacto) => {
                  setDatos(contacto);
                  irA("quiz");
                }}
              />

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
            <>
              {error && (
                <p
                  className="dg-quiz__error dg-quiz__error--suelto"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <Cuestionario onFin={enviar} onAtras={() => irA("intro")} />
            </>
          )}

          {fase === "escaneando" && (
            /* `listo` llega cuando el servidor responde. El escáner no sale
               hasta que se cumplen las dos cosas: el tiempo mínimo y la
               respuesta. */
            <Escaneando listo={listo} onFin={irAResultado} />
          )}

          {fase === "resultado" && codigo && (
            <Resultado patron={codigo} email={datos.email} />
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
