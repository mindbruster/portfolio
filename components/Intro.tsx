import { profile } from "@/lib/content";
import Mark from "./Mark";

/**
 * The opening curtain: the mark, the name, an accent rule filling, then it lifts.
 * Pure CSS (see globals.css) and skipped after the first page of a session
 * by the inline script in the layout.
 */
export default function Intro() {
  return (
    <div aria-hidden className="intro fixed inset-0 z-[90] grid place-items-center bg-ink">
      <div className="intro-mark flex flex-col items-center">
        <Mark className="size-20" />
        <p className="font-display mt-6 text-[2rem] font-light tracking-tight">{profile.name}</p>
        <p className="smallcaps mt-2 !text-[10px] !text-muted">{profile.role}</p>
        <div className="mt-8 h-px w-44 overflow-hidden bg-line">
          <div className="intro-bar h-full bg-gradient-to-r from-accent-deep via-accent to-accent-bright" />
        </div>
      </div>
    </div>
  );
}
