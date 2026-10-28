import type { CSSProperties } from "react";

type Step = { label: string; note: string };

/**
 * Architecture flow: gold lozenges strung on one line, each step in its
 * own glass cell. Semantic HTML rather than an image — it reads aloud,
 * reflows, and never ships a bitmap. Across on wide screens, down on narrow.
 */
export default function Pipeline({ title, steps, figure }: { title: string; steps: Step[]; figure: string }) {
  return (
    <figure>
      <ol
        className="relative grid gap-3 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-4"
        style={{ "--n": steps.length } as CSSProperties}
      >
        {/* The line the lozenges sit on (wide screens) */}
        <span aria-hidden className="absolute top-[7px] right-[8%] left-[8%] hidden h-px bg-gradient-to-r from-gold/20 via-gold/60 to-gold/20 lg:block" />
        {/* …and down the left edge (narrow screens) */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-gold/60 to-gold/10 lg:hidden" />

        {steps.map((s, i) => (
          <li key={s.label} className="relative pl-9 lg:pl-0 lg:pt-9">
            <span
              aria-hidden
              className={`absolute top-1 left-[2px] size-[11px] rotate-45 border bg-ink lg:top-[2px] lg:left-1/2 lg:-translate-x-1/2 ${
                i === 0 || i === steps.length - 1 ? "border-gold bg-gold" : "border-gold"
              }`}
            />
            <div className="glass h-full rounded-xl p-4">
              <p className="font-mono text-[11px] text-gold">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1.5 font-medium leading-snug">{s.label}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="smallcaps mt-6 !text-[10px] !text-subtle">
        {figure} — {title}
      </figcaption>
    </figure>
  );
}
