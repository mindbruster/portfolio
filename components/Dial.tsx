/**
 * A brass instrument dial in hairlines: concentric circles and a ring of
 * degree ticks. Quiet backdrop for the contact close.
 */
export default function Dial({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: 120 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={className} fill="none" stroke="var(--gold)">
      <circle cx="200" cy="200" r="198" strokeWidth="0.5" opacity="0.55" />
      <circle cx="200" cy="200" r="186" strokeWidth="0.35" opacity="0.4" />
      <circle cx="200" cy="200" r="140" strokeWidth="0.35" opacity="0.3" />
      <circle cx="200" cy="200" r="92" strokeWidth="0.35" opacity="0.25" />
      {ticks.map((i) => {
        const a = (i / ticks.length) * Math.PI * 2;
        const long = i % 10 === 0;
        const r1 = long ? 172 : 179;
        return (
          <line
            key={i}
            x1={200 + Math.cos(a) * r1}
            y1={200 + Math.sin(a) * r1}
            x2={200 + Math.cos(a) * 186}
            y2={200 + Math.sin(a) * 186}
            strokeWidth={long ? 0.6 : 0.35}
            opacity={long ? 0.6 : 0.35}
          />
        );
      })}
      <line x1="2" y1="200" x2="398" y2="200" strokeWidth="0.3" opacity="0.2" />
      <line x1="200" y1="2" x2="200" y2="398" strokeWidth="0.3" opacity="0.2" />
    </svg>
  );
}
