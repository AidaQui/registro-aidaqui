import { useCallback, useEffect, useRef, useState } from "react";
import { useMovimiento } from "@/components/activacion-v4/useMovimiento";
import { ArrowUpRight, Lock, LockOpen } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import { useContenido } from "@/components/activacion-v4/Av4ContenidoContext";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import {
  EVENTO,
  HORARIOS,
  LINKS,
  PRECIO,
} from "@/components/activacion-v4/config";

/**
 * Visuales alternativos del cierre (en lugar de la entrada de v4). Los tres
 * usan sólo datos que ya existen en config.ts (fecha, horarios, formato,
 * precio) y llevan el mismo botón al checkout. Todo el contenido está en el
 * DOM desde el primer render: la animación sólo lo pone en escena, así que el
 * botón se ve y se alcanza sin esperarla. Con prefers-reduced-motion se
 * muestra el estado final, quieto.
 */

type Props = {
  /** Texto del botón (el de `cierre.cta`). Sin él, el de siempre. */
  cta?: string;
};

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/** "15 de noviembre" -> día "15", mes "noviembre" y su número "11". */
function partesFecha() {
  const m = EVENTO.fechaCorta.match(/^(\d{1,2})\s+de\s+(.+)$/);
  const dia = m ? m[1] : EVENTO.fechaCorta;
  const mes = m ? m[2] : "";
  const n = MESES.indexOf(mes.toLowerCase()) + 1;
  return { dia, mes, mesNumero: n > 0 ? String(n) : "" };
}

function reducirMovimiento() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Marca `true` cuando el elemento entra en pantalla (una sola vez). */
function useEntra<T extends Element>(alEntrar: () => void, umbral = 0.45) {
  const ref = useRef<T>(null);
  const cb = useRef(alEntrar);
  useEffect(() => {
    cb.current = alEntrar;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          cb.current();
          io.disconnect();
        }
      },
      { threshold: umbral },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [umbral]);
  return ref;
}

const BotonCierre = ({ cta }: Props) => (
  <Av4Cta
    href={LINKS.registro}
    ubicacion="cierre"
    {...(cta && { label: cta })}
  />
);

/* ------------------------------------------------------------------ */
/* Operación Coherencia · el círculo que respira                       */
/* ------------------------------------------------------------------ */

/**
 * Un círculo suave que se expande y se contrae despacio (4s adentro, 4s
 * afuera), con anillos concéntricos que lo siguen. Dentro, la fecha y la hora;
 * debajo, el resto de horarios y el botón.
 */
export function CierreRespira({ cta }: Props) {
  const principal = HORARIOS[0];
  const { dia, mes } = partesFecha();

  return (
    <div className="av4-resp" data-reveal>
      <div className="av4-resp__escena">
        <span className="av4-resp__aro av4-resp__aro--3" aria-hidden="true" />
        <span className="av4-resp__aro av4-resp__aro--2" aria-hidden="true" />
        <span className="av4-resp__aro av4-resp__aro--1" aria-hidden="true" />
        <div className="av4-resp__nucleo">
          <Av4Sello size={44} className="av4-resp__sello" />
          <p className="av4-resp__fecha">
            <span className="av4-resp__dia">{dia}</span>
            {mes && <span className="av4-resp__mes">{mes}</span>}
          </p>
          <p className="av4-resp__hora">
            {principal.hora} {principal.pais} peninsular
          </p>
          <p className="av4-resp__formato">
            {EVENTO.formato} · {PRECIO.actual.replace("€", " €")}
          </p>
        </div>
      </div>

      <Av4Horarios
        oscuro
        sinPrimero
        nombres={{ México: "Ciudad de México" }}
      />
      <div className="av4-resp__cta">
        <BotonCierre cta={cta} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El Código Corazón · la combinación que se abre                      */
/* ------------------------------------------------------------------ */

const VUELTAS = 3; // la tira lleva 0-9 tres veces; cae en la última
const DURACIONES = [1.9, 2.3, 2.7, 3.1];

function Ficha({ digito, i, girando }: { digito: number; i: number; girando: boolean }) {
  // inicio = en 0; final = en el dígito de la última vuelta.
  const pos = girando ? (VUELTAS - 1) * 10 + digito : 0;
  return (
    <span className="av4-cod__ficha" aria-hidden="true">
      <span
        className="av4-cod__tira"
        style={{
          ["--pos" as string]: pos,
          transitionDuration: girando ? `${DURACIONES[i % DURACIONES.length]}s` : "0s",
        }}
      >
        {Array.from({ length: VUELTAS * 10 }).map((_, n) => (
          <span key={n}>{n % 10}</span>
        ))}
      </span>
    </span>
  );
}

/**
 * Fichas de dígitos que giran como una cerradura de combinación hasta la fecha
 * del evento (15 · 11) cuando la sección entra en pantalla; al terminar, un
 * brillo dorado "abre" el candado. Tocarlo o pasar el cursor repite el giro.
 * La placa lleva la textura dorada.
 */
export function CierreCodigo({ cta }: Props) {
  const principal = HORARIOS[0];
  const { dia, mesNumero } = partesFecha();
  const grupos = [dia.split(""), (mesNumero || "").split("")].filter((g) => g[0]);
  // Sin movimiento (servidor, primer render o movimiento reducido) se ve el estado final.
  const movimiento = useMovimiento();
  const [faseE, setFase] = useState<"inicio" | "gira">("inicio");
  const [abiertoE, setAbierto] = useState(false);
  const fase = movimiento ? faseE : "final";
  const abierto = movimiento ? abiertoE : true;
  const timer = useRef<number | undefined>(undefined);

  const girar = useCallback(() => {
    window.clearTimeout(timer.current);
    setAbierto(false);
    setFase("inicio");
    // Dos fotogramas en el inicio para que la transición parta de 0.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setFase("gira");
        timer.current = window.setTimeout(() => setAbierto(true), 3300);
      }),
    );
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const ref = useEntra<HTMLDivElement>(() => {
    if (!reducirMovimiento()) girar();
  });

  const girando = fase !== "inicio";
  let n = 0;

  return (
    <div
      ref={ref}
      className={`av4-cod${abierto ? " av4-cod--abierto" : ""}`}
      data-reveal
    >
      <div
        className="av4-cod__placa"
        role="img"
        aria-label={`Código de acceso: ${EVENTO.fechaCorta}`}
        onClick={() => fase === "gira" && abierto && girar()}
        onMouseEnter={() => fase === "gira" && abierto && girar()}
      >
        <span className="av4-cod__candado" aria-hidden="true">
          {abierto ? (
            <LockOpen size={22} strokeWidth={1.8} />
          ) : (
            <Lock size={22} strokeWidth={1.8} />
          )}
        </span>
        <div className="av4-cod__fichas">
          {grupos.map((g, gi) => (
            <span className="av4-cod__grupo" key={gi}>
              {gi > 0 && <i className="av4-cod__punto" aria-hidden="true" />}
              {g.map((d) => (
                <Ficha key={n} digito={Number(d)} i={n++} girando={girando} />
              ))}
            </span>
          ))}
        </div>
        <span className="av4-cod__brillo" aria-hidden="true" />
      </div>

      <p className="av4-cod__datos">
        <strong>{EVENTO.fechaCorta}</strong> · {principal.hora}{" "}
        {principal.pais} peninsular
      </p>
      <p className="av4-cod__datos av4-cod__datos--sec">
        {EVENTO.formato} · {PRECIO.actual.replace("€", " €")}
      </p>

      <Av4Horarios
        oscuro
        sinPrimero
        nombres={{ México: "Ciudad de México" }}
      />
      <div className="av4-cod__cta">
        <BotonCierre cta={cta} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* El Cierre de Ciclo · el sobre con la carta                          */
/* ------------------------------------------------------------------ */

/** Inclinación máxima del sobre, en grados, en los bordes de la escena. */
const INCLINACION = 9;

type Punto = { x: number; y: number };

/**
 * Escribe `texto` letra a letra cuando `activo` pasa a `true`. Sin movimiento
 * (servidor, primer render o movimiento reducido) devuelve el texto entero. El
 * estado sólo cambia dentro de temporizadores, nunca en el efecto en sí.
 */
function useTecleo(texto: string, activo: boolean, movimiento: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!movimiento || !activo) return;
    let i = 0;
    let t: number;
    const paso = () => {
      i += 1;
      setN(i);
      if (i < texto.length) t = window.setTimeout(paso, 80);
    };
    t = window.setTimeout(paso, 700);
    return () => window.clearTimeout(t);
  }, [texto, activo, movimiento]);
  if (!movimiento) return { visible: texto, escribiendo: false };
  return { visible: texto.slice(0, n), escribiendo: true };
}

/**
 * Un sobre índigo con una carta marfil guardada hasta el fondo del bolsillo: de
 * ella sólo asoma el encabezado hasta que el cursor (o el foco) la sube. Todo el
 * sobre es el enlace al checkout, se inclina hacia el puntero y lleva una
 * etiqueta de vidrio pegada al cursor. Con pantalla táctil la carta descansa
 * medio levantada. El botón va debajo, siempre a la vista.
 */
export function CierreSobre({ cta }: Props) {
  const principal = HORARIOS[0];
  const otros = HORARIOS.slice(1);
  const nombre = useContenido().marca.nombre;
  const movimiento = useMovimiento();
  const escenaRef = useRef<HTMLDivElement>(null);
  const [inclinacion, setInclinacion] = useState<Punto>({ x: 0, y: 0 });
  const [etiqueta, setEtiqueta] = useState<Punto | null>(null);
  const [visto, setVisto] = useState(false);
  const { visible, escribiendo } = useTecleo(EVENTO.fechaCorta, visto, movimiento);

  const entra = useEntra<HTMLDivElement>(() => setVisto(true), 0.5);

  // Un solo manejador para la inclinación y la etiqueta: necesitan las mismas
  // coordenadas, separarlos duplicaría el trabajo en cada movimiento.
  function alMover(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const escena = escenaRef.current;
    if (!escena) return;
    const r = escena.getBoundingClientRect();
    setInclinacion({
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
    });
    setEtiqueta({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  function alSalir() {
    setInclinacion({ x: 0, y: 0 });
    setEtiqueta(null);
  }

  return (
    <div ref={entra} className="av4-carta" data-reveal>
      <div
        ref={escenaRef}
        className="av4-carta__escena"
        onPointerMove={alMover}
        onPointerLeave={alSalir}
      >
        <div className="av4-carta__halo" aria-hidden="true" />

        <a
          className="av4-carta__sobre"
          href={LINKS.registro}
          target="_blank"
          rel="noopener noreferrer"
          data-sierra="checkout"
          data-sierra-target={`Checkout ${PRECIO.actual} · cierre-sobre`}
          aria-label={`Quiero apuntarme: ${nombre}, ${EVENTO.fechaCorta}`}
          style={{
            // rotateX va invertido: un puntero bajo el centro inclina el borde de arriba hacia vos.
            transform: `translateY(-50%) rotateY(${inclinacion.x * INCLINACION}deg) rotateX(${-inclinacion.y * INCLINACION}deg)`,
          }}
        >
          <span className="av4-carta__dorso" />

          <span className="av4-carta__hoja">
            <span className="av4-carta__cabecera">
              <span>{nombre}</span>
              <span>{EVENTO.fechaCorta}</span>
            </span>

            <span className="av4-carta__titulo">
              <span className="av4-carta__lema">{nombre}</span>
              <span className="av4-carta__fecha">
                {visible}
                {escribiendo && <span className="av4-carta__cursor">_</span>}
              </span>
            </span>

            <span className="av4-carta__regla" />

            <span className="av4-carta__cuerpo">
              <strong>
                {principal.hora} {principal.pais} peninsular
              </strong>
              <span>
                {otros
                  .map((h) => `${h.pais === "México" ? "Ciudad de México" : h.pais} ${h.hora}`)
                  .join(" · ")}
              </span>
              <span>
                {EVENTO.formato} · {PRECIO.actual.replace("€", " €")}
              </span>
            </span>

            <span className="av4-carta__firma">Aida Qui ↗</span>
          </span>

          <span className="av4-carta__frente">
            <span className="av4-carta__pliegue" />
          </span>

          <span className="av4-carta__sello">
            <Av4Sello size={96} className="av4-carta__sello-img" />
            <span className="av4-carta__flecha">
              <ArrowUpRight size={14} strokeWidth={2.4} />
            </span>
          </span>
        </a>

        {etiqueta && (
          <span
            className="av4-carta__etiqueta"
            aria-hidden="true"
            style={{ transform: `translate3d(${etiqueta.x}px, ${etiqueta.y}px, 0)` }}
          >
            Quiero apuntarme
          </span>
        )}
      </div>

      <div className="av4-carta__cta">
        <BotonCierre cta={cta} />
      </div>
    </div>
  );
}
