import { profile } from "@/lib/content";
import { Accent, ogCard, ogSize } from "@/lib/og";

export const alt = `${profile.name} — ${profile.thesis}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: `${profile.role} · Lahore`,
    children: (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>The model is</span>
        <div style={{ display: "flex" }}>
          <span>the&nbsp;</span>
          <Accent>easy part.</Accent>
        </div>
      </div>
    ),
  });
}
