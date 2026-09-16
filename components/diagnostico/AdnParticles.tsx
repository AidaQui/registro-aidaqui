import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hebras de ADN en partículas, para el fondo del hero.
 *
 * NO ES LA HÉLICE DEL ESCANEO. Aquella (MolecularDnaAnimation) es una pieza
 * central, grande y en cian: cuenta algo —"te estamos analizando"— y pide que
 * la mires. Estas son laterales, lentas y tenues. Su único trabajo es que el
 * violeta no sea un plano liso, y tienen que perder siempre contra el titular.
 *
 * ── CÁMARA ORTOGRÁFICA, Y ES LA DECISIÓN QUE SOSTIENE TODO LO DEMÁS ──
 *
 * Con perspectiva, una hebra colocada al fondo se proyecta hacia el centro por
 * mucho que se la aparte en X: acababan amontonadas sobre el titular, que es
 * el sitio exacto que hay que dejar libre. Y su tamaño en pantalla dependía de
 * la distancia, así que quedaban demasiado pequeñas para leerse como hélices.
 *
 * En ortográfica, X en el mundo es X en pantalla y el tamaño no depende de la
 * profundidad. El encuadre se mide en fracciones de la caja visible, de modo
 * que el pasillo central queda libre en cualquier proporción de pantalla.
 *
 * ── EL BRILLO ES UN DATO, NO UN CÁLCULO ──
 *
 * Cada hebra trae el suyo en un atributo. La versión anterior lo deducía de la
 * profundidad en espacio de vista con una ventana escrita a ojo, y esa ventana
 * no coincidía con dónde estaban las hebras: el campo entero se dibujaba con
 * alfa cero. Un valor explícito no se puede desincronizar de la escena.
 */

type Props = {
  className?: string;
  /** Cuántas hebras se reparten por los lados. */
  strands?: number;
  /** Puntos por cadena. Más = hebra continua, menos = granulada. */
  pointsPerStrand?: number;
  /** Opacidad global. Es un fondo: va baja. */
  opacity?: number;
  /** Multiplicador de velocidad de giro. */
  speed?: number;
  /** Tamaño base del punto, en píxeles antes del pixel ratio. */
  dotSize?: number;
  color?: string;
  colorTwo?: string;
};

const TAU = Math.PI * 2;

/* Media altura del encuadre, en unidades de mundo. El ancho sale de la
   proporción de la pantalla, así que este número fija la escala de todo. */
const MEDIA_ALTURA = 5;

/* Pasillo libre en el centro, en fracción de la media anchura. Ahí va el
   titular y es lo único que tiene que leerse. */
const PASILLO = 0.52;

/* Semilla fija: el reparto se decide una vez y es el mismo en cada carga. Con
   Math.random() la composición cambiaba al recargar y alguna salía encima del
   titular. */
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
  uniform float uTamBase;
  uniform float uMediaAncho;

  attribute vec3 aCentro;  // x,y en fracción del encuadre
  attribute vec3 aHebra;   // x: radio, y: largo, z: vueltas
  attribute vec3 aMovim;   // x: fase, y: giro, z: balanceo
  attribute float aT;      // 0..1 a lo largo de la hebra
  attribute float aLado;   // 0 o 1: las dos cadenas
  attribute float aTam;
  attribute float aMezcla;
  attribute float aBrillo;

  varying float vMezcla;
  varying float vBrillo;
  varying float vFrente;

  void main() {
    float angulo =
      aT * aHebra.z * ${TAU.toFixed(6)}
      + aMovim.x
      + uTime * aMovim.y
      + aLado * ${Math.PI.toFixed(6)};

    /* La X se resuelve aquí y no en la geometría: depende de la anchura del
       encuadre, que cambia con el tamaño de la ventana. Guardada en el buffer
       habría que reconstruirlo en cada resize. */
    vec3 pos;
    pos.x = aCentro.x * uMediaAncho;
    pos.y = aCentro.y * ${MEDIA_ALTURA.toFixed(1)};
    pos.z = 0.0;

    pos.x += cos(angulo) * aHebra.x;
    pos.z += sin(angulo) * aHebra.x;
    pos.y += (aT - 0.5) * aHebra.y;

    /* Balanceo lentísimo y distinto por hebra: sin él el conjunto parece un
       objeto rígido girando en bloque. */
    pos.y += sin(uTime * aMovim.z + aMovim.x) * 0.22;

    /* La cadena que en este instante pasa por delante se ve algo más clara.
       Es lo único que da volumen a la hélice sin usar profundidad real. */
    vFrente = 0.62 + 0.38 * (sin(angulo) * 0.5 + 0.5);

    vMezcla = aMezcla;
    vBrillo = aBrillo;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aTam * uTamBase * uPixelRatio;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uColorDos;
  uniform float uOpacidad;

  varying float vMezcla;
  varying float vBrillo;
  varying float vFrente;

  void main() {
    /* El punto es un cuadrado: sin redondearlo se ven cuadraditos, que sobre
       un degradado suave cantan muchísimo. */
    float d = length(gl_PointCoord - 0.5);
    float disco = 1.0 - smoothstep(0.16, 0.5, d);
    if (disco <= 0.001) discard;

    vec3 color = mix(uColor, uColorDos, vMezcla);
    gl_FragColor = vec4(color, disco * vBrillo * vFrente * uOpacidad);
  }
`;

const fragmentShaderBarras = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uColorDos;
  uniform float uOpacidad;

  varying float vMezcla;
  varying float vBrillo;
  varying float vFrente;

  void main() {
    vec3 color = mix(uColor, uColorDos, vMezcla);
    /* Las barras van más tenues que los puntos: son la estructura, no el
       dibujo. Al mismo peso la hebra se lee como una escalera maciza. */
    gl_FragColor = vec4(color, vBrillo * vFrente * uOpacidad * 0.28);
  }
`;

export default function AdnParticles({
  className,
  strands = 6,
  pointsPerStrand = 70,
  opacity = 0.55,
  speed = 1,
  dotSize = 2.2,
  color = "#b79ae8",
  colorTwo = "#f0c98a",
}: Props) {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

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
    /* Los planos de recorte van holgados: la hélice se mueve en Z y no hay
       nada que ganar apretándolos. */
    const camara = new THREE.OrthographicCamera(-1, 1, 1, -1, -20, 20);

    /* ── Geometría ── */

    const rnd = aleatorio(20260916);
    const porCadena = pointsPerStrand;
    const totalPuntos = strands * porCadena * 2;

    const centro = new Float32Array(totalPuntos * 3);
    const hebra = new Float32Array(totalPuntos * 3);
    const movim = new Float32Array(totalPuntos * 3);
    const t = new Float32Array(totalPuntos);
    const lado = new Float32Array(totalPuntos);
    const tam = new Float32Array(totalPuntos);
    const mezcla = new Float32Array(totalPuntos);
    const brillo = new Float32Array(totalPuntos);
    const posicionFalsa = new Float32Array(totalPuntos * 3);

    /* Una barra cada seis puntos: todas serían una escalera maciza. */
    const PASO_BARRA = 6;
    const totalBarras = strands * Math.floor(porCadena / PASO_BARRA) * 2;

    const bCentro = new Float32Array(totalBarras * 3);
    const bHebra = new Float32Array(totalBarras * 3);
    const bMovim = new Float32Array(totalBarras * 3);
    const bT = new Float32Array(totalBarras);
    const bLado = new Float32Array(totalBarras);
    const bTam = new Float32Array(totalBarras);
    const bMezcla = new Float32Array(totalBarras);
    const bBrillo = new Float32Array(totalBarras);
    const bPosicionFalsa = new Float32Array(totalBarras * 3);

    let i = 0;
    let ib = 0;

    for (let h = 0; h < strands; h++) {
      /* Alterna izquierda y derecha, y siempre fuera del pasillo central.
         En fracción del encuadre: 0 es el centro y 1 el borde. */
      const ladoX = h % 2 === 0 ? -1 : 1;
      const cx = ladoX * (PASILLO + rnd() * (0.98 - PASILLO));
      const cy = (rnd() - 0.5) * 1.1;

      const radio = 0.52 + rnd() * 0.46;
      const largo = 3.1 + rnd() * 2.4;
      const vueltas = 1.5 + rnd() * 1.2;
      const fase = rnd() * TAU;
      /* El signo alterna: dos hebras vecinas girando igual se leen como una
         sola pieza desplazada. */
      const giro = (0.1 + rnd() * 0.14) * (rnd() > 0.5 ? 1 : -1) * speed;
      const balanceo = (0.1 + rnd() * 0.16) * speed;
      const mezclaHebra = rnd();
      /* Unas más presentes que otras: es lo que da capas al campo. */
      const brilloHebra = 0.42 + rnd() * 0.58;

      for (let p = 0; p < porCadena; p++) {
        const tt = porCadena === 1 ? 0.5 : p / (porCadena - 1);
        /* Los extremos se apagan para que la hebra no termine en un corte
           recto: entra y sale del fondo en vez de aparecer cortada. */
        const desvanecido = Math.pow(Math.sin(tt * Math.PI), 0.6);

        for (let s = 0; s < 2; s++) {
          centro[i * 3] = cx;
          centro[i * 3 + 1] = cy;
          hebra[i * 3] = radio;
          hebra[i * 3 + 1] = largo;
          hebra[i * 3 + 2] = vueltas;
          movim[i * 3] = fase;
          movim[i * 3 + 1] = giro;
          movim[i * 3 + 2] = balanceo;
          t[i] = tt;
          lado[i] = s;
          tam[i] = 0.75 + rnd() * 0.6;
          mezcla[i] = Math.min(1, Math.max(0, mezclaHebra + (rnd() - 0.5) * 0.5));
          brillo[i] = brilloHebra * desvanecido;
          i++;
        }

        if (p % PASO_BARRA === 0 && ib + 1 < totalBarras) {
          for (let s = 0; s < 2; s++) {
            bCentro[ib * 3] = cx;
            bCentro[ib * 3 + 1] = cy;
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
            bBrillo[ib] = brilloHebra * desvanecido;
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
        mezcla: Float32Array; brillo: Float32Array; falsa: Float32Array;
      }
    ) {
      /* `position` no se usa —todo sale del shader— pero three lo necesita
         para calcular el volumen delimitador. Se deja en ceros y se le da una
         esfera enorme a mano: sin ella three lo toma por un punto y el
         recorte por frustum se lleva el campo entero fuera de pantalla. */
      geo.setAttribute("position", new THREE.BufferAttribute(d.falsa, 3));
      geo.setAttribute("aCentro", new THREE.BufferAttribute(d.centro, 3));
      geo.setAttribute("aHebra", new THREE.BufferAttribute(d.hebra, 3));
      geo.setAttribute("aMovim", new THREE.BufferAttribute(d.movim, 3));
      geo.setAttribute("aT", new THREE.BufferAttribute(d.t, 1));
      geo.setAttribute("aLado", new THREE.BufferAttribute(d.lado, 1));
      geo.setAttribute("aTam", new THREE.BufferAttribute(d.tam, 1));
      geo.setAttribute("aMezcla", new THREE.BufferAttribute(d.mezcla, 1));
      geo.setAttribute("aBrillo", new THREE.BufferAttribute(d.brillo, 1));
      geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1e4);
    }

    const geoPuntos = new THREE.BufferGeometry();
    armar(geoPuntos, {
      centro, hebra, movim, t, lado, tam, mezcla, brillo, falsa: posicionFalsa,
    });

    const geoBarras = new THREE.BufferGeometry();
    armar(geoBarras, {
      centro: bCentro, hebra: bHebra, movim: bMovim, t: bT, lado: bLado,
      tam: bTam, mezcla: bMezcla, brillo: bBrillo, falsa: bPosicionFalsa,
    });

    const uniformes = {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uTamBase: { value: dotSize },
      uMediaAncho: { value: MEDIA_ALTURA },
      uColor: { value: new THREE.Color(color) },
      uColorDos: { value: new THREE.Color(colorTwo) },
      uOpacidad: { value: opacity },
    };

    const comun = {
      uniforms: uniformes,
      vertexShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      /* Aditiva: sobre el violeta profundo los puntos se suman como luz. En
         modo normal quedan como pegatinas mates encima del degradado. */
      blending: THREE.AdditiveBlending,
    };

    const matPuntos = new THREE.ShaderMaterial({ ...comun, fragmentShader });
    const matBarras = new THREE.ShaderMaterial({
      ...comun,
      fragmentShader: fragmentShaderBarras,
    });

    const puntos = new THREE.Points(geoPuntos, matPuntos);
    const barras = new THREE.LineSegments(geoBarras, matBarras);
    /* Las barras primero: son la estructura y van por debajo de los puntos. */
    escena.add(barras);
    escena.add(puntos);

    /* ── Tamaño ── */

    const medir = () => {
      const { clientWidth: w, clientHeight: h } = contenedor;
      if (!w || !h) return;
      /* Tope en 1.5: por encima no se distingue nada en un fondo a media
         opacidad, y en un móvil de 3x triplica el trabajo para nada. */
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      uniformes.uPixelRatio.value = dpr;

      const mediaAncho = MEDIA_ALTURA * (w / h);
      camara.left = -mediaAncho;
      camara.right = mediaAncho;
      camara.top = MEDIA_ALTURA;
      camara.bottom = -MEDIA_ALTURA;
      camara.updateProjectionMatrix();
      uniformes.uMediaAncho.value = mediaAncho;
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
      tiempo += Math.min((ahora - ultimo) / 1000, 0.05);
      ultimo = ahora;
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

    const limpiar = () => {
      parar();
      observadorTam.disconnect();
      geoPuntos.dispose();
      geoBarras.dispose();
      matPuntos.dispose();
      matBarras.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };

    if (movimientoReducido.matches) {
      /* Un fotograma y quieto: el campo sigue estando, simplemente no se
         mueve. Apagarlo del todo dejaría el hero más pobre sin necesidad. */
      renderer.render(escena, camara);
      return limpiar;
    }

    /* Fuera de pantalla no se dibuja: el hero es lo primero de la página y en
       cuanto se baja al formulario deja de verse. */
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
      observadorVista.disconnect();
      document.removeEventListener("visibilitychange", alCambiarPestana);
      limpiar();
    };
  }, [strands, pointsPerStrand, opacity, speed, dotSize, color, colorTwo]);

  return <div ref={contenedorRef} className={className} aria-hidden="true" />;
}
