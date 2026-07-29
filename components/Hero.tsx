import { ArrowUpRight, ArrowDown } from "lucide-react";
import { profile, stats, projects } from "@/lib/content";

const live = projects.filter((p) => p.href);

/**
 * Server component. The entrance animation is pure CSS so it begins at first
 * paint — no hydration gate, and therefore no blank flash on load.
 */
export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[92vh] items-center pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-glow absolute inset-x-0 -top-32 h-[130%]" />
        <div className="hero-fade absolute inset-0" />
      </div>

      <div className="container-page relative">
        <p className="eyebrow fade-up">
          {profile.role} — {profile.location}
        </p>

        <h1
          className="text-gradient fade-up mt-6 text-6xl font-semibold leading-[0.95] tracking-[var(--tracking-display)] sm:text-8xl lg:text-9xl"
          style={{ animationDelay: "60ms" }}
        >
          {profile.name}
        </h1>

        <p
          className="fade-up mt-8 max-w-3xl text-xl leading-relaxed text-muted sm:text-2xl"
          style={{ animationDelay: "120ms" }}
        >
          {profile.headline}
        </p>

        <div className="fade-up mt-10" style={{ animationDelay: "180ms" }}>
          <p className="eyebrow">Live</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {live.map((p) => (
              <li key={p.slug}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-mono text-base"
                >
                  {p.hrefLabel}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="fade-up mt-12 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#work"
            className="rounded-md bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            See the work
          </a>
          <a
            href={profile.resume}
            download
            className="rounded-md border border-line px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Download CV
          </a>
        </div>

        <dl
          className="fade-up mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 lg:grid-cols-4"
          style={{ animationDelay: "300ms" }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-2 text-base leading-snug text-subtle">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-subtle transition-colors hover:text-accent lg:block"
      >
        <ArrowDown className="size-5 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
