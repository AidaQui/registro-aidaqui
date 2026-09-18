import {
  Compass,
  BatteryLow,
  Ear,
  Lock,
  Heart,
  UserRoundX,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const sintomas = [
  {
    icon: <Compass size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: (
      <>
        Te cuesta sentir <em>claridad y dirección</em>
      </>
    ),
  },
  {
    icon: <BatteryLow size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: (
      <>
        Sientes <em>agotamiento emocional</em> o energético
      </>
    ),
  },
  {
    icon: <Ear size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: (
      <>
        Tu intuición te pide <em>cambios que aún no sabes cómo hacer</em>
      </>
    ),
  },
  {
    icon: <Lock size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: (
      <>
        Has trabajado mucho en ti… pero <em>algo sigue bloqueado</em>
      </>
    ),
  },
  {
    icon: <Heart size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: (
      <>
        Quieres volver a sentir <em>conexión</em> contigo, con Dios y con tu
        verdad
      </>
    ),
  },
  {
    icon: <UserRoundX size={24} strokeWidth={1.7} aria-hidden="true" />,
    text: (
      <>
        Ya no te identificas con <em>la versión que estás sosteniendo</em>
      </>
    ),
  },
];

export default function DolorSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="frec-dolor" aria-labelledby="frec-dolor-title">
      <div className="frec-dolor__bg" aria-hidden="true" />

      <div className="frec-shell">
        <div className="frec-intro">
          <h2 id="frec-dolor-title" className="frec-intro__title" data-reveal="title">
            Lo que estás sintiendo <em>no es casualidad</em>.
          </h2>

          <p className="frec-intro__text" data-reveal>
            Hay momentos donde una identidad ya no puede sostener el siguiente
            nivel de tu alma. Y aunque por fuera continúes con tu vida… por
            dentro sientes que te estás alejando de quien realmente eres en
            esencia.
          </p>
        </div>

        <ul className="frec-dolor__grid" data-reveal-group data-reveal-fade>
          {sintomas.map((item, i) => (
            <li key={i} className="frec-dolor__card">
              <span className="frec-dolor__num" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="frec-dolor__icon" aria-hidden="true">
                {item.icon}
              </span>
              <p className="frec-dolor__text">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="frec-twist" data-reveal>
          <span className="frec-twist__label">Porque llega un punto</span>
          <p className="frec-twist__text">
            Donde seguir consumiendo contenido espiritual{" "}
            <em>no llena el vacío</em>.
          </p>
        </div>

        <div className="frec-close">
          <p className="frec-close__emphasis" data-reveal="title">
            Solo volver a ti puede regresarte a la coherencia, la paz y la
            plenitud.
          </p>

          <div className="frec-close__body" data-reveal>
            <p>
              Y a manifestar una vida que ames todos los días, desde un lugar
              que ya no tengas que sostener a la fuerza.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
