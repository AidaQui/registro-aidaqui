/**
 * Testimonios. VACÍA A PROPÓSITO, igual que en /activacion: no hay
 * testimonios de ESTA experiencia todavía y no se inventan ni se reciclan los
 * de la Academia ADN (otro producto). Mientras el array esté vacío no se
 * renderiza nada. La sección oscura "Quién te acompaña" (Av4Bio) ocupa su
 * lugar en el ritmo de la página.
 *
 * Al cargar testimonios reales hay que maquetarlos aquí con las tarjetas
 * blancas de .av4-bio__card.
 */

type Testimonio = {
  nombre: string;
  texto: string;
};

const TESTIMONIOS: Testimonio[] = [];

export default function Av4Testimonios() {
  if (TESTIMONIOS.length === 0) return null;

  return (
    <section className="av4-sec av4-sec--oscuro" aria-label="Testimonios">
      <ul className="av4-bio__fila">
        {TESTIMONIOS.map(({ nombre, texto }) => (
          <li key={nombre} className="av4-bio__card">
            <p>{texto}</p>
            <div className="av4-bio__firma">
              <span>{nombre}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
