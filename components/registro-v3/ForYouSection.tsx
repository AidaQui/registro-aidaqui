import { useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// A quién le sirve el entrenamiento. Era el párrafo de arriba de la lista
// ("Un entrenamiento espiritual en el que comprenderás"), con el mismo fondo:
// se leía como parte de ella. Ahora va sobre un panel de vidrio salvia que
// lo separa, con el remate en un renglón propio para que se destaque.
//
// Lo propio de la v3: detrás del panel cae cada tanto una gota y se abren
// ondas, achatadas como el agua vista de lejos (el mismo mar del cierre).
// El vidrio las difumina, así detrás del texto se leen como luz que pasa.
// Sólo se mueven mientras la sección está en pantalla: el vidrio tiene que
// volver a difuminar lo de atrás en cada cuadro.
export default function ForYouSection() {
  const ref = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const seccion = ref.current;
    if (!seccion) return;
    const io = new IntersectionObserver(([entrada]) => {
      seccion.classList.toggle("is-en-pantalla", entrada.isIntersecting);
    });
    io.observe(seccion);
    return () => io.disconnect();
  }, [ref]);

  return (
    <section ref={ref} className="rv3-for-you" aria-label="A quién está dirigido">
      <div className="rv3-ondas" aria-hidden="true">
        <span className="rv3-onda" />
        <span className="rv3-onda" />
        <span className="rv3-onda" />
      </div>

      <div className="rv3-for-you__glass" data-reveal>
        <p className="rv3-for-you__text">
          Si llevas años leyendo, meditando, haciendo terapias, cursos o
          formaciones espirituales, pero todavía hay situaciones en las que
          sabes perfectamente qué te pasa y aun así vuelves a reaccionar igual,{" "}
          <em>este entrenamiento es para ti.</em>
        </p>
      </div>
    </section>
  );
}
