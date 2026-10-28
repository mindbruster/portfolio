import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";
import { palette, rgba } from "@/lib/palette";

/** Shared look for every link-preview image, in the site's palette. */
export const ogSize = { width: 1200, height: 630 };

const { bg, fg, muted, accent } = palette;

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

/* The logo (components/Mark.tsx), with the palette's literal colours —
   CSS variables don't exist inside the image renderer. */
function LogoMark({ size }: { size: number }) {
  const { accentBright } = palette;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" strokeLinecap="round">
      <g transform="rotate(-28 20 20)">
        <line x1="20" y1="0.9" x2="20" y2="39.1" stroke={accent} strokeWidth="0.9" strokeOpacity="0.7" />
        <circle cx="20" cy="0.9" r="1.1" fill={accent} />
        <circle cx="20" cy="39.1" r="1.1" fill={accent} />
        <ellipse cx="20" cy="20" rx="4.4" ry="17.4" stroke={accent} strokeWidth="1.2" strokeOpacity="0.55" />
        <path d="M2.4 20 A17.6 4.6 0 0 1 37.6 20" stroke={accentBright} strokeWidth="2" />
        <circle cx="20" cy="20" r="6.4" fill={accent} />
        <circle cx="18.3" cy="18.2" r="2.2" fill={accentBright} opacity="0.75" />
        <path d="M28.26 24.06 A17.6 4.6 0 0 1 11.74 24.06" stroke={bg} strokeWidth="4.4" strokeLinecap="butt" />
        <path d="M2.4 20 A17.6 4.6 0 0 0 37.6 20" stroke={accentBright} strokeWidth="2" />
      </g>
    </svg>
  );
}

/* The armillary as an engraving — the same instrument as the hero, flat. */
const S = 640;
function Instrument() {
  const ring = { fill: "none", stroke: accent, strokeWidth: 1.3 };
  return (
    <svg width={S} height={S} viewBox="0 0 200 200">
      <g transform="rotate(-18 100 100)">
        <line x1="100" y1="6" x2="100" y2="194" stroke={accent} strokeWidth="0.8" strokeOpacity="0.6" />
        <circle cx="100" cy="100" r="86" {...ring} strokeOpacity="0.75" />
        <ellipse cx="100" cy="100" rx="22" ry="76" {...ring} strokeOpacity="0.55" />
        <ellipse cx="100" cy="70" rx="70" ry="15" {...ring} strokeOpacity="0.5" />
        <ellipse cx="100" cy="130" rx="70" ry="15" {...ring} strokeOpacity="0.5" />
        <ellipse cx="100" cy="100" rx="76" ry="18" {...ring} strokeOpacity="0.7" />
        <g transform="rotate(-24 100 100)">
          <ellipse cx="100" cy="100" rx="76" ry="22" {...ring} strokeOpacity="0.6" />
          <ellipse cx="100" cy="100" rx="76" ry="27" {...ring} strokeOpacity="0.6" />
        </g>
        <circle cx="100" cy="100" r="20" fill={bg} stroke={accent} strokeWidth="0.8" />
        <ellipse cx="100" cy="100" rx="94" ry="24" {...ring} strokeWidth="1.8" strokeOpacity="0.95" />
      </g>
    </svg>
  );
}

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
          background: bg,
          color: fg,
          fontFamily: "Cormorant",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -150,
            top: -5,
            width: S,
            height: S,
            display: "flex",
            backgroundImage: `radial-gradient(circle, ${rgba(accent, 0.16)}, ${rgba(bg, 0)} 62%)`,
          }}
        >
          <Instrument />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${rgba(bg, 1)} 38%, ${rgba(bg, 0.2)} 75%, ${rgba(bg, 0)} 100%)`,
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
            <LogoMark size={60} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30 }}>{profile.name}</span>
              <span style={{ fontSize: 17, letterSpacing: 5, color: accent }}>{eyebrow.toUpperCase()}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: 128, lineHeight: 0.95, letterSpacing: -2 }}>
              {children}
            </div>
            {subtitle && <div style={{ marginTop: 22, fontSize: 38, color: muted, fontStyle: "italic" }}>{subtitle}</div>}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: muted }}>
            <div style={{ width: 56, height: 1, background: accent, display: "flex" }} />
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
  return <span style={{ fontStyle: "italic", color: accent }}>{children}</span>;
}
