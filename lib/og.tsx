import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

/** Shared look for every link-preview image: ink, ivory and gold. */
export const ogSize = { width: 1200, height: 630 };

const ink = "#08090c";
const ivory = "#ede7da";
const muted = "#a9a395";
const gold = "#d8b56c";

async function fonts() {
  const dir = join(process.cwd(), "lib/og-fonts");
  const [regular, italic] = await Promise.all([
    readFile(join(dir, "CormorantGaramond-Medium.ttf")),
    readFile(join(dir, "CormorantGaramond-Italic.ttf")),
  ]);
  return [
    { name: "Cormorant", data: regular, style: "normal" as const, weight: 500 as const },
    { name: "Cormorant", data: italic, style: "italic" as const, weight: 500 as const },
  ];
}

/* The site's rosette as SVG paths (the live site draws it on a canvas). */
function ring(c: number, u: number, R: number, A: number, n: number, K: number) {
  const out: string[] = [];
  for (let k = 0; k < K; k++) {
    const ph = (k / K) * ((2 * Math.PI) / n);
    let d = "";
    for (let i = 0; i <= 480; i++) {
      const t = (i / 480) * Math.PI * 2;
      const r = (R + A * Math.sin(n * t)) * u;
      d += `${i ? "L" : "M"}${(c + r * Math.cos(t + ph)).toFixed(1)} ${(c + r * Math.sin(t + ph)).toFixed(1)}`;
    }
    out.push(d);
  }
  return out;
}
function spiro(c: number, u: number) {
  const R = 0.278 * u, r = 0.1 * u, d = 0.211 * u;
  let p = "";
  const steps = 2600;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * 9;
    const x = c + (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
    const y = c + (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
    p += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return p;
}
const S = 760;
const rosette = [
  ...ring(S / 2, S / 2, 0.745, 0.2, 15, 12).map((d) => ({ d, o: 0.3 })),
  ...ring(S / 2, S / 2, 0.455, 0.115, 11, 10).map((d) => ({ d, o: 0.36 })),
  { d: spiro(S / 2, S / 2), o: 0.6 },
];

export async function ogCard({
  eyebrow,
  children,
  subtitle,
}: {
  eyebrow: string;
  children: React.ReactNode;
  subtitle?: string;
}) {
  const host = new URL(profile.site).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: ink,
          color: ivory,
          fontFamily: "Cormorant",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -200,
            top: -65,
            width: S,
            height: S,
            display: "flex",
            backgroundImage: "radial-gradient(circle, rgba(216,181,108,0.16), rgba(8,9,12,0) 65%)",
          }}
        >
          <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
            {rosette.map((r, i) => (
              <path key={i} d={r.d} fill="none" stroke={gold} strokeOpacity={r.o} strokeWidth={0.9} />
            ))}
            <circle cx={S / 2} cy={S / 2} r={S * 0.48} fill="none" stroke={gold} strokeOpacity={0.35} strokeWidth={1} />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(8,9,12,1) 38%, rgba(8,9,12,0.2) 75%, rgba(8,9,12,0) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "60px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 54,
                height: 54,
                borderRadius: 999,
                border: `1.5px solid ${gold}`,
                color: gold,
                fontSize: 26,
                letterSpacing: -2,
              }}
            >
              AA
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30 }}>{profile.name}</span>
              <span style={{ fontSize: 17, letterSpacing: 5, color: gold }}>{eyebrow.toUpperCase()}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: 128, lineHeight: 0.95, letterSpacing: -2 }}>
              {children}
            </div>
            {subtitle && <div style={{ marginTop: 22, fontSize: 38, color: muted, fontStyle: "italic" }}>{subtitle}</div>}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: muted }}>
            <div style={{ width: 56, height: 1, background: gold, display: "flex" }} />
            {host}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

/** Gilt italic run inside an OG headline */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ fontStyle: "italic", color: gold }}>{children}</span>;
}
