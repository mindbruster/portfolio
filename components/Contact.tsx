import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/content";
import CopyEmail from "./CopyEmail";
import LocalTime from "./LocalTime";
import Magnetic from "./Magnetic";
import Dial from "./Dial";
import Reveal from "./Reveal";

const channels = [
  { label: "LinkedIn", value: "in/abdul-aziz", href: profile.linkedin },
  { label: "GitHub", value: "mindbruster", href: profile.github },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line py-28 lg:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_45%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute top-[44%] left-1/2 w-[min(980px,150vw)] -translate-x-1/2 -translate-y-1/2 opacity-60">
        <div className="spin-slow">
          <Dial />
        </div>
      </div>

      <div className="page relative text-center">
        <Reveal>
          <p className="smallcaps inline-flex items-center gap-4">
            <span className="font-display text-[19px] tracking-[0.06em] normal-case">N° VII</span>
            <span aria-hidden className="h-px w-10 bg-accent/50" />
            Contact
          </p>
        </Reveal>
        <Reveal variant="mask" delay={0.05} className="mt-8">
          <h2 className="display mx-auto text-[clamp(3.6rem,10.5vw,10rem)] leading-[0.88] font-light tracking-[-0.03em]">
            Send me <br className="hidden sm:block" />
            <em className="sheen-text font-normal">the hard part.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="mx-auto mt-10 max-w-xl">
          <p className="text-lg leading-relaxed text-muted sm:text-xl">{profile.about.at(-1)}</p>
        </Reveal>

        <Reveal delay={0.18} className="mt-14">
          <a
            href={`mailto:${profile.email}`}
            className="roll-host font-display inline-block max-w-full text-[clamp(1.6rem,4vw,3.4rem)] leading-tight font-light break-all text-fg"
          >
            <span className="roll">
              <span>{profile.email}</span>
              <span aria-hidden>{profile.email}</span>
            </span>
            <span aria-hidden className="mx-auto mt-2 block h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
          </a>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="btn-primary">
                Write to me
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </Magnetic>
            <CopyEmail email={profile.email} />
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mx-auto mt-20 max-w-4xl">
          <ul className="grid border-y border-line sm:grid-cols-3">
            {channels.map((c, i) => (
              <li key={c.label} className={i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center gap-1.5 px-6 py-7 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="smallcaps !text-[10px]">{c.label}</span>
                  <span className="text-[16px] transition-colors group-hover:text-accent-bright">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[14px] text-muted">
            <span>
              {profile.location} · <LocalTime /> PKT
            </span>
            <span aria-hidden className="text-subtle">
              ·
            </span>
            <a href={profile.resume} download className="link inline-flex items-center gap-1.5">
              Download CV
              <ArrowDownToLine className="size-3.5" aria-hidden />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
