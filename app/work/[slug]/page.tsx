import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { projects } from "@/lib/content";
import Pipeline from "@/components/Pipeline";
import Reveal from "@/components/Reveal";

type Params = { params: Promise<{ slug: string }> };

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
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project?.study) notFound();

  const { study } = project;

  return (
    <main id="main" className="pt-32 pb-24">
      <article className="container-page">
        <Link
          href="/#work"
          className="link-underline font-mono text-xs text-muted"
        >
          <ArrowLeft className="size-3" aria-hidden />
          All work
        </Link>

        <header className="mt-10 border-b border-line pb-12">
          <p className="eyebrow">{project.year}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[var(--tracking-display)] sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 text-xl text-muted">{project.tagline}</p>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-6 font-mono text-sm"
            >
              {project.hrefLabel}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          )}

          <dl className="mt-10 grid gap-6 sm:grid-cols-[10rem_1fr]">
            <dt className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-subtle">
              My role
            </dt>
            <dd className="text-base text-muted">{study.role}</dd>
          </dl>
        </header>

        {/* The product itself — shown before it is described */}
        {project.shot && (
          <Reveal>
            <figure className="border-b border-line py-12">
              <div className="overflow-hidden rounded-lg border border-line">
                <Image
                  src={project.shot.src}
                  alt={project.shot.alt}
                  width={project.shot.w}
                  height={project.shot.h}
                  className="w-full"
                  priority
                />
              </div>
              <figcaption className="mt-3 font-mono text-[12.5px] text-subtle">
                {project.hrefLabel}
              </figcaption>

              {/* Additional frames, if this project has them */}
              {project.gallery && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((g) => (
                    <div
                      key={g.src}
                      className="overflow-hidden rounded-lg border border-line"
                    >
                      <Image
                        src={g.src}
                        alt={g.alt}
                        width={g.w}
                        height={g.h}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </figure>
          </Reveal>
        )}

        {/* Context */}
        <Reveal>
          <section className="border-b border-line py-12">
            <h2 className="eyebrow">Context</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg">
              {study.context}
            </p>
          </section>
        </Reveal>

        {/* The problem, stated plainly */}
        <Reveal>
          <section className="border-b border-line py-12">
            <h2 className="eyebrow">The problem</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg">
              {project.problem}
            </p>
          </section>
        </Reveal>

        {/* Architecture */}
        {study.diagram && (
          <Reveal>
            <section className="border-b border-line py-12">
              <h2 className="eyebrow mb-8">Architecture</h2>
              <Pipeline
                title={study.diagram.title}
                steps={study.diagram.steps}
              />
            </section>
          </Reveal>
        )}

        {/* Decisions — the part that shows judgement */}
        <Reveal>
          <section className="border-b border-line py-12">
            <h2 className="eyebrow">Key decisions</h2>
            <div className="mt-8 grid gap-x-16 gap-y-10 lg:grid-cols-2">
              {study.decisions.map((d, i) => (
                <div key={d.title}>
                  <span className="font-mono text-[12.5px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-xl font-medium tracking-tight">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Outcome */}
        <Reveal>
          <section className="border-b border-line py-12">
            <h2 className="eyebrow">Outcome</h2>
            <ul className="mt-6 space-y-3">
              {study.outcome.map((o) => (
                <li
                  key={o}
                  className="relative max-w-3xl pl-5 leading-relaxed text-muted before:absolute before:left-0 before:top-[0.65em] before:size-1 before:rounded-full before:bg-accent"
                >
                  {o}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Stack */}
        <section className="py-12">
          <h2 className="eyebrow">Stack</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <nav className="border-t border-line pt-10">
          <Link href="/#work" className="link-underline text-sm">
            <ArrowLeft className="size-3.5" aria-hidden />
            Back to all work
          </Link>
        </nav>
      </article>
    </main>
  );
}
