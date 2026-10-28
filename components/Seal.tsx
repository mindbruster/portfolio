import Mark from "./Mark";

const legend = "ABDUL AZIZ · AI ENGINEER · LAHORE, PAKISTAN · ";

/* Reeded edge: fine radial strokes between two rims, like a struck coin */
const reeds = Array.from({ length: 144 }, (_, i) => {
  const a = (i / 144) * Math.PI * 2;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x1: 100 + c * 88, y1: 100 + s * 88, x2: 100 + c * 95, y2: 100 + s * 95 };
});

/**
 * The emblem in About, standing in for a portrait: a struck coin with the
 * name set round its edge and the armillary mark at its centre.
 */
export default function Seal({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden className="spin-slow absolute inset-0 h-full w-full" fill="none" stroke="var(--accent)">
        <circle cx="100" cy="100" r="98.5" strokeWidth="0.7" strokeOpacity="0.7" />
        <circle cx="100" cy="100" r="96.5" strokeWidth="0.4" strokeOpacity="0.45" />
        {reeds.map((r, i) => (
          <line key={i} {...r} strokeWidth="0.35" strokeOpacity={i % 12 === 0 ? 0.75 : 0.4} />
        ))}
        <circle cx="100" cy="100" r="86.5" strokeWidth="0.4" strokeOpacity="0.45" />
        <circle cx="100" cy="100" r="81.5" strokeWidth="0.6" strokeOpacity="0.55" />
        <circle cx="100" cy="100" r="52" strokeWidth="0.35" strokeOpacity="0.3" strokeDasharray="0.6 2.2" />
      </svg>
      <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-0 h-full w-full">
        <defs>
          <path id="seal-legend" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
          <radialGradient id="seal-core" cx="50%" cy="40%" r="60%">
            <stop offset="0%" style={{ stopColor: "var(--card)" }} />
            <stop offset="100%" style={{ stopColor: "var(--ink)" }} />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="69" fill="none" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="0.5" />
        <text fontFamily="var(--font-sans)" fontSize="8" fontWeight="500" fill="var(--accent)" letterSpacing="2.4">
          <textPath href="#seal-legend" textLength="468" lengthAdjust="spacing">
            {legend}
          </textPath>
        </text>
        <circle cx="100" cy="100" r="44" fill="url(#seal-core)" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="40.5" fill="none" stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="0.5" />
      </svg>
      <Mark cut="var(--card)" className="absolute top-1/2 left-1/2 w-[32%] -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
