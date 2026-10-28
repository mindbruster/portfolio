import { education, experience, skills } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Experience() {
  const entries = [
    ...experience.map((r) => ({ period: r.period, title: r.title, org: r.company, place: r.location, points: r.points })),
    { period: education.period, title: education.degree, org: education.school, place: "Education", points: [] as string[] },
  ];

  return (
    <section id="experience" className="relative scroll-mt-20 border-t border-line py-24 lg:py-32">
      <div className="page">
        <SectionHead
          n="III"
          eyebrow="Experience"
          title={
            <>
              Where the work <em className="gold-text">happened.</em>
            </>
          }
        />

        {/* Timeline: a gold rule with a lozenge at every role */}
        <ol className="relative mt-16 lg:mt-24">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent lg:left-[calc(25%+5px)]"
          />
          {entries.map((e, i) => (
            <Reveal as="li" key={e.title + e.period} delay={i * 0.05} className="relative grid gap-4 pb-14 pl-9 last:pb-0 lg:grid-cols-4 lg:gap-12 lg:pl-0">
              <span
                aria-hidden
                className="absolute top-[0.55rem] left-0 size-[11px] rotate-45 border border-gold bg-ink lg:left-[25%]"
              />
              <div className="lg:pr-10 lg:text-right">
                <p className="smallcaps !tracking-[0.18em]">{e.period}</p>
                {e.place && <p className="mt-1.5 text-[13.5px] text-subtle">{e.place}</p>}
              </div>
              <div className="lg:col-span-3 lg:pl-12">
                <h3 className="display text-[2.1rem] leading-[1.05] sm:text-[2.6rem]">{e.title}</h3>
                <p className="mt-1.5 text-[16px] text-gold-bright/90">{e.org}</p>
                {e.points.length > 0 && (
                  <ul className="mt-6 max-w-3xl space-y-3">
                    {e.points.map((pt) => (
                      <li key={pt} className="relative pl-6 text-[16.5px] leading-relaxed text-muted">
                        <span aria-hidden className="absolute top-[0.72em] left-0 h-px w-3 bg-gold/70" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Toolkit */}
        <div className="mt-24 lg:mt-32">
          <Reveal>
            <p className="smallcaps flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-gold/50" />
              The toolkit — what the systems above are made of
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={(i % 3) * 0.07} className="glass rounded-[20px] p-6 sm:p-7">
                <p className="flex items-baseline justify-between gap-3">
                  <span className="display text-[1.65rem] leading-none">{g.group}</span>
                  <span className="font-mono text-[11px] text-subtle">{String(g.items.length).padStart(2, "0")}</span>
                </p>
                <div aria-hidden className="rule-gold mt-4 opacity-60" />
                <ul className="mt-4 flex flex-wrap gap-x-1 gap-y-1.5 text-[15px] leading-relaxed text-muted">
                  {g.items.map((item, j) => (
                    <li key={item}>
                      {item}
                      {j < g.items.length - 1 && (
                        <span aria-hidden className="mx-1.5 text-gold/60">
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
