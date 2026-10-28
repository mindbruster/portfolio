import { ArrowUpRight } from "lucide-react";
import { notes, profile } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/**
 * Short technical write-ups, filed as numbered field notes. Writing shows
 * how someone thinks, not just what they shipped.
 */
export default function Notes() {
  return (
    <section id="notes" className="relative scroll-mt-20 border-t border-line py-24 lg:py-32">
      <div className="page">
        <SectionHead
          n="IV"
          eyebrow="Field notes"
          title={
            <>
              Things that broke, <em className="gold-text">and what fixed them.</em>
            </>
          }
          aside={
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-2.5 !text-[14px]"
            >
              More on LinkedIn
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          }
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24">
          {notes.map((n, i) => (
            <Reveal as="li" key={n.title} delay={(i % 2) * 0.08}>
              <article className="plate group relative flex h-full flex-col overflow-hidden rounded-[22px] p-7 transition-colors duration-500 hover:border-line-gold sm:p-9">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-deep via-gold to-gold-bright transition-transform duration-700 group-hover:scale-x-100"
                />
                <header className="flex items-center justify-between gap-4">
                  <span className="smallcaps">Note N° {String(i + 1).padStart(2, "0")}</span>
                  <span className="chip !text-[12px]">{n.tag}</span>
                </header>
                <h3 className="display mt-8 text-[2rem] leading-[1.08] sm:text-[2.3rem]">{n.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{n.blurb}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
