import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Every section opens the same way: a roman numeral and small-caps label
 * on a short gold rule, then a serif title that slides up out of a mask.
 */
export default function SectionHead({
  n,
  eyebrow,
  title,
  aside,
  center = false,
}: {
  n: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-8 ${
        center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"
      }`}
    >
      <div className={center ? "flex flex-col items-center" : ""}>
        <Reveal>
          <p className="smallcaps flex items-center gap-4">
            <span className="font-display text-[19px] tracking-[0.08em] normal-case">N° {n}</span>
            <span aria-hidden className="h-px w-10 bg-gold/50" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal variant="mask" delay={0.05} className="mt-6">
          <h2 className={`display text-[clamp(2.7rem,6vw,5.6rem)] ${center ? "mx-auto max-w-4xl" : "max-w-4xl"}`}>
            {title}
          </h2>
        </Reveal>
      </div>
      {aside && <Reveal delay={0.15}>{aside}</Reveal>}
    </div>
  );
}
