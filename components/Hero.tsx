import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/lib/content";
import LocalTime from "./LocalTime";
import Trace from "./Trace";

const live = projects.filter((p) => p.href);

export default function Hero() {
  // "The model is / the easy part." — the last two words set in italic
  const words = profile.thesis.split(" ");
  const head = words.slice(0, -3).join(" ");
  const pivot = words.at(-3);
  const tail = words.slice(-2).join(" ");

  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-32 lg:pb-28">
      <div className="page">
        {/* Masthead: who, where, and whether they're looking */}
        <div className="rise flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-4 font-mono text-[12px] text-subtle">
          <span className="text-ink">{profile.role}</span>
          <span>
            {profile.location} · <LocalTime /> PKT
          </span>
          {profile.status && (
            <span className="inline-flex items-center gap-2 text-ink">
              <span className="pulse-dot size-2 rounded-full bg-signal-fill" aria-hidden />
              {profile.status}
            </span>
          )}
        </div>

        <div className="doc mt-10 lg:mt-14">
          <div className="lg:col-span-12">
            <h1
              className="display rise text-[clamp(3.4rem,10.5vw,9.5rem)]"
              style={{ animationDelay: "60ms" }}
            >
              {head} <br className="hidden sm:block" />
              {pivot} <em className="text-signal">{tail}</em>
            </h1>
          </div>

          <div className="lg:col-span-7 lg:pt-2">
            <p className="rise max-w-xl text-xl leading-relaxed text-muted sm:text-[22px]" style={{ animationDelay: "140ms" }}>
              {profile.lede}
            </p>

            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "200ms" }}>
              <Link href="/#work" className="btn btn-solid">
                See the work
                <ArrowDown className="size-3.5" aria-hidden />
              </Link>
              <a href={`mailto:${profile.email}`} className="btn">
                Get in touch
              </a>
            </div>
          </div>

          <div className="rise lg:col-span-4 lg:col-start-9 lg:pt-3" style={{ animationDelay: "260ms" }}>
            <p className="label">Live in production</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {live.map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link inline-flex items-center gap-1 font-mono text-[13px]"
                  >
                    {p.hrefLabel}
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 lg:col-span-12 lg:mt-10">
            <Trace />
          </div>
        </div>
      </div>
    </section>
  );
}
