import { profile, education } from "@/lib/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="eyebrow">About</p>
            </div>

            <div>
              <div className="max-w-2xl space-y-6">
                {profile.about.map((para) => (
                  <p key={para} className="text-lg leading-relaxed text-fg">
                    {para}
                  </p>
                ))}
              </div>

              <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    Based in
                  </dt>
                  <dd className="mt-2 text-sm text-muted">{profile.location}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    Studied
                  </dt>
                  <dd className="mt-2 text-sm text-muted">
                    {education.degree}, {education.school}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    Looking for
                  </dt>
                  <dd className="mt-2 text-sm text-muted">
                    AI engineering — applied LLM and retrieval
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
