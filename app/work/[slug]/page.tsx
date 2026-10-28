import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { addressOf, layers, numerals, projects } from "@/lib/content";
import Frame from "@/components/Frame";
import Orrery from "@/components/Orrery";
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

/** One numbered part: a roman numeral and label in the margin, body beside it. */
function Part({ n, title, wide = false, children }: { n: number; title: string; wide?: boolean; children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 lg:py-24">
      <div className={`grid gap-8 ${wide ? "" : "lg:grid-cols-12 lg:gap-12"}`}>
        <Reveal className={wide ? "" : "lg:col-span-4"}>
          <h2 className="flex items-baseline gap-4 lg:sticky lg:top-28">
            <span className="display gold-text text-[3.25rem] leading-none">{numerals[n - 1]}</span>
            <span className="smallcaps">{title}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className={wide ? "" : "lg:col-span-8"}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project?.study) notFound();

  const { study } = project;
  const address = addressOf(project);
  const ring = layers.findIndex((l) => l.slug === project.slug);
  // Wraps around, so the last case study still points somewhere.
  const next = [...projects.slice(index + 1), ...projects.slice(0, index)].find((p) => p.study);
  let part = 0;

  return (
    <main id="main" className="relative overflow-hidden pt-[72px]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(45%_55%_at_80%_20%,rgb(216_181_108/0.1),transparent_70%)]" />
      {/* This project's ring, lit in the engraved instrument */}
      <div aria-hidden className="pointer-events-none absolute top-[13rem] right-[-4rem] hidden w-[400px] opacity-90 lg:block xl:right-0">
        <Orrery active={ring >= 0 ? ring : undefined} uid="case" className="rise w-full" />
      </div>

      <article className="page relative">
        <header className="pt-10 pb-14 lg:pt-16 lg:pb-20">
          <div className="rise flex flex-wrap items-center justify-between gap-4 text-[14px]">
            <Link href={`/#work-${project.slug}`} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-gold-bright">
              <ArrowLeft className="size-4" aria-hidden />
              All work
            </Link>
            <span className="smallcaps !text-subtle">
              Case study <span className="text-gold">N° {pad(index + 1)}</span> / {pad(projects.length)}
            </span>
          </div>

          <p className="smallcaps rise mt-14 flex items-center gap-3 lg:mt-20" style={{ animationDelay: "80ms" }}>
            <span aria-hidden className="h-px w-10 bg-gold/50" />
            {project.layer}
            {ring >= 0 && <span className="text-subtle">· ring {numerals[ring]} of the instrument</span>}
          </p>
          <h1 className="display mt-6 text-[clamp(4rem,11.5vw,10rem)] leading-[0.88] font-light tracking-[-0.03em]">
            <span className="line-mask">
              <span style={{ animationDelay: "120ms" }}>{project.name}</span>
            </span>
          </h1>
          <p className="font-display rise mt-6 max-w-3xl text-[clamp(1.6rem,2.6vw,2.2rem)] leading-snug text-muted italic" style={{ animationDelay: "260ms" }}>
            {project.tagline}
          </p>

          {/* Particulars */}
          <dl className="glass rise mt-12 grid grid-cols-2 overflow-hidden rounded-2xl lg:grid-cols-12" style={{ animationDelay: "360ms" }}>
            <div className="col-span-2 border-b border-line p-5 sm:p-6 lg:col-span-5 lg:border-b-0">
              <dt className="smallcaps !text-[10px]">Role</dt>
              <dd className="mt-2 text-[15.5px] leading-snug">{study.role}</dd>
            </div>
            <div className="border-line p-5 sm:p-6 lg:col-span-2 lg:border-l">
              <dt className="smallcaps !text-[10px]">Year</dt>
              <dd className="mt-2 text-[15.5px]">{project.year}</dd>
            </div>
            <div className="min-w-0 border-l border-line p-5 sm:p-6 lg:col-span-2">
              <dt className="smallcaps !text-[10px]">Status</dt>
              <dd className="mt-2 text-[15.5px]">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link inline-flex items-center gap-1.5 [overflow-wrap:anywhere]"
                  >
                    {project.hrefLabel}
                    <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                  </a>
                ) : (
                  <span className="text-muted">{project.internal ? "Internal" : "No public link"}</span>
                )}
              </dd>
            </div>
            <div className="col-span-2 border-t border-line p-5 sm:p-6 lg:col-span-3 lg:border-t-0 lg:border-l">
              <dt className="smallcaps !text-[10px]">Stack</dt>
              <dd className="mt-2.5">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <li key={t} className="chip !text-[12px]">
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </header>

        {project.shot && (
          <figure className="rise pb-16 lg:pb-24" style={{ animationDelay: "460ms" }}>
            <Frame shot={project.shot} address={address} priority sizes="(min-width: 1280px) 1184px, 100vw" />
            {project.gallery && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {project.gallery.map((g) => (
                  <Frame key={g.src} shot={g} address={address} sizes="(min-width: 640px) 50vw, 100vw" />
                ))}
              </div>
            )}
            <figcaption className="mt-5 max-w-3xl text-[14px] leading-relaxed text-subtle">
              <span className="smallcaps mr-3 !text-[10px]">Fig. 1</span>
              {project.shot.alt}
            </figcaption>
          </figure>
        )}

        <Part n={++part} title="Context">
          <p className="max-w-3xl text-[20px] leading-relaxed sm:text-[23px]">{study.context}</p>
        </Part>

        <Part n={++part} title="The problem">
          <blockquote className="font-display relative max-w-4xl text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.12] italic">
            <span aria-hidden className="gold-text absolute -top-8 -left-1 text-[5rem] leading-none not-italic lg:-left-10">
              &ldquo;
            </span>
            {project.problem}
          </blockquote>
        </Part>

        <Part n={++part} title="What I built">
          <ol className="space-y-4">
            {project.built.map((b, i) => (
              <li key={b} className="glass flex gap-5 rounded-2xl p-5 sm:p-6">
                <span className="display gold-text w-8 shrink-0 text-[1.9rem] leading-none">{pad(i + 1)}</span>
                <span className="text-[17px] leading-relaxed sm:text-[18px]">{b}</span>
              </li>
            ))}
          </ol>
        </Part>

        {study.diagram && (
          <Part n={++part} title="Architecture" wide>
            <h3 className="display mb-10 max-w-3xl text-[clamp(2rem,3.4vw,2.9rem)]">{study.diagram.title}</h3>
            <Pipeline title={study.diagram.title} steps={study.diagram.steps} figure="Fig. 2" />
          </Part>
        )}

        <Part n={++part} title="Key decisions">
          <ol className="grid gap-5 md:grid-cols-2">
            {study.decisions.map((d, i) => (
              <li key={d.title} className="plate rounded-[20px] p-7 sm:p-8">
                <p className="smallcaps !text-[10px]">Decision N° {pad(i + 1)}</p>
                <h3 className="display mt-4 text-[1.9rem] leading-[1.06] sm:text-[2.1rem]">{d.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{d.body}</p>
              </li>
            ))}
          </ol>
        </Part>

        <Part n={++part} title="Outcome">
          <ul className="space-y-0 divide-y divide-line border-y border-line">
            {study.outcome.map((o) => (
              <li key={o} className="flex gap-5 py-5 text-[17px] leading-relaxed sm:text-[19px]">
                <span aria-hidden className="mt-[0.55em] size-[9px] shrink-0 rotate-45 bg-gold" />
                {o}
              </li>
            ))}
          </ul>
        </Part>
      </article>

      {next && (
        <nav aria-label="Next case study" className="border-t border-line">
          <Link href={`/work/${next.slug}`} className="group page grid items-center gap-10 py-20 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-6">
              <p className="smallcaps flex items-center gap-3">
                Next case study <span aria-hidden className="h-px w-10 bg-gold/50" /> N° {pad(projects.indexOf(next) + 1)}
              </p>
              <p className="display mt-6 text-[clamp(3.25rem,8vw,7rem)] font-light transition-colors duration-500 group-hover:text-gold-bright">
                {next.name}
              </p>
              <p className="mt-4 flex items-center gap-3 text-lg text-muted">
                {next.tagline}
                <ArrowRight className="size-5 text-gold transition-transform duration-500 group-hover:translate-x-2" aria-hidden />
              </p>
            </div>
            {next.shot && (
              <div className="overflow-hidden rounded-2xl border border-line-strong lg:col-span-6">
                <Image
                  src={next.shot.src}
                  alt=""
                  width={next.shot.w}
                  height={next.shot.h}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="duo h-auto w-full group-hover:scale-[1.03]"
                />
              </div>
            )}
          </Link>
        </nav>
      )}
    </main>
  );
}
