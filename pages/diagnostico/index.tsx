import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import AvisoFlotante from "@/components/diagnostico/AvisoFlotante";
import Cuestionario from "@/components/diagnostico/Cuestionario";
import Escaneando from "@/components/diagnostico/Escaneando";
import FormularioContacto from "@/components/diagnostico/FormularioContacto";
import Resultado from "@/components/diagnostico/Resultado";
import { LANDING } from "@/components/diagnostico/resultados";
import type { Codigo } from "@/components/diagnostico/preguntas";
import GradientWaves from "@/components/diagnostico/GradientWaves";
import MagicRings from "@/components/diagnostico/MagicRings";
import AdnParticles from "@/components/diagnostico/AdnParticles";
import AcademiaBadge from "@/components/academia-lista-de-espera/AcademiaBadge";
import SmoothScroll from "@/components/academia-lista-de-espera/SmoothScroll";
import { Dna, Eye, LockKeyhole, Play, Puzzle, Sparkles, Sprout } from "lucide-react";

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

/*
 * LA URL DE FINALIZACIÓN, SIN NAVEGAR.
 *
 * Para medir cuánta gente termina la radiografía hace falta una URL propia que
 * sólo se alcance al terminarla. Navegar de verdad a /diagnostico/gracias
 * rompería lo de arriba: metería una carga de página justo en el momento de
 * más valor, y un fallo ahí deja a la persona sin su resultado.
 *
 * replaceState cambia la barra de direcciones sin desmontar nada. Clarity y
 * Vercel Analytics registran la vista igual —las dos miden por URL—, el
 * componente del resultado sigue montado, y como REEMPLAZA en vez de apilar,
 * el botón de atrás sigue llevando a donde la persona venía y no al
 * cuestionario que acaba de completar.
 *
 * La ruta existe también como página real, para quien llegue a ella directo,
 * recargue o la comparta.
 */
const RUTA_FINALIZADO = "/diagnostico/gracias";

const RUTA_BASE = "/diagnostico";

function reescribirRuta(destino: string) {
  if (typeof window === "undefined") return;
  if (window.location.pathname === destino) return;

  /* El navegador la rechaza si el origen no coincide (por ejemplo, servido
     desde un about:blank en previsualizaciones). Que falle el contador no
     puede tumbar la pantalla de resultado. */
  try {
    /* La query se conserva: los datos de contacto pueden venir por ella. */
    window.history.replaceState(
      window.history.state,
      "",
      destino + window.location.search
    );
  } catch {
    /* Sin métrica, pero con resultado. */
  }
}

function marcarFinalizado() {
  reescribirRuta(RUTA_FINALIZADO);
}

function restituirRuta() {
  reescribirRuta(RUTA_BASE);
}

const SOCIAL_PROOF_AVATARS = [
  "/lista-de-espera/testimonios/santiago.jpeg",
  "/lista-de-espera/testimonios/oriana.jpeg",
  "/lista-de-espera/testimonios/martina.jpeg",
  "/lista-de-espera/testimonios/Mafe Ellingboe.png",
] as const;

/*
 * UN ICONO POR PUNTO, EN EL SITIO DONDE ANTES IBA EL NÚMERO.
 *
 * El 01-04 numeraba una lista que no tiene orden: no hay que hacer el primero
 * antes que el segundo, son las cuatro partes de una misma lectura. Lo que sí
 * hace cada icono es adelantar de qué va cada una antes de leerla.
 *
 * Por qué estos cuatro, y no cuatro cualesquiera: el código es la hélice; lo
 * que se expresa en tu realidad es lo que se VE; la raíz es lo que está debajo
 * y sostiene; integrar es encajar la pieza que falta.
 *
 * El componente viaja en la constante —de ahí la mayúscula, que es lo que JSX
 * exige para tratarlo como componente y no como etiqueta HTML—, así el texto y
 * su icono se declaran juntos y no hay un segundo array que mantener en orden.
 */
const RECURSO_PUNTOS = [
  {
    Icono: Dna,
    titulo: "Tu código dominante",
  },
  {
    Icono: Eye,
    titulo: "Cómo se expresa en tu realidad",
  },
  {
    Icono: Sprout,
    titulo: "El código raíz detrás de él",
  },
  {
    Icono: Puzzle,
    titulo: "Lo que necesitas integrar",
  },
] as const;

export default function LeadMagnetPage() {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>("intro");
  const [codigo, setCodigo] = useState<Codigo | null>(null);
  const [datos, setDatos] = useState({ nombre: "", email: "", telefono: "" });
  const [listo, setListo] = useState(false);
  const [error, setError] = useState("");
  const [videoBloqueado, setVideoBloqueado] = useState(false);
  /* Separado de `videoBloqueado` porque duran cosas distintas: el candado sobre
     la imagen vive 2,1 s y el aviso 3 s más su salida. Atados al mismo estado,
     uno de los dos se cortaría a destiempo. */
  const [avisoVisible, setAvisoVisible] = useState(false);
  /* Estable entre renders: el escáner la usa dentro de un efecto, y una
     función nueva en cada render lo volvería a disparar. */
  const irAResultado = useCallback(() => {
    setFase("resultado");
    marcarFinalizado();
  }, []);

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
    if (!videoBloqueado) return;
    const timer = window.setTimeout(() => setVideoBloqueado(false), 2100);
    return () => window.clearTimeout(timer);
  }, [videoBloqueado]);

  /* Estable entre renders: el aviso la recibe como prop y la usa dentro de un
     efecto. Una función nueva en cada render volvería a disparar ese efecto y
     reiniciaría la cuenta atrás en bucle. */
  const cerrarAviso = useCallback(() => setAvisoVisible(false), []);

  function irA(siguiente: Fase) {
    setFase(siguiente);
    /* Si se vuelve atrás desde el resultado —el reintento tras un fallo de
       envío es el caso real— la URL de finalización deja de ser cierta. */
    if (siguiente !== "resultado") restituirRuta();
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

      {/* EL SCROLL SUAVIZADO VIVE SÓLO EN LA PORTADA.

          Antes se montaba para las cuatro fases. En la portada es lo que se
          busca —una página que se recorre—, pero de la segunda en adelante no
          hay nada que recorrer: el cuestionario cambia de pregunta en el sitio
          y el escaneo no tiene scroll. Lo único que aportaba allí era retrasar
          el `window.scrollTo` con el que cada fase vuelve arriba, así que al
          avanzar se veía la pantalla nueva deslizándose desde el medio.

          Al desmontarse, Lenis restituye el scroll nativo en su limpieza. */}
      {fase === "intro" && <SmoothScroll />}

      {/* DOS FONDOS, UNO POR MOMENTO.

          La portada lleva la retícula sobre crema; el cuestionario, el escaneo
          y el resultado recuperan el violeta con el campo de ondas que tenían.

          Y es una distinción de fondo, no un capricho: la portada se lee y se
          recorre —texto largo sobre claro, que es donde se lee mejor—, mientras
          que las otras tres son el diagnóstico en sí, y ahí el violeta oscuro
          con algo moviéndose detrás es lo que sostiene que está pasando algo. */}
      <main
        className={`dg-page${fase === "intro" ? "" : " dg-page--proceso"}`}
      >
        {/* EL FONDO DE TODA LA PÁGINA: UNA CUADRÍCULA, NO UN CAMPO DE ONDAS.

            AQUÍ VIVÍA UN SHADER (GradientWaves) y se retiró entero. El fondo
            que dejaba era una masa violeta en movimiento que ocupaba la página
            de arriba abajo, y con el hero ya en violeta pasó a competir con él:
            dos violetas distintos separados por la cinta, cuando la cinta
            existe precisamente para marcar UN corte —el violeta de la portada
            contra el claro del cuerpo—. Al quitarlo, ese corte vuelve a ser el
            único de la página.

            Lo sustituye una retícula de líneas violetas sobre crema, y va en
            CSS —dos degradados repetidos, ver .dg-page en globals.css— y no en
            un lienzo: es un dibujo estático y regular, exactamente lo que un
            background-image resuelve sin pedir WebGL, sin un contexto gráfico
            por pestaña y sin un fotograma de trabajo por segundo.

            NO HAY ELEMENTO PROPIO: la retícula es el fondo de .dg-page. El div
            que había aquí sólo existía para alojar el lienzo del shader. */}

        {/* LA INTRO NO VA DENTRO DEL SHELL, y las otras tres fases sí.
            El hero y el panel sangran de canto a canto: una banda con fondo
            propio que no llegue a los bordes se lee como una tarjeta enorme,
            no como una sección. Los 860 px dejan de envolver la página y
            pasan a ser el ancho del contenido de cada bloque. */}
        {fase === "intro" ? (
          <>
            <section className="dg-hero">
              {/* ══ CAPA DEL FONDO: LAS HEBRAS DE ADN ══

                  Va la primera del documento, así que queda por detrás de todo
                  lo demás sin necesidad de z-index.

                  ES EL SEGUNDO LIENZO WEBGL DEL HERO, con los anillos ya
                  corriendo por delante. Se montó a sabiendas, no por descuido:
                  si al verlo el fondo queda recargado, lo que sobra es uno de
                  los dos, y quitar este es borrar estas diez líneas.

                  POR QUÉ HEBRAS Y NO CUALQUIER OTRA PARTÍCULA: la página se
                  llama "Radiografía de tu ADN". Un campo de puntos genérico
                  sería atmósfera; esto nombra el tema.

                  Las hebras se reparten a los lados y el centro queda libre:
                  ahí va el titular, y es lo único que tiene que leerse. */}
              <div className="dg-hero__adn" aria-hidden="true">
                <AdnParticles
                  className="dg-hero__adn-canvas"
                  strands={6}
                  /* Baja, pero no tanto como para desaparecer: por delante van
                     los anillos y encima el titular. Si al verlo pesa, este
                     es el número que se toca. */
                  opacity={0.55}
                  speed={0.85}
                />
              </div>

              {/* ══ CAPA DE EN MEDIO: LOS ANILLOS ══

                  Los anillos van por detrás del contenido porque son los que
                  menos tienen que decir: marcan un pulso que se expande, y esa
                  es toda su función.

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

                <div
                  className="dg-social-proof dg-sube"
                  style={{ animationDelay: "180ms" }}
                >
                  <div className="dg-social-proof__avatars" aria-hidden="true">
                    {SOCIAL_PROOF_AVATARS.map((src) => (
                      <Image
                        key={src}
                        className="dg-social-proof__avatar"
                        src={src}
                        alt=""
                        width={40}
                        height={40}
                        sizes="40px"
                      />
                    ))}
                  </div>
                  <p>Súmate y descubre tu código como ellos</p>
                </div>
              </div>
            </section>

            {/* EL PANEL SUBE SOBRE EL HERO con las esquinas superiores
                redondeadas. Es lo que separa la promesa de la acción: arriba
                se lee, aquí se rellena. */}
            <div className="dg-panel">
              <div className="dg-panel__inner">
                {/* EL FORMULARIO ES LA LLAMADA A LA ACCIÓN: no hay un botón que
                    lleve a otra pantalla a pedir lo mismo. Rellenarlo y entrar
                    al test son el mismo gesto. */}
                {/* El id es el destino al que baja el aviso del vídeo. Va en un
                    envoltorio y no en el <form>, que lo pinta un componente
                    compartido: así el ancla pertenece a esta página, que es
                    quien la usa. */}
                <div id="empezar" className="dg-ancla-form">
                  <FormularioContacto
                    iniciales={datos}
                    onListo={(contacto) => {
                      setDatos(contacto);
                      irA("quiz");
                    }}
                  />
                </div>

                {/* La entrega final toma la estructura de Pilar: copy breve,
                    puntos chiquitos en blanco y video bloqueado como preview. */}
                <section
                  id="lo-que-vas-a-recibir"
                  className="dg-resource"
                  aria-labelledby="dg-resource-title"
                >
                  <div className="dg-resource__copy">
                    <span className="dg-resource__badge">
                      <Sparkles size={15} strokeWidth={1.8} />
                      Tu lectura personalizada
                    </span>
                    <h2 id="dg-resource-title">LO QUE VAS A RECIBIR</h2>
                    <p>
                      Un diagnóstico de Aida para detectar el código que dirige
                      tu vida y cómo pasar de comprenderlo a transformarlo de
                      verdad.
                    </p>

                    <ul className="dg-resource__list">
                      {RECURSO_PUNTOS.map(({ Icono, titulo }) => (
                        <li key={titulo}>
                          {/* aria-hidden: el icono repite lo que dice el texto
                              que tiene al lado, y un lector de pantalla no
                              tiene por qué anunciarlo dos veces. */}
                          <span
                            className="dg-resource__list-icon"
                            aria-hidden="true"
                          >
                            <Icono size={15} strokeWidth={2} />
                          </span>
                          <span>{titulo}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  <button
                    type="button"
                    className={`dg-resource__video${
                      videoBloqueado ? " is-locked" : ""
                    }`}
                    aria-label="Vista previa bloqueada. Completa el diagnóstico para recibir el video por email."
                    onClick={() => {
                      setVideoBloqueado(true);
                      setAvisoVisible(true);
                    }}
                  >
                    <Image
                      className="dg-resource__poster"
                      src="/diagnostico/img/main/portada-video.jpg"
                      alt="Vista previa del video personalizado de Aida"
                      width={640}
                      height={480}
                      loading="eager"
                      sizes="(max-width: 980px) calc(100vw - 84px), 640px"
                    />
                    <span className="dg-resource__preview">Vista previa</span>
                    <span className="dg-resource__play" aria-hidden="true">
                      <Play size={34} strokeWidth={0} fill="currentColor" />
                    </span>
                    <span
                      className="dg-resource__locked"
                      aria-live="polite"
                      aria-hidden={!videoBloqueado}
                    >
                      <span className="dg-resource__lock-icon" aria-hidden="true">
                        <LockKeyhole size={28} strokeWidth={1.8} />
                      </span>
                      <span>Completa el diagnóstico para desbloquearlo</span>
                    </span>
                  </button>
                </section>
              </div>
            </div>

            {/* EL REMATE DIFUMINADO DEL BORDE INFERIOR.

                Una banda fija al fondo de la ventana que desenfoca lo que pasa
                por debajo. Lo que hay más abajo deja de competir con lo que se
                está leyendo, y el corte contra el borde del navegador deja de
                ser una línea recta.

                VA FIJA A LA VENTANA, no al final del documento: su trabajo es
                rematar el BORDE DE LA PANTALLA, y anclada al final sólo
                aparecería al llegar al pie.

                pointer-events: none es imprescindible —cruza por encima del
                formulario y sin eso se comería los clics del último campo—. Y
                sólo está en la portada: en el cuestionario taparía las
                respuestas de abajo. */}
            <div className="dg-fundido-inferior" aria-hidden="true" />

            {/* EL AVISO DEL VÍDEO.

                Sale al pulsar la vista previa y, a los 3 segundos, baja al
                formulario y se va. El candado de la imagen dice que el vídeo
                está bloqueado; esto dice cómo desbloquearlo, que es lo que le
                falta a quien acaba de pulsar "reproducir".

                Montado y desmontado por `avisoVisible`, no escondido con CSS:
                sus dos temporizadores viven en el componente y sólo se limpian
                al desmontarlo de verdad. */}
            {avisoVisible && (
              <AvisoFlotante
                texto="El video se desbloquea con tu diagnóstico. Te llevo al formulario para empezarlo."
                destino="empezar"
                alCerrar={cerrarAviso}
              />
            )}
          </>
        ) : (
          <>
            {/* EL CAMPO DE ONDAS, DE VUELTA Y SÓLO AQUÍ.

                Es el fondo que tenían estas tres pantallas. Se retiró de la
                página entera al pasar la portada a la retícula, pero el motivo
                de aquello era que competía CON EL HERO: dos violetas separados
                por la cinta. Aquí no hay hero ni cinta, así que el problema no
                existe y lo que aporta —una pantalla que respira mientras se
                responde y mientras se calcula— sí.

                VA DENTRO DE LA RAMA, no fuera: montado arriba seguiría vivo
                durante la portada, gastando un contexto WebGL y un fotograma
                por segundo detrás de un fondo opaco que lo tapa entero.

                Los parámetros son los que ya tenía, sin tocar: la paleta está
                calibrada para leerse sobre el violeta de .dg-page--proceso.

                ⚠️ VA FUERA DE .dg-page__shell, COMO HERMANO. Metido dentro, el
                lienzo teñía de violeta la tarjeta del cuestionario y el
                enunciado, y los dejaba ilegibles.

                El motivo es el orden de pintado de CSS, que NO es el orden del
                documento: primero van los fondos de los elementos SIN
                `position`, después el texto, y al final los POSICIONADOS. El
                lienzo va en `fixed` —posicionado—, así que se pintaba después
                del fondo crema de .dg-quiz y después del enunciado, por encima
                de los dos; al 62 % de opacidad no los tapaba, los teñía. Las
                opciones se salvaban por llevar `position` ellas mismas, y por
                eso el fallo parecía cosa de los colores del texto.

                Fuera del shell son dos hermanos posicionados y manda el orden
                del documento, con el shell además en z-index 1: el lienzo
                queda detrás de TODO el contenido, no sólo de parte. */}
            <div className="dg-page__ondas" aria-hidden="true">
              <GradientWaves
                horizonColor="#fffaf1"
                waveColor="#2e1a52"
                crestColor="#b79ae8"
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
                opacity={0.66}
                mouseInteraction
                parallaxStrength={0.5}
                grain
                grainIntensity={0.045}
              />
            </div>

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
          </>
        )}

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
