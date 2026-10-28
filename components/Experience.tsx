import { education, experience, skills } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Experience() {
  const entries = [
    ...experience.map((r) => ({ period: r.period, title: r.title, org: r.company, place: r.location, points: r.points })),
    { period: education.period, title: education.degree, org: education.school, place: "Education", points: [] as string[] },
  ];

  return (
    <section id="experience" className="relative scroll-mt-20 border-t border-line py-24 lg:py-36">
      <div className="page">
        <SectionHead
          n="V"
          eyebrow="Experience"
          title={
            <>
              Where the work <em className="sheen-text font-normal">happened.</em>
            </>
          }
        />

        <ol className="mt-16 border-b border-line lg:mt-24">
          {entries.map((e, i) => (
            <Reveal as="li" key={e.title + e.period} delay={i * 0.04} className="grid gap-5 border-t border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
              <div className="lg:col-span-3">
                <p className="smallcaps !tracking-[0.18em]">{e.period}</p>
                {e.place && <p className="mt-2 text-[14px] text-subtle">{e.place}</p>}
              </div>
              <div className="lg:col-span-9">
                <h3 className="display text-[clamp(2rem,3.2vw,2.9rem)] leading-[1.04] font-light">{e.title}</h3>
                <p className="mt-2 text-[16px] text-accent-bright/90">{e.org}</p>
                {e.points.length > 0 && (
                  <ul className="mt-7 grid max-w-4xl gap-x-10 gap-y-3 md:grid-cols-2">
                    {e.points.map((pt) => (
                      <li key={pt} className="relative pl-6 text-[15.5px] leading-relaxed text-muted">
                        <span aria-hidden className="absolute top-[0.62em] left-0 size-[5px] rotate-45 bg-accent/80" />
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
        <div className="mt-28 lg:mt-36">
          <Reveal>
            <p className="smallcaps flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-accent/50" />
              The toolkit — what the systems above are made of
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={(i % 3) * 0.07}>
                <p className="flex items-baseline justify-between gap-3 border-b border-line pb-4">
                  <span className="display text-[1.8rem] leading-none">{g.group}</span>
                  <span className="font-mono text-[11px] text-subtle">{String(g.items.length).padStart(2, "0")}</span>
                </p>
                <p className="mt-4 text-[15px] leading-[1.9] text-muted">
                  {g.items.map((item, j) => (
                    <span key={item}>
                      {item}
                      {j < g.items.length - 1 && (
                        <span aria-hidden className="mx-2 text-accent/50">
                          ·
                        </span>
                      )}{" "}
                    </span>
                  ))}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
