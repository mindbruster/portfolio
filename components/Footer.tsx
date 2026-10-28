import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/content";
import Mark from "./Mark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* The name, engraved across the foot of the page */}
      <p
        aria-hidden
        className="font-display pointer-events-none -mb-[0.2em] text-center text-[19vw] leading-[0.85] font-light tracking-[-0.04em] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
      >
        {profile.name}
      </p>
      <div className="relative border-t border-line bg-ink">
        <div className="page flex flex-col gap-5 py-8 text-[13.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Mark className="size-9" />
            <span>
              © {new Date().getFullYear()} {profile.name} · {profile.role}, {profile.location}
            </span>
          </p>
          <Link href="/#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-bright">
            Back to top
            <ArrowUp className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </footer>
  );
}
