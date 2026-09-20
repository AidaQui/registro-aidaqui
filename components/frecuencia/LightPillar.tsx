import { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * Columna de luz en WebGL, para el fondo de la tarjeta de precio.
 *
 * Adaptado de LightPillar (reactbits.dev). Cambios respecto al original:
 *
 *   1. TypeScript, que es lo que usa el proyecto.
 *   2. El CSS va en globals.css —ver .frec-precio__pillar—, no en un archivo
 *      aparte: aquí no hay módulos CSS por componente.
 *   3. Se detiene cuando la tarjeta no está a la vista o la pestaña pasa a
 *      segundo plano. El original pinta mientras esté montado, y esto vive a
 *      media página: sin la pausa consume batería durante todo el rato que
 *      alguien pasa leyendo lo de arriba.
 *   4. Respeta prefers-reduced-motion: con esa preferencia pinta un
 *      fotograma y se queda quieto.
 *
 * El original traía además un modo claro y los efectos de ratón: los dos se
 * retiran porque aquí la pieza es fondo de una tarjeta oscura y nadie va a
 * interactuar con ella.
 */

type Calidad = "low" | "medium" | "high";

type LightPillarProps = {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  pillarRotation?: number;
  quality?: Calidad;
  className?: string;
};

type Ajustes = {
  iterations: number;
  waveIterations: number;
  pixelRatio: number;
  precision: "mediump" | "highp";
  stepMultiplier: number;
};

export default function LightPillar({
  topColor = "#5227FF",
  bottomColor = "#FF9FFC",
  intensity = 1,
  rotationSpeed = 0.3,
  glowAmount = 0.005,
  pillarWidth = 3,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  pillarRotation = 0,
  quality = "high",
  className,
}: LightPillarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contenedor = containerRef.current;
    if (!contenedor) return;

    const ancho = contenedor.clientWidth;
    const alto = contenedor.clientHeight;

    const escena = new THREE.Scene();
    const camara = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    /* El shader es caro por píxel: en móvil y en equipos de pocos núcleos se
       baja de calidad antes de intentarlo siquiera. */
    const esMovil =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const esModesto =
      esMovil ||
      (typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4);

    let calidadReal: Calidad = quality;
    if (esModesto && quality === "high") calidadReal = "medium";
    if (esMovil && quality !== "low") calidadReal = "low";

    const porCalidad: Record<Calidad, Ajustes> = {
      low: {
        iterations: 24,
        waveIterations: 1,
        pixelRatio: 0.5,
        precision: "mediump",
        stepMultiplier: 1.5,
      },
      medium: {
        iterations: 40,
        waveIterations: 2,
        pixelRatio: 0.65,
        precision: "mediump",
        stepMultiplier: 1.2,
      },
      high: {
        iterations: 80,
        waveIterations: 4,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        precision: "highp",
        stepMultiplier: 1,
      },
    };

    const ajustes = porCalidad[calidadReal];

    /* Si el contexto no se puede crear, no se pinta nada y se sale: la pieza
       es decoración, así que la ausencia del efecto es el respaldo correcto.
       No se toca el estado desde aquí —hacerlo dentro de un efecto encadena
       renders—, simplemente no se monta el lienzo. */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference:
          calidadReal === "high" ? "high-performance" : "low-power",
        precision: ajustes.precision,
        stencil: false,
        depth: false,
      });
    } catch {
      return;
    }

    renderer.setSize(ancho, alto);
    renderer.setPixelRatio(ajustes.pixelRatio);
    contenedor.appendChild(renderer.domElement);

    const aColor = (hex: string) => {
      const c = new THREE.Color(hex);
      return new THREE.Vector3(c.r, c.g, c.b);
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision ${ajustes.precision} float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin;
      uniform float uWaveCos;
      varying vec2 vUv;

      const float STEP_MULT = ${ajustes.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${ajustes.iterations};
      const int WAVE_ITER = ${ajustes.waveIterations};

      void main() {
        vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        uv = vec2(uPillarRotCos * uv.x - uPillarRotSin * uv.y, uPillarRotSin * uv.x + uPillarRotCos * uv.y);

        vec3 ro = vec3(0.0, 0.0, -10.0);
        vec3 rd = normalize(vec3(uv, 1.0));

        float rotC = uRotCos;
        float rotS = uRotSin;

        vec3 col = vec3(0.0);
        float t = 0.1;

        for(int i = 0; i < MAX_ITER; i++) {
          vec3 p = ro + rd * t;
          p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

          vec3 q = p;
          q.y = p.y * uPillarHeight + uTime;

          float freq = 1.0;
          float amp = 1.0;
          for(int j = 0; j < WAVE_ITER; j++) {
            q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z, uWaveSin * q.x + uWaveCos * q.z);
            q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
            freq *= 2.0;
            amp *= 0.5;
          }

          float d = length(cos(q.xz)) - 0.2;
          float bound = length(p.xz) - uPillarWidth;
          float k = 4.0;
          float h = max(k - abs(d - bound), 0.0);
          d = max(d, bound) + h * h * 0.0625 / k;
          d = abs(d) * 0.15 + 0.01;

          float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
          col += mix(uBottomColor, uTopColor, grad) / d;

          t += d * STEP_MULT;
          if(t > 50.0) break;
        }

        float widthNorm = uPillarWidth / 3.0;
        col = tanh(col * uGlowAmount / widthNorm);

        col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;

        gl_FragColor = vec4(clamp(col * uIntensity, 0.0, 1.0), 1.0);
      }
    `;

    const rotRad = (pillarRotation * Math.PI) / 180;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(ancho, alto) },
        uTopColor: { value: aColor(topColor) },
        uBottomColor: { value: aColor(bottomColor) },
        uIntensity: { value: intensity },
        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity },
        uRotCos: { value: 1 },
        uRotSin: { value: 0 },
        uPillarRotCos: { value: Math.cos(rotRad) },
        uPillarRotSin: { value: Math.sin(rotRad) },
        uWaveSin: { value: Math.sin(0.4) },
        uWaveCos: { value: Math.cos(0.4) },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const geometria = new THREE.PlaneGeometry(2, 2);
    escena.add(new THREE.Mesh(geometria, material));

    const quieto = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let tiempo = 0;
    let frame = 0;
    let visible = false;
    let ultimo = performance.now();
    const fps = calidadReal === "low" ? 30 : 60;
    const porFotograma = 1000 / fps;

    const pintar = () => {
      material.uniforms.uTime.value = tiempo;
      material.uniforms.uRotCos.value = Math.cos(tiempo * 0.3);
      material.uniforms.uRotSin.value = Math.sin(tiempo * 0.3);
      renderer.render(escena, camara);
    };

    const bucle = (ahora: number) => {
      const delta = ahora - ultimo;
      if (delta >= porFotograma) {
        tiempo += 0.016 * rotationSpeed;
        pintar();
        ultimo = ahora - (delta % porFotograma);
      }
      frame = requestAnimationFrame(bucle);
    };

    /* Un fotograma de salida para que la tarjeta nunca se vea en negro. */
    pintar();

    const arrancar = () => {
      if (quieto || frame) return;
      ultimo = performance.now();
      frame = requestAnimationFrame(bucle);
    };

    const parar = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(
      ([entrada]) => {
        visible = entrada.isIntersecting;
        if (visible && !document.hidden) arrancar();
        else parar();
      },
      { threshold: 0 }
    );
    observer.observe(contenedor);

    const alCambiarVisibilidad = () => {
      if (document.hidden) parar();
      else if (visible) arrancar();
    };
    document.addEventListener("visibilitychange", alCambiarVisibilidad);

    let temporizadorResize: number | null = null;
    const alRedimensionar = () => {
      if (temporizadorResize) window.clearTimeout(temporizadorResize);
      temporizadorResize = window.setTimeout(() => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        renderer.setSize(w, h);
        material.uniforms.uResolution.value.set(w, h);
        pintar();
      }, 150);
    };
    window.addEventListener("resize", alRedimensionar, { passive: true });

    return () => {
      parar();
      observer.disconnect();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      window.removeEventListener("resize", alRedimensionar);
      if (temporizadorResize) window.clearTimeout(temporizadorResize);

      renderer.dispose();
      renderer.forceContextLoss();
      if (contenedor.contains(renderer.domElement)) {
        contenedor.removeChild(renderer.domElement);
      }
      material.dispose();
      geometria.dispose();
    };
  }, [
    quality,
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    pillarRotation,
  ]);

  /* El contenedor se monta siempre: si WebGL falla, el efecto queda dentro
     del try y el div sencillamente se queda vacío. Un aviso de error en mitad
     de una tarjeta de precio sería peor que la ausencia del efecto. */
  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
