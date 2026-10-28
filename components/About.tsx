import { education, experience, numerals, principles, profile } from "@/lib/content";
import Reveal from "./Reveal";
import Seal from "./Seal";
import SectionHead from "./SectionHead";

export default function About() {
  const now = experience[0];
  const facts = [
    { k: "Now", v: now.title, d: now.company },
    { k: "Based", v: profile.location, d: "Remote or on-site" },
    { k: "Studied", v: education.degree, d: `${education.school}, ${education.period.slice(-4)}` },
    { k: "Looking for", v: "Applied LLM and retrieval work", d: "Where the correctness bar is high" },
  ];

  return (
    <section id="about" className="relative scroll-mt-20 border-t border-line py-24 lg:py-32">
      <div className="page">
        <SectionHead
          n="II"
          eyebrow="About"
          title={
            <>
              Where the difficulty <em className="gold-text">actually lives.</em>
            </>
          }
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* The seal and the particulars */}
          <Reveal className="lg:col-span-5">
            <Seal className="mx-auto w-full max-w-[380px]" />
            <dl className="glass mt-12 grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl p-6 sm:p-7">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="smallcaps !text-[10px]">{f.k}</dt>
                  <dd className="mt-2 text-[15px] leading-snug">
                    {f.v}
                    <span className="mt-0.5 block text-[13.5px] text-muted">{f.d}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal variant="mask">
              <blockquote className="font-display relative text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08] italic">
                <span aria-hidden className="gold-text absolute -top-6 -left-2 text-[5rem] leading-none not-italic sm:-left-8">
                  &ldquo;
                </span>
                {profile.quote}
              </blockquote>
            </Reveal>
            <div aria-hidden className="rule-gold mt-10 w-40" />
            <Reveal delay={0.1} className="mt-10 space-y-6 text-[17px] leading-[1.75] text-muted sm:text-[18px]">
              {profile.about.map((para, i) => (
                <p key={para} className={i === 0 ? "text-[19px] text-ivory sm:text-[21px]" : ""}>
                  {para}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Working rules */}
        <div className="mt-24 lg:mt-32">
          <Reveal>
            <p className="smallcaps flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-gold/50" />
              Working rules — each one came out of a decision in the work
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="plate group rounded-[22px] p-7 transition-colors duration-500 hover:border-line-gold sm:p-9">
                <div className="flex items-start gap-6">
                  <span className="display gold-text w-14 shrink-0 text-[3.25rem] leading-none">{numerals[i]}</span>
                  <div>
                    <h3 className="display text-[1.9rem] leading-[1.05] sm:text-[2.15rem]">{p.title}</h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
