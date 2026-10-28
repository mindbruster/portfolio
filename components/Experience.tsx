import { education, experience, skills } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-16 lg:py-24">
      <div className="page">
        <SectionHead
          n="03"
          label="Experience"
          title={
            <>
              Where the work <em className="text-muted">happened.</em>
            </>
          }
        />

        <ol className="mt-12 lg:mt-16">
          {experience.map((r, i) => (
            <Reveal as="li" key={r.title + r.period} delay={i * 0.04} className="doc border-t border-rule py-10">
              <div className="lg:col-span-3">
                <p className="font-mono text-[13px]">{r.period}</p>
                {r.location && <p className="mt-1 font-mono text-[12px] text-subtle">{r.location}</p>}
              </div>
              <div className="lg:col-span-9">
                <h3 className="display text-[2.15rem] leading-[1.05] sm:text-[2.5rem]">{r.title}</h3>
                <p className="mt-1.5 text-muted">{r.company}</p>
                <ul className="mt-5 max-w-3xl space-y-2.5">
                  {r.points.map((pt) => (
                    <li
                      key={pt}
                      className="relative pl-6 text-[17px] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.78em] before:h-0.5 before:w-2.5 before:bg-signal-fill"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" className="doc border-y border-rule py-10">
            <div className="lg:col-span-3">
              <p className="font-mono text-[13px]">{education.period}</p>
              <p className="mt-1 font-mono text-[12px] text-subtle">Education</p>
            </div>
            <div className="lg:col-span-9">
              <h3 className="display text-[2.15rem] leading-[1.05] sm:text-[2.5rem]">{education.degree}</h3>
              <p className="mt-1.5 text-muted">{education.school}</p>
            </div>
          </Reveal>
        </ol>

        {/* Skills, set as a bill of materials */}
        <div className="doc mt-16 lg:mt-24">
          <Reveal className="lg:col-span-3">
            <p className="label">Bill of materials</p>
            <p className="mt-3 max-w-[16rem] text-[15px] leading-snug text-muted">
              What the systems above are made of.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-9">
            <table className="w-full border-collapse text-left">
              <thead className="sr-only">
                <tr>
                  <th scope="col">Area</th>
                  <th scope="col">Tools</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((g, i) => (
                  <tr key={g.group} className="block border-t border-rule py-4 last:border-b sm:table-row sm:py-0">
                    <th
                      scope="row"
                      className="block pb-1.5 align-top font-mono text-[12px] font-normal whitespace-nowrap text-subtle sm:table-cell sm:w-0 sm:py-4 sm:pr-6"
                    >
                      {String(i + 1).padStart(2, "0")}&nbsp;&nbsp;{g.group}
                    </th>
                    <td className="block text-[16px] leading-relaxed sm:table-cell sm:py-4">
                      {g.items.map((item, j) => (
                        <span key={item}>
                          {item}
                          {/* trailing space gives the line somewhere to break */}
                          {j < g.items.length - 1 && (
                            <>
                              <span aria-hidden className="ml-2 text-rule-strong">
                                /
                              </span>{" "}
                            </>
                          )}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
