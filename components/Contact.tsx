import { ArrowDownToLine, ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/lib/content";
import CopyEmail from "./CopyEmail";
import Guilloche from "./Guilloche";
import LocalTime from "./LocalTime";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const channels = [
  { label: "LinkedIn", value: "in/abdul-aziz", href: profile.linkedin },
  { label: "GitHub", value: "mindbruster", href: profile.github },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line py-28 lg:py-40">
      {/* The rosette again, centred and faint, behind the close */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="fade-edge w-[150vw] max-w-[1100px] opacity-60 sm:w-[95vw]">
          <div className="spin-slow">
            <Guilloche engrave={false} />
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgb(8_9_12/0.55),transparent)]" />

      <div className="page relative">
        <SectionHead
          n="V"
          eyebrow="Contact"
          center
          title={
            <span className="block text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.92]">
              Send me <em className="gold-text">the hard part.</em>
            </span>
          }
        />

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-muted sm:text-xl">{profile.about.at(-1)}</p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href={`mailto:${profile.email}`} className="btn-gold max-w-full !px-6 !py-3.5 !text-[15.5px]">
              <Mail className="size-4 shrink-0" aria-hidden />
              <span className="truncate">{profile.email}</span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-3xl">
          <ul className="glass grid overflow-hidden rounded-2xl sm:grid-cols-3">
            {channels.map((c, i) => (
              <li key={c.label} className={i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-3 px-6 py-5 transition-colors hover:bg-white/[0.03]"
                >
                  <span>
                    <span className="smallcaps block !text-[10px]">{c.label}</span>
                    <span className="mt-1 block text-[15.5px] transition-colors group-hover:text-gold-bright">{c.value}</span>
                  </span>
                  <ArrowUpRight
                    className="size-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[14px] text-muted">
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
