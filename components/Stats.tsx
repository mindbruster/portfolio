import { stats } from "@/lib/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

/** Four figures, set large and light between the stage and the work. */
export default function Stats() {
  return (
    <section aria-label="By the numbers" className="relative border-t border-line">
      <div className="page">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className={`flex flex-col-reverse justify-end gap-3 py-12 lg:py-16 ${i % 2 ? "border-l border-line pl-6 lg:pl-10" : "pr-6"} ${
                i >= 2 ? "border-t border-line lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:pl-10" : ""}`}
            >
              <dt className="max-w-[14rem] text-[14.5px] leading-snug text-muted">{s.label}</dt>
              <dd className="display gold-text text-[clamp(3.6rem,6.4vw,6rem)] leading-none font-light">
                <CountUp value={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
