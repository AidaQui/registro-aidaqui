import Image from "next/image";
import { CalendarDays, Clock, ShieldCheck, Tag, Video } from "lucide-react";
import Av4Cta from "@/components/activacion-v4/Av4Cta";
import Av4Horarios from "@/components/activacion-v4/Av4Horarios";
import Av4Lockup from "@/components/activacion-v4/Av4Lockup";
import Av4Sello from "@/components/activacion-v4/Av4Sello";
import { EVENTO, HORARIOS, PRECIO } from "@/components/activacion-v4/config";

/**
 * Hero estilo Tayná: logotipo con sello, titular de pesos mezclados con una
 * palabra resaltada, y a la derecha el retrato con una cinta caligráfica
 * caramelo detrás, una etiqueta flotante y el sello giratorio.
 */
export default function Av4Hero() {
  const principal = HORARIOS[0];

  return (
    <section className="av4-hero" aria-labelledby="av4-hero-title">
      <div className="av4-hero__hojas" aria-hidden="true" />

      <div className="av4-hero__shell">
        <div className="av4-hero__copy">
          <Av4Lockup sello />

          <h1 id="av4-hero-title" className="av4-hero__title">
            Deja de posponer <b>la vida que</b>{" "}
            <span className="av4-sel">
              <span className="av4-sel__texto">de verdad</span>
            </span>{" "}
            <b className="av4-acento">quieres vivir</b>.
          </h1>

          <p className="av4-hero__lead">
            Una experiencia guiada en directo para reconectar con la verdad de
            tu corazón, reconocer los miedos que te frenan y activar tu poder
            interior para empezar a crear una vida que ames todos los días.
          </p>

          <p className="av4-hero__info">
            {EVENTO.fechaCorta} · {EVENTO.formato}
          </p>

          <Av4Horarios compacto />

          {/* Va al pricing, no al checkout: saltar afuera sin ver qué incluye
              ni cuánto cuesta es la fricción que más rebota. */}
          <Av4Cta href="#av4-precio" />

          <ul className="av4-trust" aria-label="Garantías de compra">
            <li>
              <ShieldCheck size={15} strokeWidth={1.6} aria-hidden="true" />
              Compra segura
            </li>
            <li>
              <Tag size={15} strokeWidth={1.6} aria-hidden="true" />
              Pago único
            </li>
          </ul>
        </div>

        <div className="av4-hero__art">
          {/* La cinta: un trazo grande que sale por la derecha y rodea el retrato. */}
          <svg
            className="av4-hero__cinta"
            viewBox="0 0 700 760"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="av4-cinta" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#8f6540" />
                <stop offset="0.55" stopColor="#c0905f" />
                <stop offset="1" stopColor="#d9b48a" />
              </linearGradient>
            </defs>
            <path
              d="M60 760 C 0 560 40 360 190 250 C 300 170 420 190 520 150 C 600 118 660 110 720 150 C 640 150 590 190 540 250 C 470 330 420 420 360 520 C 330 570 310 660 330 760 Z"
              fill="url(#av4-cinta)"
            />
            <path
              d="M700 250 C 640 230 560 250 500 300 C 570 270 640 270 720 300 Z"
              fill="url(#av4-cinta)"
              opacity="0.85"
            />
          </svg>

          <div className="av4-hero__retrato">
            <Image
              src="/activacion-v4/hero-aida.jpg"
              alt="Aida Qui"
              fill
              priority
              sizes="(max-width: 900px) 80vw, 460px"
              className="av4-cover"
            />
          </div>

          {/* Insignia circular con el sello y texto que gira alrededor. */}
          <div className="av4-insignia" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="av4-insignia__texto">
              <defs>
                <path
                  id="av4-circulo"
                  d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0"
                />
              </defs>
              <text>
                <textPath href="#av4-circulo">
                  Activación del Corazón · Aida Qui · Activación del Corazón ·
                  Aida Qui ·
                </textPath>
              </text>
            </svg>
            <Av4Sello className="av4-insignia__sello" size={96} />
          </div>

          <div className="av4-etiqueta">
            <Av4Sello className="av4-etiqueta__avatar" size={64} />
            <span>
              <strong>Aida Qui</strong>
              <small>Guía de la experiencia</small>
            </span>
          </div>

          {/* Datos reales de config, sin compras inventadas. */}
          <ul className="av4-datos" aria-label="Fecha, hora y formato">
            <li>
              <CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
              {EVENTO.fechaCorta} · En directo
            </li>
            <li>
              <Clock size={14} strokeWidth={1.8} aria-hidden="true" />
              {principal.hora} · {principal.pais}
            </li>
            <li>
              <Video size={14} strokeWidth={1.8} aria-hidden="true" />
              {EVENTO.formato} · {PRECIO.actual}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
