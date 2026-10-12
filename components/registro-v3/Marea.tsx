import type { CSSProperties } from "react";

// Fondo del cierre: un mar en calma visto de lejos, hecho sólo con sombras.
// Cada ola es una franja con la línea de la cresta (con un brillo celeste
// apenas visible) y una sombra que cae debajo y se desvanece. Las de arriba
// son finas y lentas y las de abajo más anchas y algo más rápidas: así se
// lee la perspectiva hacia el horizonte. A lo largo de cada franja la ola
// crece y se aplana, y la sombra se aclara y oscurece por tramos, para que
// no se lean como rayas. Cada franja se corre de costado (deriva) y sube y
// baja (vaivén) con tiempos distintos, para que nunca coincidan. Sólo se
// animan transforms: el SVG se dibuja una vez y después el navegador sólo
// lo mueve. El movimiento está en el CSS (.rv3-marea).

type Ola = {
  top: number; // % del alto de la sección donde arranca la franja
  largo: number; // px que mide el dibujo antes de repetirse
  vueltas: [number, number, number]; // ondas que suman la cresta, en vueltas por largo
  amplitud: number; // px que sube y baja la cresta
  sombra: number; // px que cae la sombra debajo de la cresta
  desenfoque: number; // blur de la franja entera, en px
  opacidad: number;
  deriva: number; // s que tarda en correrse un largo entero
  vaiven: number; // s de cada subida o bajada
  fase: number; // desfase de la cresta, de los tramos y del vaivén
};

const OLAS: Ola[] = [
  { top: 34, largo: 960, vueltas: [4, 7, 11], amplitud: 5, sombra: 20, desenfoque: 2.5, opacidad: 0.7, deriva: 170, vaiven: 5, fase: 0 },
  { top: 43, largo: 1200, vueltas: [4, 6, 9], amplitud: 8, sombra: 28, desenfoque: 3.5, opacidad: 0.8, deriva: 165, vaiven: 6, fase: 2.1 },
  { top: 53, largo: 1440, vueltas: [3, 5, 8], amplitud: 11, sombra: 40, desenfoque: 5, opacidad: 0.88, deriva: 160, vaiven: 6.8, fase: 4.4 },
  { top: 64, largo: 1680, vueltas: [3, 5, 7], amplitud: 15, sombra: 52, desenfoque: 6.5, opacidad: 0.95, deriva: 155, vaiven: 7.8, fase: 1.3 },
  { top: 77, largo: 1920, vueltas: [3, 4, 7], amplitud: 20, sombra: 70, desenfoque: 8, opacidad: 1, deriva: 150, vaiven: 8.8, fase: 3.6 },
];

// Cuánto se nota la ola en cada punto del largo (de 0,35 a 1): una vuelta
// por largo, así empalma al repetirse.
const intensidad = (t: number, fase: number) => 0.675 + 0.325 * Math.sin(t + fase);

// La cresta suma tres ondas con vueltas enteras por largo: no es una
// senoide perfecta, pero empalma sin corte al repetirse.
function cresta({ largo, vueltas: [a, b, c], amplitud, fase }: Ola, base: number) {
  const pasos = Math.round(largo / 8);
  const puntos: string[] = [];
  for (let i = 0; i <= pasos; i++) {
    const x = (largo * i) / pasos;
    const t = (2 * Math.PI * x) / largo;
    const onda =
      0.6 * Math.sin(a * t + fase) + 0.3 * Math.sin(b * t + 1.1 + fase) + 0.1 * Math.sin(c * t + 2.3);
    const y = base - amplitud * intensidad(t, fase) * onda;
    puntos.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${puntos.join(" L")}`;
}

// La misma intensidad, como degradé horizontal para la máscara de la franja
function tramos(fase: number) {
  return Array.from({ length: 13 }, (_, i) => {
    const offset = i / 12;
    return { offset, opacidad: intensidad(2 * Math.PI * offset, fase) };
  });
}

export default function Marea() {
  return (
    <div className="rv3-marea" aria-hidden="true">
      {OLAS.map((ola, i) => {
        // Margen arriba para el brillo y el blur; debajo, toda la sombra
        const base = ola.amplitud + ola.desenfoque * 3 + 2;
        const alto = Math.ceil(base + ola.amplitud + ola.sombra + ola.desenfoque * 3);
        const linea = cresta(ola, base);
        const id = `rv3-ola-${i}`;

        return (
          <div
            key={id}
            className="rv3-ola"
            style={
              {
                "--top": `${ola.top}%`,
                "--alto": `${alto}px`,
                "--largo": `${ola.largo}px`,
                "--amplitud": `${ola.amplitud}px`,
                "--opacidad": ola.opacidad,
                "--deriva": `${ola.deriva}s`,
                "--vaiven": `${ola.vaiven}s`,
                "--fase": `${(-ola.fase * 2.3).toFixed(1)}s`,
              } as CSSProperties
            }
          >
            <div className="rv3-ola__tira">
              <svg width="100%" height={alto}>
                <defs>
                  <linearGradient
                    id={`${id}-sombra`}
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1={base - ola.amplitud}
                    x2="0"
                    y2={base + ola.amplitud + ola.sombra}
                  >
                    <stop offset="0" stopColor="rgb(14, 24, 20)" stopOpacity="0.75" />
                    <stop offset="0.4" stopColor="rgb(14, 24, 20)" stopOpacity="0.38" />
                    <stop offset="1" stopColor="rgb(14, 24, 20)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id={`${id}-tramos`}
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2={ola.largo}
                    y2="0"
                  >
                    {tramos(ola.fase).map(({ offset, opacidad }) => (
                      <stop key={offset} offset={offset.toFixed(3)} stopColor="#fff" stopOpacity={opacidad.toFixed(3)} />
                    ))}
                  </linearGradient>
                  <mask id={`${id}-mascara`} maskUnits="userSpaceOnUse" x="0" y="0" width={ola.largo} height={alto}>
                    <rect width={ola.largo} height={alto} fill={`url(#${id}-tramos)`} />
                  </mask>
                  <pattern id={`${id}-patron`} patternUnits="userSpaceOnUse" width={ola.largo} height={alto}>
                    <g mask={`url(#${id}-mascara)`}>
                      <path d={`${linea} L${ola.largo},${alto} L0,${alto} Z`} fill={`url(#${id}-sombra)`} />
                      <path
                        d={linea}
                        fill="none"
                        stroke="rgb(207, 221, 228)"
                        strokeOpacity="0.24"
                        strokeWidth="2"
                        transform="translate(0 -1.5)"
                      />
                    </g>
                  </pattern>
                  <filter id={`${id}-blur`} x="0" y="-20%" width="100%" height="140%">
                    <feGaussianBlur stdDeviation={ola.desenfoque} />
                  </filter>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${id}-patron)`} filter={`url(#${id}-blur)`} />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
