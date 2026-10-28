"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowRight, ArrowUpRight } from "lucide-react";
import { layers, profile, projects } from "@/lib/content";
import Armillary from "./Armillary";
import LocalTime from "./LocalTime";
import Magnetic from "./Magnetic";
import Orrery from "./Orrery";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";

const pad = (n: number) => String(n).padStart(2, "0");
/** Hero entrance delays, offset by the intro curtain when it plays */
const after = (ms: number) => ({ animationDelay: `calc(var(--intro) + ${ms}ms)` });

/**
 * The opening of the site: hero, thesis and the seven layers, scrolled
 * past an armillary sphere that stays pinned on the right. In the hero the
 * rings light one after another; over the layers, the ring under
 * discussion lights.
 */
export default function Stage() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);
  const items = useRef<(HTMLElement | null)[]>([]);

  // Hero: walk the rings slowly, so the instrument explains itself
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setCycle((c) => (c + 1) % layers.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  // Layers: whichever item crosses the middle of the screen takes the light
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.index);
          if (e.isIntersecting) setFocused(i);
          else setFocused((f) => (f === i ? null : f));
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const active = focused ?? (reduce ? null : cycle);
  const words = profile.thesis.split(" ");

  return (
    <section id="top" className="relative">
      {/* The instrument: pinned on wide screens, a backdrop to the hero on narrow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[66svh] [overflow-x:clip] lg:inset-y-0 lg:h-auto">
        <div className="h-full lg:sticky lg:top-0 lg:h-svh">
          <div className="absolute inset-0 bg-[radial-gradient(50%_55%_at_50%_45%,rgb(216_181_108/0.1),transparent_70%)] lg:left-[42%] lg:bg-[radial-gradient(48%_52%_at_55%_50%,rgb(216_181_108/0.12),transparent_72%)]" />
          <div className="absolute inset-0 lg:left-[45%]">
            <Armillary labels={layers.map((l) => l.name)} active={active} strength={focused === null ? 0.35 : 1} />
          </div>
          {/* On phones the sphere fades out under the headline */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-ink lg:hidden" />
        </div>
      </div>

      <div className="page relative">
        <div className="lg:w-[47%]">
          {/* Hero */}
          <div className="flex min-h-svh flex-col justify-end pt-[58svh] pb-16 lg:pt-36 lg:pb-[13vh]">
            <p className="smallcaps rise flex items-center gap-3" style={after(80)}>
              <span aria-hidden className="h-px w-8 bg-gold/60" />
              {profile.role} — {profile.location}
            </p>
            <h1 className="display mt-7 text-[clamp(3.7rem,7.6vw,8.4rem)] leading-[0.9] font-light tracking-[-0.03em]">
              <span className="line-mask">
                <span style={after(160)}>{words.slice(0, 3).join(" ")}</span>
              </span>
              <span className="line-mask">
                <span style={after(280)}>
                  {words[3]} <em className="gold-text font-normal">{words.slice(4).join(" ")}</em>
                </span>
              </span>
            </h1>
            <p className="rise mt-8 max-w-[31rem] text-[17px] leading-relaxed text-muted sm:text-[19px]" style={after(460)}>
              {profile.lede}
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-4" style={after(580)}>
              <Magnetic>
                <Link href="/#work" className="btn-gold">
                  Selected work
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Magnetic>
              <a href={profile.resume} download className="roll-host inline-flex items-center gap-2 text-[15px] text-ivory">
                <ArrowDownToLine className="size-4 text-gold" aria-hidden />
                <span className="roll">
                  <span>Download CV</span>
                  <span aria-hidden>Download CV</span>
                </span>
              </a>
            </div>
            <div className="rise mt-14" style={after(700)}>
              {profile.status && (
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-muted">
                  <span className="pulse-gold size-2 rounded-full bg-gold" aria-hidden />
                  <span className="text-ivory">{profile.status}</span>
                  <span aria-hidden className="text-subtle">·</span>
                  <span>
                    <LocalTime /> in Lahore
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Thesis */}
          <div className="py-[14vh] lg:py-[20vh]">
            <Reveal>
              <p className="smallcaps flex items-center gap-4">
                <span className="font-display text-[19px] tracking-[0.06em] normal-case">N° I</span>
                <span aria-hidden className="h-px w-10 bg-gold/50" />
                The thesis
              </p>
            </Reveal>
            <WordReveal
              text={profile.about[1]}
              className="font-display mt-8 text-[clamp(1.85rem,2.7vw,2.75rem)] leading-[1.2] font-light"
            />
          </div>

          {/* The seven layers */}
          <div id="layers" className="scroll-mt-20 pb-[12vh]">
            <Reveal>
              <p className="smallcaps flex items-center gap-4">
                <span className="font-display text-[19px] tracking-[0.06em] normal-case">N° II</span>
                <span aria-hidden className="h-px w-10 bg-gold/50" />
                Seven layers around the model
              </p>
            </Reveal>
            <Reveal variant="mask" delay={0.05} className="mt-6">
              <h2 className="display text-[clamp(2.6rem,5vw,4.9rem)] font-light">
                Everything the model <em className="gold-text font-normal">can&apos;t do for itself.</em>
              </h2>
            </Reveal>

            <ol className="mt-14 lg:mt-20">
              {layers.map((l, i) => {
                const p = projects.find((x) => x.slug === l.slug);
                const lit = focused === i;
                return (
                  <li
                    key={l.name}
                    data-index={i}
                    ref={(node) => {
                      items.current[i] = node;
                    }}
                    className="flex min-h-[46svh] items-center border-t border-line py-12 lg:min-h-[64svh]"
                  >
                    <div className={`grid w-full grid-cols-[1fr_auto] gap-6 transition-opacity duration-700 lg:block ${lit || focused === null ? "opacity-100" : "lg:opacity-40"}`}>
                      <div>
                        <p className="font-mono text-[12px] tracking-wide text-gold">
                          {pad(i + 1)} <span className="text-subtle">/ {pad(layers.length)}</span>
                        </p>
                        <h3 className="display mt-4 text-[clamp(2.3rem,4.2vw,4.1rem)] font-light">{l.name}</h3>
                        <p className="mt-4 max-w-[28rem] text-[17px] leading-relaxed text-muted">{l.line}</p>
                        {p && (
                          <Link
                            href={`/work/${p.slug}`}
                            className="roll-host mt-7 inline-flex items-center gap-2.5 text-[15px] text-ivory"
                          >
                            <span className="text-subtle">Built in</span>
                            <span className="roll">
                              <span>{p.name}</span>
                              <span aria-hidden>{p.name}</span>
                            </span>
                            <ArrowUpRight className="size-4 text-gold" aria-hidden />
                          </Link>
                        )}
                      </div>
                      <Orrery active={i} uid={`layer-${i}`} className="w-24 self-start sm:w-32 lg:hidden" />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
