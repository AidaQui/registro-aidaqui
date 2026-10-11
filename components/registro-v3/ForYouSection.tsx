import { useScrollReveal } from "@/hooks/useScrollReveal";

// A quién le sirve el entrenamiento. Era el párrafo de arriba de la lista
// ("Un entrenamiento espiritual en el que comprenderás"), con el mismo fondo:
// se leía como parte de ella. Ahora va sobre un panel de vidrio naranja que
// lo separa, con el remate en un renglón propio para que se destaque.
export default function ForYouSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="rv3-for-you" aria-label="A quién está dirigido">
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
