import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Campo de hebras de ADN en partículas, para el fondo del hero.
 *
 * NO ES LA HÉLICE DEL ESCANEO. Aquella (MolecularDnaAnimation) es una pieza
 * central, grande y en cian: cuenta algo —"te estamos analizando"— y pide que
 * la mires. Esto es lo contrario: varias hebras pequeñas, lejanas y lentas,
 * repartidas por el fondo. Su único trabajo es que el violeta no sea un plano
 * liso, y tiene que perder siempre contra el titular.
 *
 * ── POR QUÉ CASI TODO OCURRE EN EL SHADER ──
 *
 * Las posiciones no se recalculan en JavaScript en ningún fotograma. Cada
 * punto lleva su sitio en la hebra (`aT`), de qué lado va (`aSide`) y los
 * parámetros de su hebra, y la hélice se resuelve en el vértice a partir del
 * tiempo. Son dos llamadas de dibujo y cero trabajo por fotograma en la CPU.
 *
 * Importa porque el hero YA tiene un lienzo WebGL —los anillos—, así que este
 * es el segundo contexto gráfico de la misma pantalla. Se decidió a sabiendas;
 * lo que no se puede es que además cueste caro.
 *
 * ── LOS COLORES SON LOS DE LOS ANILLOS ──
 *
 * Lavanda y dorado, las mismas dos paradas. El hero solo admite un acento
 * dorado y conviene que aparezca siempre con la misma receta; si estas
 * partículas trajeran un tercer color, el fondo pasaría a tener tres voces.
 */

type Props = {
  className?: string;
  /** Cuántas hebras se reparten por el fondo. */
  strands?: number;
  /** Puntos por hebra y lado. Más = hebra más continua, menos = más granulada. */
  pointsPerStrand?: number;
  /** Opacidad global. Por defecto muy baja: es un fondo. */
  opacity?: number;
  /** Multiplicador de velocidad de giro. */
  speed?: number;
  color?: string;
  colorTwo?: string;
};

const TAU = Math.PI * 2;

/* Semilla fija: el reparto de las hebras se decide una vez y es el mismo en
   cada carga. Con Math.random() el fondo cambiaba de composición al recargar,
   y una de cada varias salía con dos hebras pisando el titular. */
function aleatorio(semilla: number) {
  let s = semilla;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;

  attribute vec3 aCentro;
  attribute vec3 aHebra;   // x: radio, y: largo, z: vueltas
  attribute vec3 aMovim;   // x: fase, y: giro, z: balanceo
  attribute float aT;      // 0..1 a lo largo de la hebra
  attribute float aLado;   // 0 o 1: las dos cadenas
  attribute float aTam;
  attribute float aMezcla;

  varying float vMezcla;
  varying float vAtenua;

  void main() {
    float angulo =
      aT * aHebra.z * ${TAU.toFixed(6)}
      + aMovim.x
      + uTime * aMovim.y
      + aLado * ${Math.PI.toFixed(6)};

    vec3 pos = aCentro;
    pos.x += cos(angulo) * aHebra.x;
    pos.z += sin(angulo) * aHebra.x;
    pos.y += (aT - 0.5) * aHebra.y;

    /* Un balanceo lentísimo, distinto por hebra, para que el conjunto no
       parezca un objeto rígido girando en bloque. */
    pos.y += sin(uTime * aMovim.z + aMovim.x) * 0.18;

    vec4 enVista = modelViewMatrix * vec4(pos, 1.0);

    /* Lo que está detrás se apaga: es lo que da profundidad al campo sin
       tener que ordenar nada ni escribir en el buffer de profundidad. */
    vAtenua = smoothstep(-9.0, -1.5, enVista.z);
    vMezcla = aMezcla;

    gl_Position = projectionMatrix * enVista;
    gl_PointSize = aTam * uPixelRatio * (7.0 / -enVista.z);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uColorDos;
  uniform float uOpacidad;

  varying float vMezcla;
  varying float vAtenua;

  void main() {
    /* El punto es un cuadrado: sin esto se ven cuadraditos, que sobre un
       degradado suave cantan muchísimo. */
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float disco = 1.0 - smoothstep(0.18, 0.5, d);
    if (disco <= 0.001) discard;

    vec3 color = mix(uColor, uColorDos, vMezcla);
    gl_FragColor = vec4(color, disco * vAtenua * uOpacidad);
  }
`;

/* Las barras entre las dos cadenas usan el mismo cálculo, sin el disco. */
const fragmentShaderBarras = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uColorDos;
  uniform float uOpacidad;

  varying float vMezcla;
  varying float vAtenua;

  void main() {
    vec3 color = mix(uColor, uColorDos, vMezcla);
    gl_FragColor = vec4(color, vAtenua * uOpacidad * 0.4);
  }
`;

export default function AdnParticles({
  className,
  strands = 7,
  pointsPerStrand = 54,
  opacity = 0.5,
  speed = 1,
  color = "#b79ae8",
  colorTwo = "#f0c98a",
}: Props) {
  const contenedorRef = useRef<HTMLDivElement>(null);

  /* Las props entran por dependencias y no por una ref: cambiar el número de
     hebras o los colores tiene que reconstruir la geometría, que es donde
     viven esos valores. En la práctica son constantes en la llamada, así que
     el efecto corre una sola vez. */
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    const o = { strands, pointsPerStrand, opacity, speed, color, colorTwo };

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      /* Sin WebGL el hero se queda con su degradado, que ya es un fondo
         terminado. No hay nada que degradar ni que avisar. */
      return;
    }

    renderer.setClearColor(0x000000, 0);
    contenedor.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const escena = new THREE.Scene();
    const camara = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camara.position.z = 7;

    /* ── Geometría: una hebra es dos cadenas de puntos y sus barras ── */

    const rnd = aleatorio(20260916);
    const porHebra = o.pointsPerStrand;
    const totalPuntos = o.strands * porHebra * 2;

    const centro = new Float32Array(totalPuntos * 3);
    const hebra = new Float32Array(totalPuntos * 3);
    const movim = new Float32Array(totalPuntos * 3);
    const t = new Float32Array(totalPuntos);
    const lado = new Float32Array(totalPuntos);
    const tam = new Float32Array(totalPuntos);
    const mezcla = new Float32Array(totalPuntos);
    const posicionFalsa = new Float32Array(totalPuntos * 3);

    /* Una barra cada cuántos puntos. Todas serían una escalera maciza. */
    const PASO_BARRA = 6;
    const barrasPorHebra = Math.floor(porHebra / PASO_BARRA);
    const totalBarras = o.strands * barrasPorHebra * 2;

    const bCentro = new Float32Array(totalBarras * 3);
    const bHebra = new Float32Array(totalBarras * 3);
    const bMovim = new Float32Array(totalBarras * 3);
    const bT = new Float32Array(totalBarras);
    const bLado = new Float32Array(totalBarras);
    const bTam = new Float32Array(totalBarras);
    const bMezcla = new Float32Array(totalBarras);
    const bPosicionFalsa = new Float32Array(totalBarras * 3);

    let i = 0;
    let ib = 0;

    for (let h = 0; h < o.strands; h++) {
      /* Repartidas a los lados y arriba: el centro del hero es del titular.
         El signo alterna para que no se amontonen todas en la misma mitad. */
      const ladoX = h % 2 === 0 ? -1 : 1;
      const cx = ladoX * (1.9 + rnd() * 2.6);
      const cy = (rnd() - 0.5) * 4.4;
      const cz = -1.5 - rnd() * 5.5;

      const radio = 0.28 + rnd() * 0.34;
      const largo = 1.8 + rnd() * 2.8;
      const vueltas = 1.4 + rnd() * 1.6;
      const fase = rnd() * TAU;
      /* El signo del giro alterna: dos hebras vecinas girando igual se leen
         como una sola pieza desplazada. */
      const giro = (0.09 + rnd() * 0.13) * (rnd() > 0.5 ? 1 : -1) * o.speed;
      const balanceo = (0.12 + rnd() * 0.18) * o.speed;
      const mezclaHebra = rnd();

      for (let p = 0; p < porHebra; p++) {
        const tt = porHebra === 1 ? 0.5 : p / (porHebra - 1);

        for (let s = 0; s < 2; s++) {
          centro[i * 3] = cx;
          centro[i * 3 + 1] = cy;
          centro[i * 3 + 2] = cz;
          hebra[i * 3] = radio;
          hebra[i * 3 + 1] = largo;
          hebra[i * 3 + 2] = vueltas;
          movim[i * 3] = fase;
          movim[i * 3 + 1] = giro;
          movim[i * 3 + 2] = balanceo;
          t[i] = tt;
          lado[i] = s;
          tam[i] = 1.5 + rnd() * 1.6;
          /* La mezcla varía un poco dentro de la hebra: con un único valor
             cada hebra sale de un color plano y parecen siete objetos
             pintados, no un campo. */
          mezcla[i] = Math.min(1, Math.max(0, mezclaHebra + (rnd() - 0.5) * 0.5));
          i++;
        }

        if (p % PASO_BARRA === 0 && ib + 1 < totalBarras) {
          for (let s = 0; s < 2; s++) {
            bCentro[ib * 3] = cx;
            bCentro[ib * 3 + 1] = cy;
            bCentro[ib * 3 + 2] = cz;
            bHebra[ib * 3] = radio;
            bHebra[ib * 3 + 1] = largo;
            bHebra[ib * 3 + 2] = vueltas;
            bMovim[ib * 3] = fase;
            bMovim[ib * 3 + 1] = giro;
            bMovim[ib * 3 + 2] = balanceo;
            bT[ib] = tt;
            bLado[ib] = s;
            bTam[ib] = 1;
            bMezcla[ib] = mezclaHebra;
            ib++;
          }
        }
      }
    }

    function armar(
      geo: THREE.BufferGeometry,
      d: {
        centro: Float32Array; hebra: Float32Array; movim: Float32Array;
        t: Float32Array; lado: Float32Array; tam: Float32Array;
        mezcla: Float32Array; falsa: Float32Array;
      }
    ) {
      /* `position` no se usa —todo sale del shader— pero three lo necesita
         para calcular el volumen delimitador. Se deja en ceros y se le da
         una esfera a mano: sin ella, three lo considera un punto y el
         recorte por frustum se lleva el campo entero fuera de pantalla. */
      geo.setAttribute("position", new THREE.BufferAttribute(d.falsa, 3));
      geo.setAttribute("aCentro", new THREE.BufferAttribute(d.centro, 3));
      geo.setAttribute("aHebra", new THREE.BufferAttribute(d.hebra, 3));
      geo.setAttribute("aMovim", new THREE.BufferAttribute(d.movim, 3));
      geo.setAttribute("aT", new THREE.BufferAttribute(d.t, 1));
      geo.setAttribute("aLado", new THREE.BufferAttribute(d.lado, 1));
      geo.setAttribute("aTam", new THREE.BufferAttribute(d.tam, 1));
      geo.setAttribute("aMezcla", new THREE.BufferAttribute(d.mezcla, 1));
      geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -3), 14);
    }

    const geoPuntos = new THREE.BufferGeometry();
    armar(geoPuntos, {
      centro, hebra, movim, t, lado, tam, mezcla, falsa: posicionFalsa,
    });

    const geoBarras = new THREE.BufferGeometry();
    armar(geoBarras, {
      centro: bCentro, hebra: bHebra, movim: bMovim, t: bT,
      lado: bLado, tam: bTam, mezcla: bMezcla, falsa: bPosicionFalsa,
    });

    const uniformes = {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uColor: { value: new THREE.Color(o.color) },
      uColorDos: { value: new THREE.Color(o.colorTwo) },
      uOpacidad: { value: o.opacity },
    };

    const comun = {
      uniforms: uniformes,
      vertexShader,
      transparent: true,
      depthWrite: false,
      /* Aditiva: sobre el violeta profundo, los puntos se suman como luz.
         En modo normal se verían como pegatinas mates encima del degradado. */
      blending: THREE.AdditiveBlending,
    };

    const matPuntos = new THREE.ShaderMaterial({ ...comun, fragmentShader });
    const matBarras = new THREE.ShaderMaterial({
      ...comun,
      fragmentShader: fragmentShaderBarras,
    });

    const puntos = new THREE.Points(geoPuntos, matPuntos);
    const barras = new THREE.LineSegments(geoBarras, matBarras);
    escena.add(puntos);
    escena.add(barras);

    /* ── Tamaño ── */

    /* Arrow y no `function`: las declaraciones se elevan, así que TypeScript
       no conserva dentro de ellas el estrechamiento de `contenedor` a no
       nulo que hicimos arriba. */
    const medir = () => {
      const { clientWidth: w, clientHeight: h } = contenedor;
      if (!w || !h) return;
      /* Tope en 1.5: por encima no se distingue nada en un fondo a media
         opacidad y en un móvil de 3x triplica el trabajo para nada. */
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      uniformes.uPixelRatio.value = dpr;
      camara.aspect = w / h;
      camara.updateProjectionMatrix();
    };

    medir();
    const observadorTam = new ResizeObserver(medir);
    observadorTam.observe(contenedor);

    /* ── Bucle ── */

    const movimientoReducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let animacion = 0;
    let visible = true;
    let ultimo = performance.now();
    let tiempo = 0;

    function dibujar(ahora: number) {
      animacion = requestAnimationFrame(dibujar);
      /* El delta se acota: al volver de una pestaña en segundo plano llega un
         salto de varios segundos y el campo daría un tirón. */
      const delta = Math.min((ahora - ultimo) / 1000, 0.05);
      ultimo = ahora;
      tiempo += delta;
      uniformes.uTime.value = tiempo;
      renderer.render(escena, camara);
    }

    function arrancar() {
      if (animacion || !visible) return;
      ultimo = performance.now();
      animacion = requestAnimationFrame(dibujar);
    }

    function parar() {
      if (!animacion) return;
      cancelAnimationFrame(animacion);
      animacion = 0;
    }

    if (movimientoReducido.matches) {
      /* Un fotograma y quieto: el campo sigue estando, simplemente no se
         mueve. Apagarlo del todo dejaría el hero más pobre sin necesidad. */
      uniformes.uTime.value = 0;
      renderer.render(escena, camara);
    } else {
      /* Fuera de pantalla no se dibuja: el hero es lo primero de la página y
         en cuanto se baja al formulario deja de verse. */
      const observadorVista = new IntersectionObserver(
        ([entrada]) => {
          visible = entrada.isIntersecting;
          if (visible) arrancar();
          else parar();
        },
        { threshold: 0 }
      );
      observadorVista.observe(contenedor);
      arrancar();

      const alCambiarPestana = () => {
        if (document.hidden) parar();
        else arrancar();
      };
      document.addEventListener("visibilitychange", alCambiarPestana);

      return () => {
        parar();
        observadorVista.disconnect();
        document.removeEventListener("visibilitychange", alCambiarPestana);
        observadorTam.disconnect();
        geoPuntos.dispose();
        geoBarras.dispose();
        matPuntos.dispose();
        matBarras.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    return () => {
      parar();
      observadorTam.disconnect();
      geoPuntos.dispose();
      geoBarras.dispose();
      matPuntos.dispose();
      matBarras.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [strands, pointsPerStrand, opacity, speed, color, colorTwo]);

  return <div ref={contenedorRef} className={className} aria-hidden="true" />;
}
