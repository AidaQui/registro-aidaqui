import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./MolecularDnaAnimation.module.css";

type AtomMaterial =
  | "cyan"
  | "turquoise"
  | "blue"
  | "deepBlue"
  | "purple"
  | "violet"
  | "pink"
  | "pale"
  | "lightBlue";

type Atom = {
  x: number;
  y: number;
  z: number;
  radius: number;
  material: AtomMaterial;
};

type Props = {
  className?: string;
  loopDurationMs?: number;
  respectReducedMotion?: boolean;
};

const REFERENCE_ASPECT = 864 / 496;
const DEFAULT_LOOP_DURATION_MS = 4000;
const START_ROTATION = 0.44;
const CAMERA_HEIGHT = 5.22;
const BASE_PAIR_COUNT = 78;
const HELIX_LENGTH = 11.95;
const HELIX_RADIUS = 0.67;
const BASES_PER_TURN = 10.5;

const MATERIAL_COLORS: Record<AtomMaterial, string> = {
  cyan: "#00dcff",
  turquoise: "#08c9d8",
  blue: "#0878df",
  deepBlue: "#0539a8",
  purple: "#6e55d8",
  violet: "#9a66ee",
  pink: "#f2a4d1",
  pale: "#f7fcff",
  lightBlue: "#bdf3ff",
};

const BACKBONE_MATERIALS: AtomMaterial[] = [
  "cyan",
  "turquoise",
  "blue",
  "deepBlue",
  "lightBlue",
];

const SIDE_CLUSTER_MATERIALS: AtomMaterial[] = ["cyan", "turquoise", "blue"];

const BACKBONE_LINK_MATERIALS: AtomMaterial[] = [
  "cyan",
  "turquoise",
  "blue",
  "deepBlue",
];

const BRIDGE_MATERIALS: AtomMaterial[] = [
  "purple",
  "violet",
  "pink",
  "lightBlue",
  "pale",
];

function noise(seed: number) {
  const value = Math.sin(seed * 91.733 + 17.219) * 43758.5453123;
  return value - Math.floor(value);
}

function pick<T>(items: T[], seed: number) {
  return items[Math.floor(noise(seed) * items.length) % items.length];
}

function addAtom(
  atoms: Atom[],
  x: number,
  y: number,
  z: number,
  radius: number,
  material: AtomMaterial
) {
  atoms.push({ x, y, z, radius, material });
}

function interpolate(a: number[], b: number[], t: number) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function buildAtoms() {
  const atoms: Atom[] = [];
  const strandA: number[][] = [];
  const strandB: number[][] = [];
  const pairStep = HELIX_LENGTH / (BASE_PAIR_COUNT - 1);
  const angleStep = (Math.PI * 2) / BASES_PER_TURN;

  for (let index = 0; index < BASE_PAIR_COUNT; index += 1) {
    const x = -HELIX_LENGTH / 2 + index * pairStep;
    const theta = index * angleStep;

    for (let strand = 0; strand < 2; strand += 1) {
      const phase = theta + strand * Math.PI;
      const y = Math.cos(phase) * HELIX_RADIUS;
      const z = Math.sin(phase) * HELIX_RADIUS;
      const axialNudge = (noise(index * 3.17 + strand) - 0.5) * 0.028;
      const position = [x + axialNudge, y, z];
      const radialY = Math.cos(phase);
      const radialZ = Math.sin(phase);
      const tangentY = -Math.sin(phase);
      const tangentZ = Math.cos(phase);

      if (strand === 0) {
        strandA.push(position);
      } else {
        strandB.push(position);
      }

      addAtom(
        atoms,
        position[0],
        position[1],
        position[2],
        0.08 + noise(index * 4.3 + strand) * 0.018,
        pick(BACKBONE_MATERIALS, index + strand * 11)
      );

      addAtom(
        atoms,
        position[0] + (noise(index + strand * 19) - 0.5) * 0.06,
        position[1] + radialY * (0.09 + noise(index * 2.1 + strand) * 0.035),
        position[2] + radialZ * (0.09 + noise(index * 2.7 + strand) * 0.035),
        0.044 + noise(index * 5.7 + strand) * 0.018,
        pick(SIDE_CLUSTER_MATERIALS, index * 9 + strand)
      );

      addAtom(
        atoms,
        position[0] + (strand === 0 ? -0.052 : 0.052),
        position[1] + tangentY * (0.068 + noise(index * 6.1 + strand) * 0.03),
        position[2] + tangentZ * (0.068 + noise(index * 6.6 + strand) * 0.03),
        0.038 + noise(index * 7.2 + strand) * 0.014,
        pick(BACKBONE_LINK_MATERIALS, index * 13 + strand)
      );
    }

    const bridgeCount = 7;
    for (let bridge = 1; bridge <= bridgeCount; bridge += 1) {
      const t = bridge / (bridgeCount + 1);
      const a = strandA[index];
      const b = strandB[index];
      const [bx, by, bz] = interpolate(a, b, t);
      const lateralSeed = index * 17.43 + bridge;
      const axialOffset = (noise(lateralSeed) - 0.5) * 0.1;
      const softOffset = Math.sin(index * 0.73 + bridge * 0.9) * 0.025;
      const material = pick(BRIDGE_MATERIALS, index * 5.31 + bridge);

      addAtom(
        atoms,
        bx + axialOffset,
        by + softOffset,
        bz - softOffset * 0.8,
        0.039 + noise(index * 8.7 + bridge) * 0.02,
        material
      );
    }
  }

  for (let index = 0; index < BASE_PAIR_COUNT - 1; index += 1) {
    for (const strand of [strandA, strandB]) {
      const current = strand[index];
      const next = strand[index + 1];
      for (const t of [0.34, 0.67]) {
        const [x, y, z] = interpolate(current, next, t);
        addAtom(
          atoms,
          x + (noise(index * 12.9 + t) - 0.5) * 0.035,
          y,
          z,
          0.044 + noise(index * 10.4 + t) * 0.014,
          pick(BACKBONE_LINK_MATERIALS, index * 4.1 + t)
        );
      }
    }
  }

  return atoms;
}

export default function MolecularDnaAnimation({
  className = "",
  loopDurationMs = DEFAULT_LOOP_DURATION_MS,
  respectReducedMotion = true,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 2.2));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(-3.5, 4.2, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc6f7ff, 1.15);
    fillLight.position.set(4.5, -2.2, 5.4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.75);
    rimLight.position.set(1.5, 3, -6);
    scene.add(rimLight);

    const diagonalGroup = new THREE.Group();
    diagonalGroup.rotation.z = THREE.MathUtils.degToRad(29.5);
    scene.add(diagonalGroup);

    const moleculeGroup = new THREE.Group();
    moleculeGroup.rotation.x = START_ROTATION;
    diagonalGroup.add(moleculeGroup);

    const atomGeometry = new THREE.SphereGeometry(1, 24, 16);
    const atoms = buildAtoms();
    const atomGroups = new Map<AtomMaterial, Atom[]>();
    for (const atom of atoms) {
      const group = atomGroups.get(atom.material) ?? [];
      group.push(atom);
      atomGroups.set(atom.material, group);
    }

    const meshes: THREE.InstancedMesh[] = [];
    const materials: THREE.Material[] = [];
    const dummy = new THREE.Object3D();

    for (const [materialKey, materialAtoms] of atomGroups) {
      const material = new THREE.MeshPhysicalMaterial({
        color: MATERIAL_COLORS[materialKey],
        roughness: materialKey === "pale" ? 0.18 : 0.22,
        metalness: 0.02,
        clearcoat: 0.55,
        clearcoatRoughness: 0.28,
        emissive: MATERIAL_COLORS[materialKey],
        emissiveIntensity: materialKey === "deepBlue" ? 0.025 : 0.045,
      });
      materials.push(material);

      const mesh = new THREE.InstancedMesh(atomGeometry, material, materialAtoms.length);
      mesh.frustumCulled = false;

      materialAtoms.forEach((atom, index) => {
        dummy.position.set(atom.x, atom.y, atom.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(atom.radius);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
      });

      mesh.instanceMatrix.needsUpdate = true;
      moleculeGroup.add(mesh);
      meshes.push(mesh);
    }

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height || width / REFERENCE_ASPECT, 1);
      const aspect = width / height;
      const cameraWidth = CAMERA_HEIGHT * aspect;

      camera.left = -cameraWidth / 2;
      camera.right = cameraWidth / 2;
      camera.top = CAMERA_HEIGHT / 2;
      camera.bottom = -CAMERA_HEIGHT / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();

    const reducedMotion =
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let startTime: number | null = null;

    const render = (time: number) => {
      if (startTime === null) startTime = time;

      if (reducedMotion) {
        moleculeGroup.rotation.x = START_ROTATION;
      } else {
        const progress = ((time - startTime) % loopDurationMs) / loopDurationMs;
        moleculeGroup.rotation.x = START_ROTATION + progress * Math.PI * 2;
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      for (const mesh of meshes) {
        moleculeGroup.remove(mesh);
        mesh.dispose();
      }
      for (const material of materials) {
        material.dispose();
      }
      atomGeometry.dispose();
      renderer.dispose();
    };
  }, [loopDurationMs, respectReducedMotion]);

  return (
    <div
      ref={stageRef}
      className={`${styles.stage} ${className}`.trim()}
      aria-hidden="true"
      data-loop-duration-ms={loopDurationMs}
      data-reference-size="864x496"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
