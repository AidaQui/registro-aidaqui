import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cuestionario from "@/components/diagnostico/Cuestionario";
import Escaneando from "@/components/diagnostico/Escaneando";
import FormularioContacto from "@/components/diagnostico/FormularioContacto";
import Resultado from "@/components/diagnostico/Resultado";
import { LANDING } from "@/components/diagnostico/resultados";
import type { Codigo } from "@/components/diagnostico/preguntas";
import DiscoveryFolder from "@/components/diagnostico/DiscoveryFolder";
import TextLoop from "@/components/diagnostico/TextLoop";
import GradientWaves from "@/components/diagnostico/GradientWaves";
import MagicRings from "@/components/diagnostico/MagicRings";
import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";
import GradualBlur from "@/components/academia-lista-de-espera/GradualBlur";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";

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
  /* El grosor de la cinta depende del ancho: la banda escala con la ventana,
     así que el trazo que en escritorio es un remate en móvil se ve como un
     hilo. Arranca en 70 —el valor de escritorio— para que el servidor y el
     primer render pinten lo mismo y no haya aviso de hidratación. */
  const [anchoCinta, setAnchoCinta] = useState(70);

  /* Estable entre renders: el escáner la usa dentro de un efecto, y una
     función nueva en cada render lo volvería a disparar. */
  const irAResultado = useCallback(() => setFase("resultado"), []);

  /* Los parámetros solo están disponibles cuando el router se hidrata, así
     que la lectura va en un efecto y no en el primer render. */
  useEffect(() => {
    if (!router.isReady) return;
    const { n, e, t } = router.query;
    if (typeof n === "string" || typeof e === "string") {
      let activo = true;
      const datosDeUrl = {
        nombre: typeof n === "string" ? n : "",
        email: typeof e === "string" ? e : "",
        telefono: typeof t === "string" ? t : "",
      };

      queueMicrotask(() => {
        if (activo) setDatos(datosDeUrl);
      });

      return () => {
        activo = false;
      };
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const consulta = window.matchMedia("(max-width: 700px)");
    const aplicar = () => setAnchoCinta(consulta.matches ? 92 : 70);
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

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

      <SmoothScroll />

      <main className="dg-page">
        {/* EL FONDO DE TODA LA PÁGINA.

            Sustituye a la imagen fija que había aquí (.dg-page__bg, cuya regla
            queda sin usar en globals.css).

            VA EN position: fixed, no absolute: así el campo de ondas se queda
            quieto mientras la página se desplaza por delante, en vez de
            arrastrarse con ella. Un fondo que scrollea a la misma velocidad que
            el contenido deja de leerse como fondo.

            NO LLEVA pointer-events: none. El parallax del shader necesita los
            eventos del puntero, y estando detrás de todo no estorba: donde hay
            contenido encima, los clics van al contenido. */}
        <div className="dg-page__ondas" aria-hidden="true">
          <GradientWaves
            /* ── LA PALETA VA EN CLARO ──

               waveColor es el cuerpo de la ola y por tanto el color que
               domina la pantalla: llevaba #010102 —negro— y ahora lleva el
               crema de la marca, el mismo #fffffd del resto del sitio.

               Los otros dos son las líneas que dibujan el relieve. Sobre
               fondo oscuro tenían que ser violetas saturados para verse;
               sobre crema pasa lo contrario, así que bajan a violetas de
               marca que se leen como sombra y no como neón. */
            horizonColor="#b79ae8"
            waveColor="#fffffd"
            crestColor="#6a4a9c"
            speed={0.5}
            amplitude={2.75}
            waveScale={0.5}
            waveRatio={0.3}
            swell={35}
            turbulence={20}
            tilt={1.14}
            zoom={1}
            height={6}
            fogDepth={24}
            detail="medium"
            brightness={1}
            opacity={0.7}
            mouseInteraction
            parallaxStrength={0.5}
            grain
            grainIntensity={0.05}
          />
        </div>

        {/* LA INTRO NO VA DENTRO DEL SHELL, y las otras tres fases sí.
            El hero y el panel sangran de canto a canto: una banda con fondo
            propio que no llegue a los bordes se lee como una tarjeta enorme,
            no como una sección. Los 860 px dejan de envolver la página y
            pasan a ser el ancho del contenido de cada bloque. */}
        {fase === "intro" ? (
          <>
            <section className="dg-hero">
              {/* ══ CAPA DE ATRÁS: LOS ANILLOS ══

                  Tres planos en el hero, de atrás hacia delante: los anillos,
                  la hélice y el contenido. Los anillos van los últimos en
                  profundidad porque son los que menos tienen que decir: marcan
                  un pulso que se expande, y esa es toda su función.

                  ES EL MISMO GESTO QUE UNA RADIOGRAFÍA. Un pulso que sale del
                  centro y se expande es lo que hace un escáner, y esta página
                  se llama "Radiografía de tu ADN". Por eso los anillos y no
                  cualquier otro fondo animado.

                  LOS COLORES SON LOS DE LA MARCA: el violeta del titular
                  abriendo y el dorado de "ADN" cerrando. El degradado va de uno
                  a otro según se aleja el anillo del centro.

                  LA OPACIDAD ES BAJA Y LA VELOCIDAD LENTA a propósito. Detrás
                  de un titular, un fondo que se mueve rápido obliga a leer dos
                  veces. */}
              <div className="dg-hero__rings" aria-hidden="true">
                <MagicRings
                  className="dg-hero__rings-canvas"
                  color="#b79ae8"
                  colorTwo="#f0c98a"
                  ringCount={5}
                  speed={0.5}
                  attenuation={12}
                  lineThickness={1.6}
                  baseRadius={0.32}
                  radiusStep={0.12}
                  scaleRate={0.12}
                  opacity={0.55}
                  /* El ruido del original se ve como suciedad sobre el crema:
                     está pensado para dar grano sobre negro. Casi anulado. */
                  noiseAmount={0.03}
                  ringGap={1.5}
                  fadeIn={0.7}
                  fadeOut={0.5}
                  followMouse={false}
                  parallax={0.04}
                  clickBurst={false}
                />
              </div>

              {/* ⚠️ AQUÍ IBA LA HÉLICE DE FONDO. Se retiró al pasar el hero a
                  blanco: estaba calibrada para leerse sobre el violeta
                  profundo, y sobre crema se convertía en una mancha gris que
                  competía con el titular sin aportar atmósfera.

                  La hélice sigue viva en la fase de escaneo, que es donde de
                  verdad cuenta algo: allí dice "te estamos analizando". */}

              <div className="dg-intro dg-hero__inner">
                {/* ESCRITORIO: TRES PIEZAS EN ESCALERA. MÓVIL: UNA PILA.

                    No son dos columnas enfrentadas. El titular ancla arriba a
                    la izquierda, el subtítulo entra arriba a la derecha, y la
                    promesa cae debajo pero corrida hacia el centro, sin
                    alinearse con ninguno de los dos.

                    ESE DESALINEO ES EL PUNTO. Con todo cuadrado en dos
                    columnas el ojo lee dos bloques y se detiene. En escalera
                    tiene que bajar en diagonal —titular, subtítulo, promesa—
                    y ese recorrido es el que sostiene la mirada dentro del
                    hero hasta el final del texto.

                    Los tres son hijos directos de la rejilla y cada uno se
                    coloca por columnas, así que el desplazamiento se declara
                    en un solo sitio y no con márgenes sueltos por pieza.

                    En móvil no hay ancho para una escalera y vuelve a la
                    pila, que ahí es lo que corresponde. */}
                <div className="dg-hero__col dg-hero__col--marca">
                  <AcademiaBadge />

                  {/* DOS RENGLONES FIJOS, y no un salto que dependa del ancho:
                      "Radiografía" arriba y "de tu ADN" abajo. Partido así, la
                      palabra que tiene que quedarse cierra la frase en vez de
                      colgar al final de una línea larga.

                      El <span> de ADN va dentro del segundo renglón para que
                      "de tu" y "ADN" sigan leyéndose como una sola unidad. */}
                  <h1 className="dg-intro__title">
                    <span className="dg-intro__linea">Radiografía</span>
                    <span className="dg-intro__linea">
                      de tu <span className="dg-intro__adn">ADN</span>
                    </span>
                  </h1>
                </div>

                <p className="dg-intro__subtitle dg-hero__sub">
                  {LANDING.subtitulo}
                </p>
              </div>
            </section>

            {/* LA CINTA DE PALABRAS CLAVE, MONTADA SOBRE LA COSTURA.

                Va justo en el borde donde el violeta del hero se corta contra
                el crema del panel, con media cinta a cada lado. Ese corte es la
                línea más marcada de la página: poner la cinta encima la
                convierte en el remate de la portada en lugar de un bloque más
                dentro del panel.

                Aquí vivía un párrafo en el hero que enumeraba todo esto en
                prosa. Nadie lee tres líneas de texto corrido en una portada
                cuando lo que tiene delante es un campo para escribir: se retiró
                y quedaron sus palabras, que es lo único que se recordaba.

                SALE DEL PANEL Y DEL HERO para poder ocupar el ancho completo.
                La costura llega de canto a canto, y una cinta que se detuviera
                en los 1180 px del contenido dejaría el corte a la vista por los
                dos lados.

                Se detiene al pasar el cursor: es texto, y un texto que se mueve
                sin poder pararlo no se puede leer. */}
            <div className="dg-tira-costura">
              <TextLoop
                text={LANDING.palabrasClave}
                label={LANDING.promesa}
                shape="wave"
                /* 160 y no los 520 del original: a ancho completo, 520 serían
                   más de 800 px de alto. Esto es un remate, no una sección.

                   ⚠️ Si se cambia este valor hay que recalcular el margen
                   negativo de .dg-tira-costura: los dos describen la misma
                   altura desde sitios distintos. */
                viewHeight={160}
                /* Tope real: en móvil la banda sigue escalando con el ancho
                   (52 px a 390), y en escritorio deja de crecer aquí en vez
                   de llegar a los 256 px que medía a 1920. */
                maxHeight={110}
                curviness={15}
                /* 70 en escritorio y 92 por debajo de 700 px: la banda escala
                   con el ancho, así que en móvil el mismo trazo se ve como un
                   hilo. El texto va dentro, de modo que engrosarla es lo que
                   le devuelve aire. */
                ribbonWidth={anchoCinta}
                /* El violeta del hero, no el de las tarjetas: la cinta tiene
                   que leerse como el final de la banda oscura. */
                ribbonColor="#2e1a52"
                color="#fffffd"
                fontSize={29}
                fontWeight={600}
                letterSpacing={2}
                speed={55}
                separator="✦"
                /* Las estrellas en el mismo dorado que la palabra "ADN"
                   del hero: las mismas cinco paradas de su degradado. Es
                   el único acento dorado de la página y conviene que
                   aparezca siempre con la misma receta. */
                starGradient={["#a06c08", "#d4a020", "#f0c98a", "#d4a020", "#a06c08"]}
                pauseOnHover
              />
            </div>

            {/* EL PANEL SUBE SOBRE EL HERO con las esquinas superiores
                redondeadas. Es lo que separa la promesa de la acción: arriba
                se lee, aquí se rellena. */}
            <div className="dg-panel">
              <div className="dg-panel__inner">
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

                {/* SEPARADOR ENTRE EL FORMULARIO Y LAS TARJETAS.

                    Dos piezas seguidas, las dos con fondo propio, se leían como
                    una sola pila; el separador dice que son dos cosas: arriba
                    se da el dato, abajo se explica qué se recibe.

                    Es el mismo dibujo que el de encima del pie —línea con el
                    rombo en medio— para que la página use un solo recurso de
                    separación y no dos parecidos.

                    aria-hidden: es una raya. No aporta nada a quien escucha la
                    página, y el rombo se leería como un carácter suelto. */}
<DiscoveryFolder
                  title={LANDING.bloqueTitulo}
                  subtitle={LANDING.bloqueSubtitulo}
                  subtitleShort={LANDING.bloqueSubtituloCorto}
                  items={LANDING.puntos}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="dg-page__shell">
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
              <Resultado
                patron={codigo}
                email={datos.email}
                nombre={datos.nombre}
              />
            )}
          </div>
        )}

        <footer className="dg-page__footer">
          <p>
            © {new Date().getFullYear()} Aida Qui · Divine Alignment LLC · Todos
            los derechos reservados
          </p>
        </footer>
      </main>

      {/* EL DESENFOQUE DEL CANTO INFERIOR, SOLO EN LA PORTADA.

          En la intro tiene sentido: hay recorrido por debajo y el velo
          insinúa que la página sigue más allá del borde.

          En el test, el escaneo y el resultado hace lo contrario. Esas
          tres pantallas terminan donde se ven, y ahí el velo no insinúa
          continuidad: emborrona la última opción, la última línea del
          resultado y el pie. Lo que tapaba era contenido, no un borde. */}
      {fase === "intro" && (
        <GradualBlur
          height="3.25rem"
          strength={1.35}
          divCount={5}
          opacity={0.78}
        />
      )}
    </>
  );
}
