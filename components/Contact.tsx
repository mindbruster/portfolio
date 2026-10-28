import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/content";
import CopyEmail from "./CopyEmail";
import LocalTime from "./LocalTime";
import Reveal from "./Reveal";

const channels = [
  { label: "LinkedIn", value: "in/abdul-aziz", href: profile.linkedin },
  { label: "GitHub", value: "mindbruster", href: profile.github },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 pt-16 pb-10 lg:pt-24">
      <div className="page">
        <Reveal className="doc border-t border-rule-strong pt-5">
          <p className="label lg:col-span-3 lg:pt-3">
            <span className="text-signal">§ 05</span> — Contact
          </p>
          <div className="lg:col-span-9">
            <h2 className="display text-[clamp(3.6rem,11vw,10rem)]">
              Send me <em className="text-signal">the hard part.</em>
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">{profile.about.at(-1)}</p>
          </div>
        </Reveal>

        <Reveal className="doc mt-14">
          <div className="lg:col-span-9 lg:col-start-4">
            <a
              href={`mailto:${profile.email}`}
              className="display block break-all text-[clamp(1.9rem,4.6vw,3.6rem)] underline decoration-rule-strong decoration-1 underline-offset-[0.18em] transition-colors hover:text-signal hover:decoration-current"
            >
              {profile.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <CopyEmail email={profile.email} />
              <a href={profile.resume} download className="btn btn-solid">
                Download CV
                <ArrowDownToLine className="size-3.5" aria-hidden />
              </a>
            </div>

            <ul className="mt-14 grid border-t border-rule sm:grid-cols-3">
              {channels.map((c, i) => (
                <li key={c.label} className={`border-b border-rule sm:border-b-0 ${i > 0 ? "sm:border-l sm:pl-5" : ""}`}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-3 py-5"
                  >
                    <span>
                      <span className="label block">{c.label}</span>
                      <span className="mt-1 block text-[16px] transition-colors group-hover:text-signal">{c.value}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-[12px] text-subtle">
              {profile.location} · <LocalTime /> PKT (UTC+5) · remote or on-site
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
