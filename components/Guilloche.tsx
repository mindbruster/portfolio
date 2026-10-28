"use client";

import { useEffect, useRef } from "react";

type Ring = { kind: "ring"; R: number; A: number; n: number; K: number; alpha: number };
type Spiro = { kind: "spiro"; R: number; r: number; d: number; turns: number; alpha: number };
type Circle = { kind: "circle"; R: number; alpha: number };
type Layer = Ring | Spiro | Circle;

/* Radii are fractions of the canvas radius, so a pattern reads the same at
   any size. Tuned by eye against the dark page. */
const patterns: Record<"rosette" | "seal", Layer[]> = {
  rosette: [
    { kind: "ring", R: 0.745, A: 0.2, n: 15, K: 12, alpha: 0.3 },
    { kind: "ring", R: 0.455, A: 0.115, n: 11, K: 10, alpha: 0.36 },
    { kind: "spiro", R: 0.278, r: 0.1, d: 0.211, turns: 9, alpha: 0.6 },
    { kind: "circle", R: 0.96, alpha: 0.35 },
    { kind: "circle", R: 0.947, alpha: 0.35 },
  ],
  // Leaves a clear band at 0.69–0.81 for the legend and a core for the monogram
  seal: [
    { kind: "circle", R: 0.985, alpha: 0.7 },
    { kind: "circle", R: 0.965, alpha: 0.45 },
    { kind: "ring", R: 0.885, A: 0.05, n: 48, K: 6, alpha: 0.5 },
    { kind: "circle", R: 0.815, alpha: 0.55 },
    { kind: "ring", R: 0.53, A: 0.13, n: 12, K: 9, alpha: 0.32 },
  ],
};

const GOLD = "222,190,118";

function draw(canvas: HTMLCanvasElement, pattern: Layer[]) {
  const css = canvas.clientWidth;
  if (!css) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(css * dpr);
  canvas.height = Math.round(css * dpr);
  const g = canvas.getContext("2d");
  if (!g) return;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, css, css);

  const c = css / 2;
  const u = css / 2; // one radius
  // Thinner strokes on small canvases keep the engraving fine
  const lw = css < 400 ? 0.5 : 0.6;

  // Warm light behind the pattern
  const glow = g.createRadialGradient(c, c, 0, c, c, u);
  glow.addColorStop(0, "rgba(214,170,90,0.10)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = glow;
  g.fillRect(0, 0, css, css);

  for (const L of pattern) {
    g.strokeStyle = `rgba(${GOLD},${L.alpha})`;
    g.lineWidth = lw;
    if (L.kind === "circle") {
      g.beginPath();
      g.arc(c, c, L.R * u, 0, Math.PI * 2);
      g.stroke();
    } else if (L.kind === "ring") {
      // Interlaced sine rings: r(t) = R + A·sin(n·t), K copies phase-stepped
      const steps = 1600;
      for (let k = 0; k < L.K; k++) {
        const ph = (k / L.K) * ((2 * Math.PI) / L.n);
        g.beginPath();
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * Math.PI * 2;
          const r = (L.R + L.A * Math.sin(L.n * t)) * u;
          const x = c + r * Math.cos(t + ph);
          const y = c + r * Math.sin(t + ph);
          if (i) g.lineTo(x, y);
          else g.moveTo(x, y);
        }
        g.stroke();
      }
    } else {
      // Hypotrochoid — the spirograph flower at the heart
      const R = L.R * u, r = L.r * u, d = L.d * u;
      const steps = 2400 * L.turns;
      g.beginPath();
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2 * L.turns;
        const x = c + (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
        const y = c + (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
        if (i) g.lineTo(x, y);
        else g.moveTo(x, y);
      }
      g.stroke();
    }
  }
}

/**
 * An engraved guilloche rosette, drawn once to a canvas at device
 * resolution. Rotation and the engraving sweep are CSS, so after the first
 * paint it costs nothing per frame.
 */
export default function Guilloche({
  pattern = "rosette",
  className = "",
  engrave = true,
}: {
  pattern?: keyof typeof patterns;
  className?: string;
  engrave?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    draw(canvas, patterns[pattern]);
    let width = canvas.clientWidth;
    const ro = new ResizeObserver(() => {
      // Redraw only when the size really changes, not on every layout pass
      if (Math.abs(canvas.clientWidth - width) > 2) {
        width = canvas.clientWidth;
        draw(canvas, patterns[pattern]);
      }
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [pattern]);

  return <canvas ref={ref} aria-hidden className={`block aspect-square w-full ${engrave ? "engrave" : ""} ${className}`} />;
}
