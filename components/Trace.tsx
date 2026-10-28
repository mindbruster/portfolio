"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, trace, type Span } from "@/lib/content";

const ticks = [0, 400, 800, 1200, 1600];
const pct = (ms: number) => `${(ms / trace.total) * 100}%`;
const ms = (s: Span) => s.end - s.start;
const built = new Set(trace.spans.filter((s) => s.slug).map((s) => s.slug)).size;

function projectFor(span: Span) {
  return span.slug ? projects.find((p) => p.slug === span.slug) : undefined;
}

/**
 * Fig. 0 — a request traced end to end, drawn like an observability
 * waterfall. Every span links to the project where that layer was built;
 * the one grey, hatched span is the model.
 */
export default function Trace() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : trace.spans[active];
  const currentProject = current ? projectFor(current) : undefined;

  return (
    <figure className="crop rise border border-rule bg-raised shadow-[var(--shadow)]" style={{ animationDelay: "240ms" }}>
      {/* Figure chrome: reads like the header of a trace viewer */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-rule px-4 py-3 font-mono text-[11.5px] text-subtle sm:px-5">
        <span>
          <span className="text-signal">●</span> trace · POST /v1/answer · 200
        </span>
        <span>
          {trace.spans.length} spans · {(trace.spans.at(-1)!.end / 1000).toFixed(2)} s · {built} systems
        </span>
      </div>

      <div className="px-4 pt-4 pb-2 sm:px-5" onMouseLeave={() => setActive(null)}>
        {/* Column heads + time axis (axis hidden on small screens) */}
        <div className="hidden grid-cols-[10.5rem_7rem_1fr] gap-4 pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle md:grid">
          <span>Span</span>
          <span>Built in</span>
          <div className="relative h-4">
            {ticks.map((t) => (
              <span key={t} className="absolute -translate-x-1/2 normal-case first:translate-x-0" style={{ left: pct(t) }}>
                {t === 0 ? "0" : `${t}ms`}
              </span>
            ))}
          </div>
        </div>

        <ol className="relative">
          {/* Root span */}
          <li className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-t border-rule py-2 md:grid-cols-[10.5rem_7rem_1fr]">
            <span className="font-mono text-[13px]">request</span>
            <span className="font-mono text-[12px] text-subtle md:text-[13px]">—</span>
            <div className="relative col-span-2 h-3 md:col-span-1">
              <TickLines />
              <div
                className="draw absolute inset-y-0 rounded-[3px] border border-rule-strong"
                style={{ left: 0, width: pct(trace.spans.at(-1)!.end), animationDelay: "300ms" }}
              />
            </div>
          </li>

          {trace.spans.map((s, i) => {
            const p = projectFor(s);
            const isModel = !s.slug;
            const dim = active !== null && active !== i;
            const late = s.start / trace.total > 0.72;
            const row = (
              <>
                <span className="flex min-w-0 items-center font-mono text-[13px]">
                  <span aria-hidden className="mr-1.5 text-subtle">
                    {i === trace.spans.length - 1 ? "└" : "├"}
                  </span>
                  <span className={`truncate ${isModel ? "text-muted" : ""}`}>{s.name}</span>
                </span>
                <span className={`truncate text-right font-mono text-[12px] md:text-left md:text-[13px] ${isModel ? "text-subtle" : "text-muted"}`}>
                  {p ? p.name : "not mine"}
                </span>
                <div className="relative col-span-2 h-5 md:col-span-1">
                  <TickLines />
                  <div
                    className={`draw absolute inset-y-0 rounded-[3px] ${isModel ? "hatch" : "bg-signal-fill"}`}
                    style={{
                      left: pct(s.start),
                      width: `max(${pct(ms(s))}, 3px)`,
                      animationDelay: `${420 + (s.start / trace.total) * 1300}ms`,
                    }}
                  >
                    {isModel && (
                      <span className="absolute inset-0 flex items-center px-2 font-mono text-[11.5px] whitespace-nowrap text-ink">
                        the model — the easy part
                      </span>
                    )}
                  </div>
                  <span
                    className="absolute top-1/2 -translate-y-1/2 font-mono text-[11px] whitespace-nowrap text-subtle"
                    style={
                      late
                        ? { right: `calc(${100 - (s.start / trace.total) * 100}% + 6px)` }
                        : { left: `calc(${pct(s.end)} + 6px)` }
                    }
                  >
                    {ms(s).toLocaleString("en-US")}ms
                  </span>
                </div>
              </>
            );

            const cls = `grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-t border-rule py-2 transition-opacity duration-200 md:grid-cols-[10.5rem_7rem_1fr] ${
              dim ? "opacity-35" : ""
            }`;

            return (
              <li key={s.name + i}>
                {p ? (
                  <Link
                    href={`/work/${p.slug}`}
                    className={`${cls} -mx-2 rounded px-2 outline-offset-0 hover:bg-paper/60`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    aria-label={`${s.name}, built in ${p.name}: ${s.note}`}
                  >
                    {row}
                  </Link>
                ) : (
                  <div className={`${cls} -mx-2 px-2`} onMouseEnter={() => setActive(i)}>
                    {row}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Detail readout for the span under the pointer */}
      <div className="min-h-[4.75rem] border-t border-rule px-4 py-3.5 sm:px-5" aria-live="polite">
        {current ? (
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <p className="font-mono text-[12px] text-subtle">
                <span className={current.slug ? "text-signal" : ""}>{current.name}</span>
                {" · "}
                {current.start}→{current.end}ms
                {currentProject && <> · {currentProject.layer}</>}
              </p>
              <p className="mt-1 text-[15px] leading-snug">{current.note}</p>
            </div>
            {currentProject && (
              <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[12px] text-signal sm:inline-flex">
                {currentProject.name} case study <ArrowRight className="size-3.5" aria-hidden />
              </span>
            )}
          </div>
        ) : (
          <p className="text-[15px] leading-snug text-muted">
            <span className="hidden md:inline">Point at a span to see what it does and where I built it. </span>
            <span className="md:hidden">Tap a span to open the project where I built it. </span>
            The longest bar is the only one I didn&apos;t write.
          </p>
        )}
      </div>

      <figcaption className="border-t border-rule px-4 py-2.5 font-mono text-[11.5px] text-subtle sm:px-5">
        Fig. 0 — One request, end to end. A composite of production systems; timings are illustrative.
      </figcaption>
    </figure>
  );
}

/** Faint vertical gridlines at each axis tick, behind the bars. */
function TickLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {ticks.slice(1).map((t) => (
        <span key={t} className="absolute inset-y-[-8px] w-px bg-rule" style={{ left: pct(t) }} />
      ))}
    </div>
  );
}
