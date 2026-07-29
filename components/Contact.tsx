import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/content";
import Reveal from "./Reveal";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "in/abdul-aziz", href: profile.linkedin },
  { label: "GitHub", value: "mindbruster", href: profile.github },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  return (
    <section id="contact" className="section pb-0">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[var(--tracking-display)] sm:text-5xl">
            Open to AI engineering roles.
            <span className="block text-subtle">
              Currently in {profile.location}, working remotely or on-site.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="mt-16 grid gap-px border-t border-line sm:grid-cols-2">
            {channels.map((c) => (
              <div key={c.label} className="border-b border-line py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                  {c.label}
                </dt>
                <dd className="mt-2">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="link-underline text-base"
                  >
                    {c.value}
                    {c.href.startsWith("http") && (
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    )}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.14}>
          <a
            href={profile.resume}
            download
            className="mt-12 inline-block rounded-md bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            Download CV
          </a>
        </Reveal>
      </div>
    </section>
  );
}
