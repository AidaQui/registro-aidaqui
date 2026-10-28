import { useCallback, useEffect, useRef, useState } from "react";
import { useMovimiento } from "@/components/activacion-v4/useMovimiento";
import { Lock, LockOpen } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
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
/* El Cierre de Ciclo · el sobre con el sello de Aida                  */
/* ------------------------------------------------------------------ */

/**
 * Un sobre cerrado con el sello de cera de Aida. Al entrar en pantalla (o al
 * tocarlo) el sello se rompe, la solapa gira hacia atrás y la carta sube con
 * la fecha, la hora y el formato. El botón va debajo, siempre a la vista.
 */
export function CierreSobre({ cta }: Props) {
  const principal = HORARIOS[0];
  const { dia, mes } = partesFecha();
  const otros = HORARIOS.slice(1);
  const movimiento = useMovimiento();
  const [abiertoE, setAbierto] = useState(false);
  const abierto = movimiento ? abiertoE : true;

  const ref = useEntra<HTMLDivElement>(() => {
    if (!reducirMovimiento()) window.setTimeout(() => setAbierto(true), 450);
  }, 0.6);

  return (
    <div className="av4-sobre" data-reveal>
      <div
        ref={ref}
        className={`av4-sobre__escena${abierto ? " av4-sobre__escena--abierto" : ""}`}
        onClick={() => setAbierto(!abierto)}
      >
        <div className="av4-sobre__fondo" aria-hidden="true" />

        <div className="av4-sobre__carta">
          <p className="av4-sobre__fecha">
            <span>{dia}</span> {mes && <em>de {mes}</em>}
          </p>
          <p className="av4-sobre__hora">
            {principal.hora} {principal.pais} peninsular
          </p>
          <p className="av4-sobre__formato">
            {EVENTO.formato} · {PRECIO.actual.replace("€", " €")}
          </p>
          <p className="av4-sobre__otros">
            {otros.map((h, i) => (
              <span key={h.pais}>
                {i > 0 && " · "}
                {h.pais === "México" ? "Ciudad de México" : h.pais} {h.hora}
              </span>
            ))}
          </p>
        </div>

        <div className="av4-sobre__frente" aria-hidden="true" />
        <div className="av4-sobre__solapa" aria-hidden="true" />
        <Av4Sello size={72} className="av4-sobre__sello" />
      </div>

      <div className="av4-sobre__cta">
        <BotonCierre cta={cta} />
      </div>
    </div>
  );
}
