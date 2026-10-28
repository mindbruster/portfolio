"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, trace, type Span } from "@/lib/content";

const pct = (ms: number) => `${(ms / trace.total) * 100}%`;
const end = trace.spans.at(-1)!.end;
const systems = new Set(trace.spans.filter((s) => s.slug).map((s) => s.slug)).size;
const projectFor = (s: Span) => (s.slug ? projects.find((p) => p.slug === s.slug) : undefined);

/**
 * One request, traced end to end, as a floating glass card. Every gold
 * span is a layer built in one of the projects and links to it; the grey,
 * hatched span is the model — the easy part.
 */
export default function TraceCard({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : trace.spans[active];
  const currentProject = current ? projectFor(current) : undefined;

  return (
    <figure className={`glass-solid rounded-[22px] ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5 font-mono text-[11px] text-subtle">
        <span className="pulse-gold size-1.5 rounded-full bg-gold" aria-hidden />
        <span className="text-muted">trace</span> · one request · {(end / 1000).toFixed(2)} s · {systems} systems
      </div>

      <ol className="px-3 py-2.5" onMouseLeave={() => setActive(null)}>
        {trace.spans.map((s, i) => {
          const p = projectFor(s);
          const isModel = !s.slug;
          const late = s.start / trace.total > 0.7;
          const row = (
            <>
              <span className={`truncate font-mono text-[11.5px] ${isModel ? "text-subtle" : "text-ivory/90"}`}>{s.name}</span>
              <span className="relative h-[9px]">
                <span
                  className={`draw absolute inset-y-0 rounded-full ${isModel ? "hatch" : "gold-bar"}`}
                  style={{
                    left: pct(s.start),
                    width: `max(${pct(s.end - s.start)}, 4px)`,
                    animationDelay: `${900 + (s.start / trace.total) * 1400}ms`,
                  }}
                />
                {isModel && (
                  <span className="font-display absolute top-1/2 left-[24%] -translate-y-1/2 pt-px text-[13px] whitespace-nowrap text-ivory/85 italic">
                    the model — the easy part
                  </span>
                )}
                {!isModel && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 font-mono text-[10px] whitespace-nowrap text-subtle"
                    style={late ? { right: `calc(${100 - (s.start / trace.total) * 100}% + 6px)` } : { left: `calc(${pct(s.end)} + 6px)` }}
                  >
                    {s.end - s.start}ms
                  </span>
                )}
              </span>
            </>
          );
          const cls = `grid grid-cols-[7.4rem_1fr] items-center gap-3 rounded-lg px-2 py-[7px] transition-[opacity,background-color] duration-300 ${
            active !== null && active !== i ? "opacity-30" : ""
          }`;
          return (
            <li key={s.name + i}>
              {p ? (
                <Link
                  href={`/work/${p.slug}`}
                  className={`${cls} hover:bg-white/[0.04]`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  aria-label={`${s.name}, built in ${p.name}: ${s.note}`}
                >
                  {row}
                </Link>
              ) : (
                <div className={cls} onMouseEnter={() => setActive(i)}>
                  {row}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <figcaption className="min-h-[4.6rem] border-t border-line px-5 py-3.5" aria-live="polite">
        {current ? (
          <>
            <p className="flex items-center justify-between gap-3 font-mono text-[11px]">
              <span className={current.slug ? "text-gold" : "text-subtle"}>
                {current.name}
                {currentProject && <span className="text-subtle"> · {currentProject.name}</span>}
              </span>
              {currentProject && (
                <span className="inline-flex items-center gap-1 text-gold">
                  open <ArrowRight className="size-3" aria-hidden />
                </span>
              )}
            </p>
            <p className="mt-1 text-[14px] leading-snug text-muted">{current.note}</p>
          </>
        ) : (
          <p className="text-[14px] leading-snug text-muted">
            Every <span className="text-gold">gold</span>{" "}span is a layer I built. The grey one is the only part I didn&apos;t —
            <span className="text-subtle"> timings illustrative.</span>
          </p>
        )}
      </figcaption>
    </figure>
  );
}
