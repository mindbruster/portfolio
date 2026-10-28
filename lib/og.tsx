import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, trace } from "@/lib/content";

/** Shared look for every link-preview image: the site's paper, ink and signal. */
export const ogSize = { width: 1200, height: 630 };

const paper = "#f1efe8";
const ink = "#17160f";
const muted = "#4f4c44";
const signal = "#e0522a";
const model = "#b9b5aa";
const rule = "rgba(23,22,15,0.16)";

async function fonts() {
  const dir = join(process.cwd(), "lib/og-fonts");
  const [regular, italic] = await Promise.all([
    readFile(join(dir, "InstrumentSerif-Regular.ttf")),
    readFile(join(dir, "InstrumentSerif-Italic.ttf")),
  ]);
  return [
    { name: "Instrument Serif", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Instrument Serif", data: italic, style: "italic" as const, weight: 400 as const },
  ];
}

/** The hero trace, shrunk to a strip: one row per span, the model in grey. */
function TraceStrip() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 520 }}>
      {trace.spans.map((s) => (
        <div key={s.name + s.start} style={{ display: "flex", height: 7, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: `${(s.start / trace.total) * 100}%`,
              width: `${Math.max(((s.end - s.start) / trace.total) * 100, 1.2)}%`,
              height: 7,
              borderRadius: 4,
              background: s.slug ? signal : model,
            }}
          />
        </div>
      ))}
    </div>
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
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
          color: ink,
          padding: "56px 64px",
          fontFamily: "Instrument Serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${rule}`,
            paddingBottom: 20,
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 34 }}>
              <div style={{ width: 12, height: 6, borderRadius: 3, background: signal }} />
              <div style={{ marginLeft: 9, width: 19, height: 6, borderRadius: 3, background: model }} />
              <div style={{ marginLeft: 24, width: 10, height: 6, borderRadius: 3, background: signal }} />
            </div>
            <span>{profile.name}</span>
          </div>
          <span style={{ color: muted, fontSize: 22, letterSpacing: 1 }}>{eyebrow}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 132,
              lineHeight: 0.98,
              letterSpacing: -2,
            }}
          >
            {children}
          </div>
          {subtitle && <div style={{ marginTop: 22, fontSize: 36, color: muted }}>{subtitle}</div>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <TraceStrip />
          <span style={{ fontSize: 22, color: muted }}>{host}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

/** Italic signal-coloured run inside an OG headline */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ fontStyle: "italic", color: "#bf3b18" }}>{children}</span>;
}
