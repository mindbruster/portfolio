import { ArrowUpRight } from "lucide-react";
import { notes, profile } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/**
 * Short technical write-ups, filed like incident reports. Writing shows how
 * someone thinks, not just what they shipped.
 */
export default function Notes() {
  return (
    <section id="notes" className="scroll-mt-16 py-16 lg:py-24">
      <div className="page">
        <SectionHead
          n="04"
          label="Notes"
          title={
            <>
              Things that broke, <em className="text-muted">and what fixed them.</em>
            </>
          }
        >
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link inline-flex items-center gap-1.5 font-mono text-[13px]"
          >
            More on LinkedIn
            <ArrowUpRight className="size-3" aria-hidden />
          </a>
        </SectionHead>

        <div className="doc mt-12 lg:mt-16">
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:col-start-4">
            {notes.map((n, i) => (
              <Reveal as="li" key={n.title} delay={i * 0.05}>
                <article className="flex h-full flex-col rounded-[10px] border border-rule bg-raised p-6 transition-colors hover:border-rule-strong sm:p-7">
                  <header className="flex items-center justify-between gap-4 border-b border-dashed border-rule pb-3 font-mono text-[11.5px] uppercase tracking-[0.08em]">
                    <span className="text-subtle">Note {String(i + 1).padStart(2, "0")}</span>
                    <span className="text-signal">{n.tag}</span>
                  </header>
                  <h3 className="display mt-5 text-[1.9rem] leading-[1.08]">{n.title}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-muted">{n.blurb}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
