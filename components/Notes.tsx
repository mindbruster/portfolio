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
    <section id="notes" className="relative scroll-mt-20 border-t border-line py-24 lg:py-36">
      <div className="page">
        <SectionHead
          n="VI"
          eyebrow="Field notes"
          title={
            <>
              Things that broke, <em className="sheen-text font-normal">and what fixed them.</em>
            </>
          }
          aside={
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="roll-host inline-flex items-center gap-2 text-[15px] text-fg"
            >
              <span className="roll">
                <span>More on LinkedIn</span>
                <span aria-hidden>More on LinkedIn</span>
              </span>
              <ArrowUpRight className="size-4 text-accent" aria-hidden />
            </a>
          }
        />

        <ul className="mt-16 grid border-t border-line md:grid-cols-2 lg:mt-24">
          {notes.map((n, i) => (
            <Reveal
              as="li"
              key={n.title}
              delay={(i % 2) * 0.08}
              className={`group relative border-b border-line py-10 md:py-14 ${i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"}`}
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-0 bg-gradient-to-r from-accent to-transparent transition-[width] duration-700 group-hover:w-full"
              />
              <p className="flex items-center justify-between gap-4">
                <span className="font-mono text-[12px] text-accent">N° {String(i + 1).padStart(2, "0")}</span>
                <span className="smallcaps !text-[10px] !text-subtle">{n.tag}</span>
              </p>
              <h3 className="display mt-7 text-[clamp(1.9rem,2.6vw,2.5rem)] leading-[1.08] font-light transition-colors duration-500 group-hover:text-accent-bright">
                {n.title}
              </h3>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">{n.blurb}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
