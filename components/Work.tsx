import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { addressOf, projects, type Project } from "@/lib/content";
import Frame from "./Frame";
import SectionHead from "./SectionHead";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="page">
        <SectionHead
          n="I"
          eyebrow="Selected work"
          title={
            <>
              Seven platforms in production, <em className="gold-text">and the problems that made them hard.</em>
            </>
          }
          aside={
            <p className="max-w-[19rem] text-[15px] leading-relaxed text-muted">
              Each one is evidence for a layer around the model. Open any of them for the architecture and the decisions
              behind it.
            </p>
          }
        />

        <div className="mt-16 lg:mt-24">
          {projects.map((p, i) => (
            <Plate key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Plate({ p, i }: { p: Project; i: number }) {
  const n = pad(i + 1);
  const study = p.study ? `/work/${p.slug}` : undefined;
  const address = addressOf(p);

  return (
    <article
      id={`work-${p.slug}`}
      className="stack-card mb-6 scroll-mt-24 lg:mb-[12vh] lg:last:mb-0"
      style={{ "--i": i } as CSSProperties}
    >
      <div className="plate group overflow-hidden rounded-[26px] sm:rounded-[30px]">
        {/* Engraved watermark numeral */}
        <span
          aria-hidden
          className="font-display pointer-events-none absolute right-5 -bottom-10 leading-none font-semibold text-transparent select-none [font-variant-numeric:lining-nums] [-webkit-text-stroke:1px_rgb(216_181_108/0.22)] text-[9rem] sm:-bottom-14 sm:text-[13rem] lg:-bottom-20 lg:text-[16rem]"
        >
          {n}
        </span>

        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
          <div className="flex flex-col lg:col-span-5">
            <p className="smallcaps flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>N° {n}</span>
              <span aria-hidden className="h-px w-6 bg-gold/50" />
              <span>{p.layer}</span>
            </p>

            <h3 className="display mt-6 text-[clamp(2.9rem,5.2vw,4.6rem)]">
              {study ? (
                <Link href={study} className="transition-colors duration-300 hover:text-gold-bright">
                  {p.name}
                </Link>
              ) : (
                p.name
              )}
            </h3>
            <p className="mt-3 text-[16.5px] text-muted">
              {p.tagline} <span className="text-subtle">· {p.year}</span>
            </p>

            <blockquote className="font-display mt-7 border-l border-gold/40 pl-5 text-[21px] leading-[1.35] text-ivory/90 italic sm:text-[23px]">
              {p.problem}
            </blockquote>

            <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Stack">
              {p.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-9">
              {study && (
                <Link href={study} className="btn-gold !py-2.5 !text-[14px]">
                  Read the case study
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              )}
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1.5 text-[14px]"
                >
                  {p.hrefLabel}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              ) : (
                <span className="text-[13.5px] text-subtle">{p.internal ? "Internal — no public link" : "No public link"}</span>
              )}
            </div>
          </div>

          {p.shot && (
            <div className="lg:col-span-7 lg:self-center">
              {study ? (
                <Link href={study} aria-label={`${p.name} case study`} className="block [perspective:1800px]">
                  <Frame
                    shot={p.shot}
                    address={address}
                    className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:[transform:rotateY(-6deg)_rotateX(2deg)] lg:group-hover:[transform:none]"
                  />
                </Link>
              ) : (
                <Frame shot={p.shot} address={address} />
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
