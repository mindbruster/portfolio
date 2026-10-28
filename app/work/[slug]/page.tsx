import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { addressOf, projects } from "@/lib/content";
import Frame from "@/components/Frame";
import Pipeline from "@/components/Pipeline";
import Reveal from "@/components/Reveal";

type Params = { params: Promise<{ slug: string }> };

const pad = (n: number) => String(n).padStart(2, "0");

/** Pre-render a page for every project that has case-study depth. */
export function generateStaticParams() {
  return projects.filter((p) => p.study).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Abdul Aziz`,
    description: project.problem,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

/** One numbered part of the document: § label in the margin, body beside it. */
function Part({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <Reveal as="section" className="doc border-t border-rule py-12 lg:py-16">
      <h2 className="label lg:col-span-3 lg:pt-2">
        <span className="text-signal">§ {n}</span> — {title}
      </h2>
      <div className="lg:col-span-9">{children}</div>
    </Reveal>
  );
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project?.study) notFound();

  const { study } = project;
  // Wraps around, so the last case study still points somewhere.
  const next = [...projects.slice(index + 1), ...projects.slice(0, index)].find((p) => p.study);
  let part = 0;

  return (
    <main id="main" className="pt-24 sm:pt-28">
      <article className="page">
        <div className="rise flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4 font-mono text-[12px] text-subtle">
          <Link href={`/#work-${project.slug}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
            <ArrowLeft className="size-3.5" aria-hidden />
            All work
          </Link>
          <span>
            Case study <span className="text-signal">{pad(index + 1)}</span> / {pad(projects.length)} · {project.layer}
          </span>
        </div>

        <header className="mt-10 lg:mt-16">
          <h1 className="display rise text-[clamp(3.75rem,13vw,10.5rem)]" style={{ animationDelay: "60ms" }}>
            {project.name}
          </h1>
          <p className="rise mt-5 max-w-3xl text-2xl leading-snug text-muted sm:text-[28px]" style={{ animationDelay: "120ms" }}>
            {project.tagline}
          </p>

          {/* Particulars, set as a spec table */}
          <dl
            className="rise mt-12 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-6 border-t border-rule-strong lg:grid-cols-12"
            style={{ animationDelay: "180ms" }}
          >
            <div className="col-span-2 border-b border-rule py-4 lg:col-span-5 lg:border-b-0 lg:pr-6">
              <dt className="label">Role</dt>
              <dd className="mt-1.5 text-[16px] leading-snug">{study.role}</dd>
            </div>
            <div className="py-4 lg:col-span-2 lg:border-l lg:border-rule lg:pl-6">
              <dt className="label">Year</dt>
              <dd className="mt-1.5 font-mono text-[14px]">{project.year}</dd>
            </div>
            <div className="py-4 lg:col-span-2 lg:border-l lg:border-rule lg:pl-6">
              <dt className="label">Status</dt>
              <dd className="mt-1.5 font-mono text-[14px]">
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5 [overflow-wrap:anywhere]">
                    <span className="size-1.5 rounded-full bg-signal-fill" aria-hidden />
                    {project.hrefLabel}
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                ) : (
                  <span className="text-subtle">{project.internal ? "Internal" : "No public link"}</span>
                )}
              </dd>
            </div>
            <div className="col-span-2 border-t border-rule py-4 lg:col-span-3 lg:border-t-0 lg:border-l lg:pl-6">
              <dt className="label">Stack</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </header>

        {/* The product itself — shown before it is described */}
        {project.shot && (
          <figure className="rise border-t border-rule py-10 lg:py-14" style={{ animationDelay: "240ms" }}>
            <Frame
              shot={project.shot}
              address={addressOf(project)}
              priority
              sizes="(min-width: 1248px) 1152px, 100vw"
            />
            {project.gallery && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((g) => (
                  <Frame key={g.src} shot={g} address={addressOf(project)} sizes="(min-width: 640px) 50vw, 100vw" />
                ))}
              </div>
            )}
            <figcaption className="mt-3 font-mono text-[11.5px] text-subtle">
              Fig. 1 — {project.shot.alt}
            </figcaption>
          </figure>
        )}

        <Part n={++part} title="Context">
          <p className="max-w-3xl text-xl leading-relaxed sm:text-[22px]">{study.context}</p>
        </Part>

        <Part n={++part} title="The problem">
          <blockquote className="max-w-4xl border-l-2 border-signal-fill pl-6 font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15]">
            {project.problem}
          </blockquote>
        </Part>

        <Part n={++part} title="What I built">
          <ol className="max-w-3xl space-y-5">
            {project.built.map((b, i) => (
              <li key={b} className="grid grid-cols-[2rem_1fr] gap-x-3 text-lg leading-relaxed">
                <span className="font-mono text-[13px] leading-[1.9] text-signal">{String.fromCharCode(97 + i)}.</span>
                <span>{b}</span>
              </li>
            ))}
          </ol>
        </Part>

        {study.diagram && (
          <Part n={++part} title="Architecture">
            <Pipeline title={study.diagram.title} steps={study.diagram.steps} figure="Fig. 2" />
          </Part>
        )}

        <Part n={++part} title="Key decisions">
          <ol className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {study.decisions.map((d, i) => (
              <li key={d.title}>
                <p className="font-mono text-[12px] text-subtle">
                  Decision <span className="text-signal">{pad(i + 1)}</span>
                </p>
                <h3 className="display mt-3 text-[2rem] leading-[1.05]">{d.title}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">{d.body}</p>
              </li>
            ))}
          </ol>
        </Part>

        <Part n={++part} title="Outcome">
          <ul className="max-w-3xl divide-y divide-rule border-y border-rule">
            {study.outcome.map((o) => (
              <li key={o} className="flex gap-4 py-4 text-lg leading-relaxed">
                <Check className="mt-1.5 size-4 shrink-0 text-signal" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </Part>

        {next && (
          <nav aria-label="Next case study" className="border-t border-rule-strong">
            <Link href={`/work/${next.slug}`} className="group doc py-14 lg:py-20">
              <p className="label lg:col-span-3 lg:pt-4">
                Next — <span className="text-signal">{pad(projects.indexOf(next) + 1)}</span>
              </p>
              <div className="flex items-end justify-between gap-6 lg:col-span-9">
                <div>
                  <p className="display text-[clamp(3rem,9vw,7rem)] transition-colors group-hover:text-signal">
                    {next.name}
                  </p>
                  <p className="mt-3 text-lg text-muted">{next.tagline}</p>
                </div>
                <ArrowRight
                  className="mb-4 size-10 shrink-0 text-subtle transition-transform duration-300 group-hover:translate-x-2 group-hover:text-signal"
                  aria-hidden
                />
              </div>
            </Link>
          </nav>
        )}
      </article>
    </main>
  );
}
