// Separador sobre la costura entre dos secciones: filete con las mismas
// estrellas ✦ de los botones. Va dos veces, debajo de la hero y entre la
// lista ("Un entrenamiento espiritual en el que comprenderás") y la
// audiencia, que son claras las dos y sin él se leían como una sola. Va entre
// las secciones (y no dentro de la de abajo) porque éstas recortan lo que
// sobresale con overflow hidden, y el adorno queda mitad en cada una.
export default function StarDivider() {
  return (
    <div className="rv3-divider" aria-hidden="true">
      <span className="rv3-divider__line" />
      <span className="rv3-divider__stars">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </span>
      <span className="rv3-divider__line" />
    </div>
  );
}
