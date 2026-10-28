import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { addressOf, projects } from "@/lib/content";
import Frame from "./Frame";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Work() {
  return (
    <section id="work" className="scroll-mt-16 py-16 lg:py-24">
      <div className="page">
        <SectionHead
          n="01"
          label="Work"
          title={
            <>
              Seven platforms in production, <em className="text-muted">and the problems that made them hard.</em>
            </>
          }
        />

        {/* Contents — the whole section at a glance, each line a jump link */}
        <Reveal className="doc mt-12">
          <nav aria-label="Projects" className="lg:col-span-9 lg:col-start-4">
            <ol className="grid border-t border-rule sm:grid-cols-2 sm:gap-x-8">
              {projects.map((p, i) => (
                <li key={p.slug} className="border-b border-rule">
                  <a
                    href={`#work-${p.slug}`}
                    className="group flex items-baseline gap-4 py-3 transition-colors hover:text-signal"
                  >
                    <span className="font-mono text-[12px] text-subtle">{pad(i + 1)}</span>
                    <span className="font-medium">{p.name}</span>
                    <span
                      aria-hidden
                      className="mx-1 flex-1 translate-y-[-0.25em] border-b border-dotted border-rule-strong"
                    />
                    <span className="font-mono text-[12px] text-subtle group-hover:text-signal">{p.layer}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <div className="mt-14 lg:mt-20">
          {projects.map((p, i) => (
            <Plate key={p.slug} p={p} n={i + 1} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Plate({ p, n, total }: { p: (typeof projects)[number]; n: number; total: number }) {
  const caseStudy = p.study ? `/work/${p.slug}` : undefined;

  return (
    <article id={`work-${p.slug}`} className="doc scroll-mt-20 border-t border-rule py-12 lg:py-16">
      {/* Margin: the plate's particulars */}
      <Reveal className="lg:col-span-3">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 lg:flex-col lg:gap-0">
          <p className="font-mono text-sm">
            <span className="text-signal">{pad(n)}</span>
            <span className="text-subtle"> / {pad(total)}</span>
          </p>
          <p className="label lg:mt-4">{p.layer}</p>
          <p className="font-mono text-[12px] text-subtle lg:mt-1.5">{p.year}</p>
          <p className="font-mono text-[12px] lg:mt-4">
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1.5"
              >
                <span className="size-1.5 rounded-full bg-signal-fill" aria-hidden />
                {p.hrefLabel}
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-subtle">
                <span className="size-1.5 rounded-full border border-rule-strong" aria-hidden />
                {p.internal ? "internal — no public link" : "no public link"}
              </span>
            )}
          </p>
        </div>
      </Reveal>

      {/* Text */}
      <Reveal delay={0.05} className="lg:col-span-4">
        <h3 className="display text-[clamp(2.75rem,5vw,4.25rem)]">
          {caseStudy ? (
            <Link href={caseStudy} className="transition-colors hover:text-signal">
              {p.name}
            </Link>
          ) : (
            p.name
          )}
        </h3>
        <p className="mt-3 text-[17px] text-muted">{p.tagline}</p>
        <p className="mt-6 font-serif text-[22px] leading-[1.35] sm:text-2xl">{p.problem}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
          {p.stack.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        {caseStudy && (
          <Link
            href={caseStudy}
            className="group/cta mt-8 inline-flex items-center gap-2 font-mono text-[13px] text-signal"
          >
            Read the case study
            <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-1" aria-hidden />
          </Link>
        )}
      </Reveal>

      {/* Figure */}
      {p.shot && (
        <Reveal delay={0.1} className="lg:col-span-5">
          <figure>
            {caseStudy ? (
              <Link href={caseStudy} className="group block" aria-label={`${p.name} case study`}>
                <Frame shot={p.shot} address={addressOf(p)} />
              </Link>
            ) : (
              <Frame shot={p.shot} address={addressOf(p)} />
            )}
            <figcaption className="mt-3 font-mono text-[11.5px] text-subtle">
              Fig. {n} — {p.name}, {addressOf(p)}
            </figcaption>
          </figure>
        </Reveal>
      )}
    </article>
  );
}
