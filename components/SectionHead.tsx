import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Every home section opens the same way: a heavy rule, the § number in the
 * margin column, and a serif title across the content columns.
 */
export default function SectionHead({
  n,
  label,
  title,
  children,
}: {
  n: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal className="doc border-t border-rule-strong pt-5">
      <p className="label lg:col-span-3 lg:pt-3">
        <span className="text-signal">§ {n}</span> — {label}
      </p>
      <div className="lg:col-span-9">
        <h2 className="display text-[clamp(2.6rem,6.2vw,5.25rem)]">{title}</h2>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
      </div>
    </Reveal>
  );
}
