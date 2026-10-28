import type { CSSProperties } from "react";

type Step = { label: string; note: string };

/**
 * Architecture flow, drawn as a signal path: numbered nodes on one line.
 * Semantic HTML rather than an image, so it reads aloud, reflows, and never
 * ships a bitmap. Runs across on wide screens and down on narrow ones.
 */
export default function Pipeline({
  title,
  steps,
  figure,
}: {
  title: string;
  steps: Step[];
  figure: string;
}) {
  return (
    <figure>
      <ol
        className="relative grid lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-x-4"
        style={{ "--n": steps.length } as CSSProperties}
      >
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={s.label} className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-8 last:pb-0 lg:block lg:pb-0">
              {!last && (
                <>
                  {/* down to the next node (narrow) */}
                  <span aria-hidden className="absolute top-9 bottom-0 left-[1.125rem] w-px bg-rule-strong lg:hidden" />
                  {/* across to the next node (wide) */}
                  <span
                    aria-hidden
                    className="absolute top-[1.125rem] left-9 hidden h-px w-[calc(100%-1.25rem)] bg-rule-strong lg:block"
                  />
                </>
              )}
              <span
                className={`relative z-10 grid size-9 place-items-center rounded-full border bg-paper font-mono text-[12px] ${
                  i === 0 || last ? "border-signal text-signal" : "border-rule-strong text-ink"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5 lg:pt-0 lg:pr-2">
                <p className="font-medium leading-snug lg:mt-4">{s.label}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.note}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-8 border-t border-rule pt-3 font-mono text-[11.5px] text-subtle">
        {figure} — {title}
      </figcaption>
    </figure>
  );
}
