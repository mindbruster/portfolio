import { education, experience, principles, profile, stats } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const numerals = ["I", "II", "III", "IV", "V", "VI"];

export default function About() {
  const [lede, ...rest] = profile.about;
  const now = experience[0];

  return (
    <section id="about" className="scroll-mt-16 py-16 lg:py-24">
      <div className="page">
        <SectionHead
          n="02"
          label="About"
          title={
            <>
              Where the difficulty <em className="text-muted">actually lives.</em>
            </>
          }
        />

        <div className="doc mt-12 lg:mt-16">
          <Reveal className="lg:col-span-6 lg:col-start-4">
            <p className="text-xl leading-relaxed sm:text-[22px]">{lede}</p>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-muted sm:text-lg">
              {rest.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>

          {/* Sidenotes, set like a document's margin */}
          <Reveal delay={0.08} className="lg:col-span-3">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-rule pt-5 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-6">
              <div>
                <dt className="label">Now</dt>
                <dd className="mt-1.5 text-[15px] leading-snug">
                  {now.title}
                  <span className="block text-muted">{now.company}</span>
                </dd>
              </div>
              <div>
                <dt className="label">Based</dt>
                <dd className="mt-1.5 text-[15px] leading-snug">
                  {profile.location}
                  <span className="block text-muted">Remote or on-site</span>
                </dd>
              </div>
              <div>
                <dt className="label">Studied</dt>
                <dd className="mt-1.5 text-[15px] leading-snug">
                  {education.degree}
                  <span className="block text-muted">
                    {education.school}, {education.period.slice(-4)}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="label">Looking for</dt>
                <dd className="mt-1.5 text-[15px] leading-snug">
                  Applied LLM and retrieval work
                  <span className="block text-muted">where the correctness bar is high</span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* By the numbers */}
        <Reveal className="mt-16 lg:mt-24">
          <dl className="grid grid-cols-2 border-y border-rule lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse justify-end py-7 pr-4 ${i % 2 === 1 ? "border-l border-rule pl-5" : ""} ${
                  i >= 2 ? "border-t border-rule lg:border-t-0" : ""
                } ${i === 2 ? "lg:border-l lg:pl-5" : ""}`}
              >
                <dt className="mt-3 max-w-[16rem] font-mono text-[12px] leading-snug text-muted">{s.label}</dt>
                <dd className="display text-[clamp(3.25rem,6vw,5rem)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Working rules — drawn from real decisions, not values on a wall */}
        <div className="doc mt-16 lg:mt-24">
          <Reveal className="lg:col-span-3">
            <p className="label">Working rules</p>
            <p className="mt-3 max-w-[16rem] text-[15px] leading-snug text-muted">
              Each one came out of a decision in the work above.
            </p>
          </Reveal>
          <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-9">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05}>
                <span className="display text-3xl text-signal">{numerals[i]}.</span>
                <h3 className="display mt-2 text-[2rem] leading-[1.05]">{p.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
