import { Fragment } from "react";

type Step = { label: string; note: string };

/**
 * Architecture flow diagram, rendered as semantic HTML rather than an image
 * so it stays readable to screen readers, scales on mobile, and never
 * ships a bitmap. Horizontal on wide screens, vertical on narrow.
 */
export default function Pipeline({
  title,
  steps,
}: {
  title: string;
  steps: Step[];
}) {
  return (
    <figure className="not-prose">
      <figcaption className="eyebrow">{title}</figcaption>

      <ol className="mt-6 flex flex-col gap-0 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-0">
        {steps.map((s, i) => (
          <Fragment key={s.label}>
            <li className="relative flex-1 lg:min-w-[9rem]">
              <div className="h-full rounded-md border border-line bg-raised/60 px-4 py-4">
                <span className="font-mono text-[10px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1.5 text-base font-medium leading-snug text-fg">
                  {s.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-subtle">
                  {s.note}
                </p>
              </div>
            </li>

            {/* Connector: chevron between rows on mobile, arrow between columns on desktop */}
            {i < steps.length - 1 && (
              <li
                aria-hidden
                className="flex shrink-0 items-center justify-center py-1.5 text-subtle lg:px-2 lg:py-0"
              >
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </figure>
  );
}
