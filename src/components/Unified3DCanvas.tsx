import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fundo 3D 60fps — sem travamento:
 * • Toda animação via GPU (vertex shader / uniforms)
 * • Zero loops CPU sobre vértices a cada frame
 * • Partículas luminosas com glow additive
 * • Grade digital ondulando por shader
 */

const GRID_VERT = /* glsl */ `
  uniform float uTime;
  void main() {
    vec3 p = position;
    float wave = sin(p.x * 0.18 + uTime * 0.9) * cos(p.y * 0.12 + uTime * 0.7) * 0.55;
    p.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const GRID_FRAG = /* glsl */ `
  void main() {
    gl_FragColor = vec4(0.0, 0.898, 1.0, 0.06);
  }
`;

export default function Unified3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = window.innerWidth < 768;

    // Fallback: sem WebGL → não faz nada
    try {
      const tc = document.createElement("canvas");
      if (!(tc.getContext("webgl") || tc.getContext("experimental-webgl"))) return;
    } catch { return; }

    /* ─── RENDERER ───────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.35);
    renderer.setPixelRatio(DPR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ─── CENA + CÂMERA ──────────── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05010f, 0.016);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 20);

    /* ─── GRADE DIGITAL (GPU) ─────── */
    const gridGeo = new THREE.PlaneGeometry(90, 170, 42, 62);
    const gridTime = { value: 0 };

    const gridMat = new THREE.ShaderMaterial({
      uniforms: { uTime: gridTime },
      vertexShader: GRID_VERT,
      fragmentShader: GRID_FRAG,
      wireframe: true,
      transparent: true,
    });

    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2.4;
    grid.position.set(0, -9, -13);
    scene.add(grid);

    /* ─── PARTÍCULAS ──────────────── */
    const ptCount = mobile ? 220 : 420;
    const positions = new Float32Array(ptCount * 3);
    const colors = new Float32Array(ptCount * 3);

    const pal = [
      [0.0, 0.898, 1.0],   // ciano
      [0.85, 0.28, 0.94],  // fúcsia
      [0.47, 0.23, 0.93],  // violeta
      [0.96, 0.97, 1.0],   // branco
    ];

    for (let i = 0; i < ptCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * -75 + 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 28 - 4;
      const c = pal[i % pal.length];
      colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    ptGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    // Textura radial para glow (criada uma única vez)
    const ptCanvas = document.createElement("canvas");
    ptCanvas.width = ptCanvas.height = 64;
    const ptCtx = ptCanvas.getContext("2d")!;
    const ptGrad = ptCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    ptGrad.addColorStop(0,    "rgba(255,255,255,1)");
    ptGrad.addColorStop(0.25, "rgba(0,229,255,0.75)");
    ptGrad.addColorStop(0.6,  "rgba(168,85,247,0.2)");
    ptGrad.addColorStop(1,    "rgba(0,0,0,0)");
    ptCtx.fillStyle = ptGrad;
    ptCtx.fillRect(0, 0, 64, 64);
    const ptTex = new THREE.CanvasTexture(ptCanvas);

    const ptMat = new THREE.PointsMaterial({
      size: mobile ? 0.36 : 0.46,
      map: ptTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.58,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    /* ─── INTERAÇÃO ───────────────── */
    let mx = 0, my = 0, scroll = 0;
    let camX = 0, camY = 0, camZ = 20;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll = max > 0 ? window.scrollY / max : 0;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("resize",    onResize);

    /* ─── LOOP ────────────────────── */
    const start = performance.now();
    let raf = 0;

    let lastFrame = 0;
    let running = true;
    const tick = (now: number) => {
      if (!running || document.hidden) return;

      // Evita renderizar frames acumulados quando o navegador fica ocupado.
      if (now - lastFrame < 20) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;

      const t = (now - start) / 1000;

      // Atualiza apenas o uniform — GPU faz o resto
      gridTime.value = t;

      // Drift suave das partículas (rotation = GPU-friendly)
      points.rotation.y = t * 0.005;
      points.position.y = Math.sin(t * 0.28) * 0.25;

      // Lerp suave da câmera (apenas 3 números, ultra leve)
      const tgX = mx * 1.2;
      const tgY = -scroll * 56 - my * 0.7;
      const tgZ = 20 + Math.sin(scroll * Math.PI) * 1.8;
      camX += (tgX - camX) * 0.04;
      camY += (tgY - camY) * 0.055;
      camZ += (tgZ - camZ) * 0.04;
      camera.position.set(camX, camY, camZ);
      camera.lookAt(mx * 0.35, camY - 1, -5);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    // Pausa quando a aba não está visível
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        lastFrame = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    raf = requestAnimationFrame(tick);

    /* ─── CLEANUP ─────────────────── */
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    onResize);
      document.removeEventListener("visibilitychange", onVis);
      ptTex.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      ptGeo.dispose();
      ptMat.dispose();
      scene.clear();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
