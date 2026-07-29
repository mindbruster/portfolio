import { experience, education, skills } from "@/lib/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Experience</p>
        </Reveal>

        <ol className="mt-12">
          {experience.map((role, i) => (
            <Reveal as="li" key={`${role.company}-${role.title}`} delay={i * 0.05}>
              <div className="grid gap-6 border-t border-line py-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <p className="font-mono text-[12.5px] text-subtle">
                    {role.period}
                  </p>
                  <h3 className="mt-2 font-medium tracking-tight">
                    {role.company}
                  </h3>
                  <p className="mt-1 text-base text-muted">{role.title}</p>
                </div>

                <ul className="space-y-3">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 text-base leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-accent/70"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* Education shares the same two-column rhythm */}
          <Reveal as="li" delay={0.15}>
            <div className="grid gap-6 border-t border-line py-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="font-mono text-[12.5px] text-subtle">
                  {education.period}
                </p>
                <h3 className="mt-2 font-medium tracking-tight">
                  {education.school}
                </h3>
              </div>
              <p className="text-base text-muted">{education.degree}</p>
            </div>
          </Reveal>
        </ol>

        {/* Skills live here rather than in their own section — they are
            supporting detail, not a headline. */}
        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-line pt-10">
            <p className="eyebrow">Stack</p>
            <dl className="mt-8 grid gap-x-16 gap-y-8 sm:grid-cols-2">
              {skills.map((group) => (
                <div key={group.group}>
                  <dt className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-accent">
                    {group.group}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-muted">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
