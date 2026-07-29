import { ArrowUpRight } from "lucide-react";
import { notes, profile } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Short technical write-ups. Writing is the cheapest credibility multiplier
 * a portfolio has — it shows how someone thinks, not just what they shipped.
 */
export default function Notes() {
  return (
    <section id="notes" className="section">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Notes</p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[var(--tracking-display)] sm:text-4xl">
                Things that broke, and what fixed them.
              </h2>
            </div>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-xs"
            >
              More on LinkedIn
              <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-px sm:grid-cols-2">
          {notes.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 0.05}>
              <div className="h-full border-t border-line py-8 sm:pr-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {n.tag}
                </p>
                <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight">
                  {n.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {n.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
