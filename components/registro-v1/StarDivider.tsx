// Separador sobre la costura entre la hero y la sección siguiente: filete
// con las mismas estrellas ✦ de los botones. Va entre las dos secciones (y
// no dentro de la de abajo) porque éstas recortan lo que sobresale con
// overflow hidden, y el adorno queda mitad en cada una.
export default function StarDivider() {
  return (
    <div className="ent-divider" aria-hidden="true">
      <span className="ent-divider__line" />
      <span className="ent-divider__stars">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </span>
      <span className="ent-divider__line" />
    </div>
  );
}
