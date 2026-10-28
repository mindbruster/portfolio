/**
 * The armillary as a flat engraving — for places a live 3D sphere would be
 * too much (phones, case-study headers). One ring can be lit, matching
 * the ring order in lib/armillary.ts.
 */
export default function Orrery({ active, className = "", uid = "o" }: { active?: number; className?: string; uid?: string }) {
  // Gradient and filter ids must be unique when several orreries share a page
  const glow = `orrery-glow-${uid}`;
  const core = `orrery-core-${uid}`;
  const ring = (i: number) =>
    active === i
      ? { stroke: "var(--gold-bright)", strokeWidth: 2.4, filter: `url(#${glow})`, opacity: 1 }
      : { stroke: "var(--gold)", strokeWidth: 1, opacity: active === undefined ? 0.75 : 0.32 };

  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className} fill="none">
      <defs>
        <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={core} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#3a3c44" />
          <stop offset="55%" stopColor="#111318" />
          <stop offset="100%" stopColor="#050608" />
        </radialGradient>
      </defs>
      <g transform="rotate(-18 100 100)">
        <line x1="100" y1="6" x2="100" y2="194" stroke="var(--gold)" strokeWidth="0.8" opacity="0.6" />
        <circle cx="100" cy="100" r="86" {...ring(1)} />
        <ellipse cx="100" cy="100" rx="22" ry="76" {...ring(6)} />
        <ellipse cx="100" cy="70" rx="70" ry="15" {...ring(4)} />
        <ellipse cx="100" cy="130" rx="70" ry="15" {...ring(5)} />
        <ellipse cx="100" cy="100" rx="76" ry="18" {...ring(2)} />
        <g transform="rotate(-24 100 100)" {...ring(3)}>
          <ellipse cx="100" cy="100" rx="76" ry="22" />
          <ellipse cx="100" cy="100" rx="76" ry="27" />
        </g>
        <circle cx="100" cy="100" r="20" fill={`url(#${core})`} stroke="var(--gold)" strokeWidth="0.6" />
        <ellipse cx="100" cy="100" rx="94" ry="24" {...ring(0)} />
      </g>
    </svg>
  );
}
