import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  BatteryLow,
  Ear,
  Lock,
  Heart,
  UserRoundX,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const symptoms = [
  {
    icon: Compass,
    text: (
      <>
        Te cuesta sentir <em>claridad y dirección</em>
      </>
    ),
  },
  {
    icon: BatteryLow,
    text: (
      <>
        Sientes <em>agotamiento emocional</em> o energético
      </>
    ),
  },
  {
    icon: Ear,
    text: (
      <>
        Tu intuición te pide <em>cambios que aún no sabes cómo hacer</em>
      </>
    ),
  },
  {
    icon: Lock,
    text: (
      <>
        Has trabajado mucho en ti… pero <em>algo sigue bloqueado</em>
      </>
    ),
  },
  {
    icon: Heart,
    text: (
      <>
        Quieres volver a sentir <em>conexión</em> contigo, con Dios y con tu verdad
      </>
    ),
  },
  {
    icon: UserRoundX,
    text: (
      <>
        Ya no te identificas con <em>la versión que estás sosteniendo</em>
      </>
    ),
  },
];

export default function PainSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Hook — fade + slide from bottom
      gsap.from(".pain-hook", {
        scrollTrigger: {
          trigger: ".pain-hook",
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        filter: "blur(6px)",
        duration: 0.9,
        ease: "power3.out",
      });

      // Bridge paragraphs
      gsap.from(".pain-bridge", {
        scrollTrigger: {
          trigger: ".pain-bridge",
          start: "top 85%",
        },
        opacity: 0,
        y: 24,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power3.out",
      });

      // Each symptom item — staggered from bottom + icon pop
      const items = section.querySelectorAll<HTMLElement>(".pain-item");
      items.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
          },
          opacity: 0,
          y: 20,
          duration: 0.65,
          delay: i * 0.06,
          ease: "power2.out",
        });

        // icon subtle pop with slight rotation
        const icon = item.querySelector(".pain-item__icon");
        if (icon) {
          gsap.from(icon, {
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
            },
            scale: 0.5,
            opacity: 0,
            rotation: -10,
            duration: 0.5,
            delay: i * 0.06 + 0.15,
            ease: "back.out(1.7)",
          });
        }
      });

      // Close block
      gsap.from(".pain-close", {
        scrollTrigger: {
          trigger: ".pain-close",
          start: "top 85%",
        },
        opacity: 0,
        y: 24,
        filter: "blur(4px)",
        duration: 0.8,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pain-section"
      aria-labelledby="pain-title"
    >
      <div className="pain-shell">

        <p className="pain-hook" id="pain-title">
          Lo que estás sintiendo no es casualidad…
        </p>

        <div className="pain-bridge">
          <p>
            Hay momentos donde una identidad ya no puede sostener el{" "}
            <em>siguiente nivel de tu alma.</em>
          </p>
          <p>
            Y aunque por fuera continúes con tu vida… por dentro sientes que te
            estás alejando de quien realmente eres en esencia.
          </p>
        </div>

        <div className="pain-list-wrapper">
          <div className="pain-orb" aria-hidden="true" />
          <div className="pain-list-glass">
            <ul className="pain-list" aria-label="Señales que podrías estar sintiendo">
              {symptoms.map(({ icon: Icon, text }, i) => (
                <li key={i} className="pain-item">
                  <span className="pain-item__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="pain-item__text">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pain-close">
          <p className="pain-close__body">
            Porque llega un punto donde seguir consumiendo contenido espiritual
            no llena el vacío.
          </p>
          <p className="pain-close__emphasis">
            Solo volver a ti puede regresarte a la coherencia, la paz, la
            plenitud y a manifestar una vida que ames todos los días.
          </p>
        </div>

      </div>
    </section>
  );
}
