import { projects } from "@/lib/content";

/**
 * A slow band of every layer the work covers — the "everything around the
 * model" in one line. Decorative: the same words live in the Work section.
 */
export default function Marquee() {
  const layers = projects.map((p) => p.layer);
  const run = [...layers, ...layers];

  return (
    <div aria-hidden className="marquee-wrap relative overflow-hidden border-y border-line bg-raised/60 py-6 sm:py-8">
      <div className="marquee flex w-max items-center">
        {run.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display px-8 text-[clamp(1.9rem,3.6vw,3rem)] whitespace-nowrap text-ivory/85 italic sm:px-12">
              {t}
            </span>
            <span className="text-[13px] text-gold">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent sm:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent sm:w-48" />
    </div>
  );
}
