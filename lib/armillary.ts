/**
 * The armillary sphere: a dark glass core (the model) inside seven gilt
 * rings (the layers built around it). Plain three.js, loaded on demand, so
 * the page paints before any 3D code arrives.
 */
import type * as T from "three";

export type ArmillaryHandle = {
  /** Light one ring (its index in `rings`), or none. `strength` 0–1 sets how far the others step back. */
  setActive: (i: number | null, strength?: number) => void;
  destroy: () => void;
};

type Options = {
  /** Seconds to hold the entrance, e.g. while an intro curtain is up. */
  delay?: number;
  /** DOM labels, one per ring, positioned every frame onto their ring. */
  labels?: (HTMLElement | null)[];
  reducedMotion?: boolean;
  /** Called once the first frame has rendered. */
  onReady?: () => void;
};

const TILT = (23.4 * Math.PI) / 180; // the ecliptic's tilt — real armillaries use it
const BASE_GLOW = 0.07; // warmth every ring keeps, lit or not

export async function createArmillary(canvas: HTMLCanvasElement, opts: Options = {}): Promise<ArmillaryHandle> {
  const THREE = await import("three");
  const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.035);
  scene.environment = envRT.texture;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0.35, 14);

  const key = new THREE.DirectionalLight(0xffe4b5, 2.4);
  key.position.set(5, 6, 7);
  const rim = new THREE.DirectionalLight(0xd8b56c, 1.6);
  rim.position.set(-7, -3, -5);
  const fill = new THREE.DirectionalLight(0xfff1d6, 1.1);
  fill.position.set(0, -6, 6); // from below, for the flat rings seen edge-on
  scene.add(key, rim, fill, new THREE.AmbientLight(0x2a2a2a, 0.6));

  // root ← pointer tilt; frame ← the instrument's own axial tilt
  const root = new THREE.Group();
  const frame = new THREE.Group();
  frame.rotation.z = -0.32;
  root.add(frame);
  scene.add(root);
  const fixed = new THREE.Group(); // horizon and meridian stay put
  const sky = new THREE.Group(); // everything inside turns about the axis
  frame.add(fixed, sky);

  const disposables: { dispose: () => void }[] = [envRT, pmrem];
  const track = <D extends { dispose: () => void }>(d: D) => {
    disposables.push(d);
    return d;
  };

  const goldBase = new THREE.Color(0xd9b46a);
  const goldDim = new THREE.Color(0x5e4c2c);
  const makeGold = (roughness = 0.28) =>
    track(
      new THREE.MeshPhysicalMaterial({
        color: goldBase.clone(),
        // Not quite pure metal: a little diffuse keeps a ring from reflecting
        // the dark half of the room and going black at some angles
        metalness: 0.9,
        roughness,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        emissive: new THREE.Color(0xf3d48e),
        emissiveIntensity: BASE_GLOW,
        transparent: true,
        opacity: 0,
      }),
    );

  const R = 2.5;
  type Ring = { mesh: T.Mesh; mat: T.MeshPhysicalMaterial; anchor: T.Vector3; glow: number; delay: number };
  const rings: Ring[] = [];

  const torus = (radius: number, tube: number) => track(new THREE.TorusGeometry(radius, tube, 28, 320));
  const addRing = (
    parent: T.Group,
    geo: T.BufferGeometry,
    rot: [number, number, number],
    y = 0,
    anchorAngle = 0.6,
    anchorRadius = R,
  ) => {
    const mat = makeGold();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.set(...rot);
    mesh.position.y = y;
    parent.add(mesh);
    const anchor = new THREE.Vector3(Math.cos(anchorAngle) * anchorRadius, Math.sin(anchorAngle) * anchorRadius, 0);
    rings.push({ mesh, mat, anchor, glow: 0, delay: rings.length * 0.14 });
    return mesh;
  };

  const flat: [number, number, number] = [Math.PI / 2, 0, 0];
  const tropicR = R * Math.cos(TILT);
  const tropicY = R * Math.sin(TILT);

  // The seven rings, in the order of the content's `layers`
  addRing(fixed, torus(3.0, 0.05), flat, 0, 2.2, 3.0); //          0 horizon — safety screening
  addRing(fixed, torus(2.82, 0.042), [0, 0, 0], 0, 1.15, 2.82); // 1 meridian — semantic memory
  addRing(sky, torus(R, 0.032), flat, 0, -0.5); //                  2 equator — retrieval & grounding
  addRing(sky, track(new THREE.CylinderGeometry(R, R, 0.2, 320, 1, true)), [TILT, 0, 0], 0, 2.6); // 3 ecliptic band — routing
  addRing(sky, torus(tropicR, 0.024), flat, tropicY, 0.3, tropicR); // 4 tropic — fulfilment
  addRing(sky, torus(tropicR, 0.024), flat, -tropicY, 3.5, tropicR); // 5 tropic — cost
  addRing(sky, torus(R, 0.028), [0, Math.PI / 2, 0], 0, 1.9); //     6 colure — ledger

  // The ecliptic is a band, so its anchor sits on the band's rim in its own frame
  rings[3].anchor.set(Math.cos(2.6) * R, 0, Math.sin(2.6) * R);
  // Rings 0, 2, 4, 5 lie flat: their torus plane is XY rotated onto XZ, anchors already in local XY — fine.
  (rings[3].mat as T.MeshPhysicalMaterial).side = THREE.DoubleSide;

  // Decoration that carries no layer: polar circles, axis, pole caps, ticks
  const decoMat = makeGold(0.35);
  const polarR = R * Math.cos(Math.PI / 2 - TILT);
  for (const s of [1, -1]) {
    const m = new THREE.Mesh(torus(polarR, 0.016), decoMat);
    m.rotation.set(...flat);
    m.position.y = s * R * Math.sin(Math.PI / 2 - TILT);
    sky.add(m);
  }
  const axis = new THREE.Mesh(track(new THREE.CylinderGeometry(0.022, 0.022, 7.2, 16)), decoMat);
  frame.add(axis);
  for (const s of [1, -1]) {
    const cap = new THREE.Mesh(track(new THREE.SphereGeometry(0.085, 24, 24)), decoMat);
    cap.position.y = s * 3.6;
    frame.add(cap);
  }
  // Degree ticks round the equator: long every 30°, short every 5°
  const tickGeo = track(new THREE.BoxGeometry(0.012, 0.11, 0.012));
  const ticks = new THREE.InstancedMesh(tickGeo, decoMat, 72);
  const m4 = new THREE.Matrix4();
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const long = i % 6 === 0;
    m4.compose(
      new THREE.Vector3(Math.cos(a) * (R + 0.075), 0, Math.sin(a) * (R + 0.075)),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, -a + Math.PI / 2)),
      new THREE.Vector3(1, long ? 1.9 : 1, 1),
    );
    ticks.setMatrixAt(i, m4);
  }
  sky.add(ticks);

  // The core — the model: dark lacquered glass with a warm halo behind it
  const coreMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x0b0c10,
      roughness: 0.12,
      metalness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0,
    }),
  );
  const core = new THREE.Mesh(track(new THREE.SphereGeometry(0.8, 96, 96)), coreMat);
  frame.add(core);

  const haloCanvas = document.createElement("canvas");
  haloCanvas.width = haloCanvas.height = 256;
  const hg = haloCanvas.getContext("2d")!;
  const grad = hg.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(243,212,142,0.55)");
  grad.addColorStop(0.35, "rgba(216,181,108,0.18)");
  grad.addColorStop(1, "rgba(216,181,108,0)");
  hg.fillStyle = grad;
  hg.fillRect(0, 0, 256, 256);
  const haloTex = track(new THREE.CanvasTexture(haloCanvas));
  haloTex.colorSpace = THREE.SRGBColorSpace;
  const haloMat = track(
    new THREE.SpriteMaterial({ map: haloTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }),
  );
  const halo = new THREE.Sprite(haloMat);
  halo.scale.setScalar(4.2);
  frame.add(halo);

  // Gold dust drifting round the instrument
  const dustGeo = track(new THREE.BufferGeometry());
  const N = 520;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 3.6 + Math.random() * 3.2;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.7, r * Math.sin(ph) * Math.sin(th)], i * 3);
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dustMat = track(
    new THREE.PointsMaterial({ color: 0xe9cf93, size: 0.03, transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: true }),
  );
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // ---- sizing ------------------------------------------------------------
  let width = 1;
  let height = 1;
  const resize = () => {
    const parent = canvas.parentElement ?? canvas;
    width = Math.max(parent.clientWidth, 1);
    height = Math.max(parent.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the whole instrument in frame on tall, narrow screens
    const fitDistance = 14 * Math.max(1, 0.9 / camera.aspect);
    camera.userData.distance = fitDistance;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement ?? canvas);

  // ---- input -------------------------------------------------------------
  let px = 0;
  let py = 0;
  const onPointer = (e: PointerEvent) => {
    px = e.clientX / window.innerWidth - 0.5;
    py = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  let active: number | null = null;
  let strength = 1;

  // ---- loop --------------------------------------------------------------
  const clock = new THREE.Clock();
  let t = -(opts.delay ?? 0);
  let ready = false;
  const v = new THREE.Vector3();
  const reduced = !!opts.reducedMotion;
  const labels = opts.labels ?? [];

  const frameTick = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    t += dt;

    // Entrance: core first, then the rings one by one, then the dust
    const enter = reduced ? 10 : t;
    coreMat.opacity = Math.min(1, enter / 0.8);
    haloMat.opacity = Math.min(0.9, enter / 1.2) * (0.85 + Math.sin(t * 1.3) * 0.08);
    dustMat.opacity = Math.min(0.55, Math.max(0, (enter - 1.2) / 2));
    for (const r of rings) {
      const k = Math.min(1, Math.max(0, (enter - 0.3 - r.delay) / 0.9));
      const e = 1 - Math.pow(1 - k, 3);
      r.mesh.scale.setScalar(0.82 + 0.18 * e);
      // Highlight: the active ring glows, the others step back
      const target = active === null ? 0 : active === rings.indexOf(r) ? 1 : -1;
      r.glow += (target - r.glow) * Math.min(1, dt * 5);
      r.mat.emissiveIntensity = BASE_GLOW * (1 - Math.max(0, -r.glow) * 0.5 * strength) + Math.max(0, r.glow) * (0.45 + 0.5 * strength);
      r.mat.color.copy(goldBase).lerp(goldDim, Math.max(0, -r.glow) * 0.85 * strength);
      // Rings that step back also thin out, so the lit one carries the eye
      r.mat.opacity = e * (1 - Math.max(0, -r.glow) * 0.55 * strength);
    }
    // Decoration steps back with the unlit rings
    const decoTarget = Math.min(0.85, Math.max(0, (enter - 1) / 1)) * (active === null ? 1 : 1 - 0.55 * strength);
    decoMat.opacity += (decoTarget - decoMat.opacity) * Math.min(1, dt * 5);

    const dist = camera.userData.distance as number;
    const intro = reduced ? 1 : 1 - Math.pow(1 - Math.min(1, Math.max(0, t) / 2.4), 3);
    camera.position.z = dist + (1 - intro) * 3;

    if (!reduced) {
      sky.rotation.y += dt * 0.16;
      dust.rotation.y += dt * 0.02;
      root.rotation.y += ((px * 0.55 + Math.sin(t * 0.15) * 0.25) - root.rotation.y) * Math.min(1, dt * 2.2);
      root.rotation.x += ((py * 0.32 + 0.12) - root.rotation.x) * Math.min(1, dt * 2.2);
    } else {
      root.rotation.set(0.12, -0.25, 0);
    }

    renderer.render(scene, camera);

    // Labels ride on their rings; the far side fades back
    for (let i = 0; i < labels.length; i++) {
      const el = labels[i];
      const ring = rings[i];
      if (!el || !ring) continue;
      v.copy(ring.anchor);
      ring.mesh.localToWorld(v);
      const depth = v.clone().applyMatrix4(camera.matrixWorldInverse).z; // negative = in front of camera
      v.project(camera);
      const x = (v.x * 0.5 + 0.5) * width;
      const y = (-v.y * 0.5 + 0.5) * height;
      const front = THREE.MathUtils.clamp((-depth - (dist - 2.2)) / -4.4 + 1, 0, 1);
      const shown = ring.mat.opacity;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      // Labels on the right half point left, so none runs off the screen
      const side = x > width * 0.55 ? "left" : "right";
      if (el.dataset.side !== side) el.dataset.side = side;
      // Only the lit ring is named, so the instrument never reads as a diagram
      el.style.opacity = String(shown * (active === i ? 0.55 + 0.45 * front : 0));
    }

    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
  };

  // Only draw while on screen and the tab is visible
  let onScreen = true;
  const sync = () => renderer.setAnimationLoop(onScreen && !document.hidden ? frameTick : null);
  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    clock.getDelta();
    sync();
  });
  io.observe(canvas);
  document.addEventListener("visibilitychange", sync);
  sync();

  return {
    setActive(i, s = 1) {
      active = i;
      strength = s;
    },
    destroy() {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointer);
      for (const d of disposables) d.dispose();
      renderer.dispose();
    },
  };
}
