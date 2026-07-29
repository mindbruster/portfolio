import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Case-study list. Each entry leads with the engineering problem rather
 * than a feature dump, because the problem is what demonstrates judgement.
 */
export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[var(--tracking-display)] sm:text-4xl">
            Five platforms in production, and the problems that made them hard.
          </h2>
        </Reveal>

        <ol className="mt-16 space-y-px">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05}>
              <article className="group grid gap-8 border-t border-line py-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
                {/* Left rail: identity */}
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {p.name}
                    </h3>
                    <span className="font-mono text-[11px] text-subtle">
                      {p.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{p.tagline}</p>

                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-4 font-mono text-xs"
                    >
                      {p.hrefLabel}
                      <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  ) : (
                    <p className="mt-4 font-mono text-xs text-subtle">
                      internal — no public link
                    </p>
                  )}

                  {p.shot && (
                    <Link
                      href={p.study ? `/work/${p.slug}` : "#"}
                      className="mt-6 block overflow-hidden rounded-md border border-line transition-opacity hover:opacity-90"
                    >
                      <Image
                        src={p.shot.src}
                        alt={p.shot.alt}
                        width={p.shot.w}
                        height={p.shot.h}
                        className="w-full"
                      />
                    </Link>
                  )}
                </div>

                {/* Right: the actual substance */}
                <div>
                  <p className="text-lg leading-relaxed text-fg">{p.problem}</p>

                  <ul className="mt-6 space-y-3">
                    {p.built.map((line) => (
                      <li
                        key={line}
                        className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-accent/70"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Only projects with written depth get a case-study link */}
                  {p.study && (
                    <Link
                      href={`/work/${p.slug}`}
                      className="link-underline mt-6 text-sm"
                    >
                      Read the case study
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
