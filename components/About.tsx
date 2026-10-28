import { education, experience, numerals, principles, profile } from "@/lib/content";
import Reveal from "./Reveal";
import Seal from "./Seal";
import SectionHead from "./SectionHead";

export default function About() {
  const now = experience[0];
  const facts = [
    { k: "Now", v: `${now.title}, ${now.company}` },
    { k: "Based", v: `${profile.location} — remote or on-site` },
    { k: "Studied", v: `${education.degree}, ${education.school}` },
    { k: "Seeking", v: "Applied LLM and retrieval work, where the correctness bar is high" },
  ];
  // about[1] is the thesis, set large at the top of the page
  const [first, , ...rest] = profile.about;

  return (
    <section id="about" className="relative scroll-mt-20 border-t border-line py-24 lg:py-36">
      <div className="page">
        <SectionHead
          n="IV"
          eyebrow="About"
          title={
            <>
              Where the difficulty <em className="gold-text font-normal">actually lives.</em>
            </>
          }
        />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <Seal className="mx-auto w-full max-w-[360px] lg:mx-0" />
            <dl className="mt-14 divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                  <dt className="smallcaps pt-1 !text-[10px]">{f.k}</dt>
                  <dd className="text-[15.5px] leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:pt-4">
            <p className="font-display text-[clamp(1.75rem,2.6vw,2.4rem)] leading-[1.25] font-light">{first}</p>
            <div aria-hidden className="rule-gold my-10 w-32" />
            <div className="space-y-6 text-[17px] leading-[1.8] text-muted sm:text-[18px]">
              {rest.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Working rules */}
        <div className="mt-28 lg:mt-36">
          <Reveal>
            <p className="smallcaps flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-gold/50" />
              Working rules — each one came out of a decision in the work
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08}>
                <span className="display gold-text block text-[3.5rem] leading-none font-light">{numerals[i]}</span>
                <span aria-hidden className="mt-6 block h-px w-full bg-gradient-to-r from-gold/50 to-transparent" />
                <h3 className="display mt-6 text-[1.85rem] leading-[1.08]">{p.title}</h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
