/**
 * Every colour CSS can't reach: the three.js instrument, the link-preview
 * images and the browser theme colour. Keep in step with the :root tokens
 * in app/globals.css, which own everything else.
 */
export const palette = {
  bg: "#0a0a0a",
  fg: "#e9ebee",
  muted: "#a0a4aa",
  accent: "#c5c9cf",
  accentBright: "#f2f4f7",
  instrument: {
    /** Ring colour */
    metal: "#b8bdc3",
    /** Rings that step back while another is lit */
    metalDim: "#555a61",
    /** Emissive colour of a lit ring */
    glow: "#eaf0f6",
    /** The core — the model */
    core: "#15171b",
    /** Light pooled behind the core */
    halo: "#bcc5cf",
    dust: "#d4d9df",
    keyLight: "#f6f8fb",
    rimLight: "#c6cfda",
    fillLight: "#d5d8dc",
  },
} as const;

/** "#rrggbb" → "rgba(r,g,b,a)" for canvas and inline styles. */
export function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
