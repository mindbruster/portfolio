import { principles, profile } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Replaces the old "Services" block. A job-seeking engineer needs to show
 * judgement, not sell packages — so these are decisions from real projects.
 */
export default function Approach() {
  return (
    <section id="approach" className="section">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Approach</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[var(--tracking-display)] sm:text-4xl">
            What a year of shipping actually taught me.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="border-t border-line pt-6">
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-medium tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 max-w-2xl space-y-5 border-t border-line pt-10">
            {profile.bio.map((para) => (
              <p key={para} className="text-base leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
