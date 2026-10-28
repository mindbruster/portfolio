import Link from "next/link";
import { ArrowDownToLine, ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, projects, stats } from "@/lib/content";
import CountUp from "./CountUp";
import Guilloche from "./Guilloche";
import LocalTime from "./LocalTime";
import TraceCard from "./TraceCard";

const live = projects.filter((p) => p.href);

export default function Hero() {
  // "The model is / the easy part." — the last two words in gilt italic
  const words = profile.thesis.split(" ");
  const first = words.slice(0, -3).join(" ");
  const pivot = words.at(-3);
  const tail = words.slice(-2).join(" ");

  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/* Backdrop: warm light, the engraved rosette, and a fade into the page */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_78%_42%,rgb(216_181_108/0.11),transparent_72%)]" />
        <div className="fade-edge absolute top-[46%] right-[-38%] w-[150vw] max-w-[1180px] -translate-y-1/2 sm:right-[-22%] sm:w-[110vw] lg:right-[-12%] lg:w-[78vw]">
          <div className="spin-slow">
            <Guilloche />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="page relative grid items-center gap-16 pt-14 pb-20 lg:min-h-[calc(100svh-72px-9rem)] lg:grid-cols-12 lg:gap-6 lg:pt-10">
        <div className="lg:col-span-7">
          <p className="smallcaps rise flex items-center gap-3">
            <span aria-hidden className="text-[9px]">◆</span>
            {profile.role} — {profile.location}
          </p>

          <h1 className="display mt-7 text-[clamp(3.8rem,8.6vw,8.6rem)] leading-[0.9] tracking-[-0.025em]">
            <span className="line-mask">
              <span style={{ animationDelay: "120ms" }}>{first}</span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "240ms" }}>
                {pivot} <em className="gold-text font-medium">{tail}</em>
              </span>
            </span>
          </h1>

          <p className="rise mt-8 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-[20px]" style={{ animationDelay: "420ms" }}>
            {profile.lede}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "540ms" }}>
            <Link href="/#work" className="btn-gold">
              View selected work
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a href={profile.resume} download className="btn-ghost">
              Download CV
              <ArrowDownToLine className="size-4" aria-hidden />
            </a>
          </div>

          {profile.status && (
            <p className="rise mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-muted" style={{ animationDelay: "640ms" }}>
              <span className="pulse-gold size-2 rounded-full bg-gold" aria-hidden />
              <span className="text-ivory">{profile.status}</span>
              <span aria-hidden className="text-subtle">·</span>
              <span>
                <LocalTime /> in Lahore
              </span>
            </p>
          )}
        </div>

        {/* The composition: trace card, a live-products card, and a stamp */}
        <div className="relative lg:col-span-5">
          <div className="rise relative mx-auto max-w-[470px] lg:mr-8" style={{ animationDelay: "650ms" }}>
            <div className="glass-solid float absolute -top-24 -right-3 z-10 hidden w-[206px] rounded-2xl p-4 sm:block lg:-right-16">
              <p className="smallcaps !text-[9.5px]">Live right now</p>
              <ul className="mt-2.5 space-y-1.5">
                {live.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-2 text-[13px] text-ivory/90 transition-colors hover:text-gold-bright"
                    >
                      <span className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-gold" aria-hidden />
                        {p.hrefLabel}
                      </span>
                      <ArrowUpRight className="size-3 text-subtle group-hover:text-gold" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <TraceCard />

            {/* Rubber stamp, struck a little crooked */}
            <div
              aria-hidden
              className="absolute -bottom-12 -left-3 z-10 rotate-[-9deg] rounded-md border-[1.5px] border-gold/75 bg-ink/70 px-3.5 py-1.5 text-gold shadow-[0_0_0_3px_rgb(8_9_12/0.7)] backdrop-blur-sm sm:-left-14"
            >
              <span className="block text-[13px] font-semibold tracking-[0.32em]">SHIPPED</span>
              <span className="font-display block text-center text-[15px] italic leading-tight">to production</span>
            </div>
          </div>
        </div>
      </div>

      {/* By the numbers */}
      <div className="page relative pb-6">
        <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse justify-end gap-2 py-8 pr-4 ${i % 2 ? "border-l border-line pl-5 lg:pl-8" : ""} ${
                i >= 2 ? "border-t border-line lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <dt className="max-w-[15rem] text-[14px] leading-snug text-muted">{s.label}</dt>
              <dd className="display gold-text text-[clamp(3.2rem,5.5vw,4.75rem)] leading-none">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
