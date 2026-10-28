import Guilloche from "./Guilloche";

const legend = "ABDUL AZIZ · AI ENGINEER · LAHORE, PAKISTAN · ";

/**
 * The monogram seal. Large: an engraved emblem with the name set round its
 * edge, standing in for a portrait. Small: a plain gold-rimmed monogram for
 * the header and footer.
 */
export default function Seal({ size = "lg", className = "" }: { size?: "lg" | "sm"; className?: string }) {
  if (size === "sm") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden className={className}>
        <circle cx="20" cy="20" r="19" fill="none" stroke="var(--gold)" strokeOpacity="0.7" strokeWidth="1" />
        <circle cx="20" cy="20" r="16.5" fill="none" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="0.75" />
        <text
          x="20"
          y="26.5"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="18"
          fontWeight="600"
          letterSpacing="-1.5"
          fill="var(--gold)"
        >
          AA
        </text>
      </svg>
    );
  }

  return (
    <div className={`relative aspect-square ${className}`}>
      <div className="spin-slow absolute inset-0">
        <Guilloche pattern="seal" engrave={false} />
      </div>
      <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-0 h-full w-full">
        <defs>
          <path id="seal-legend" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" />
          <radialGradient id="seal-core" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#16181e" />
            <stop offset="100%" stopColor="#0a0b0e" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="69" fill="none" stroke="var(--gold)" strokeOpacity="0.45" strokeWidth="0.5" />
        <text fontFamily="var(--font-sans)" fontSize="8" fontWeight="500" fill="var(--gold)" letterSpacing="2.4">
          <textPath href="#seal-legend" textLength="468" lengthAdjust="spacing">
            {legend}
          </textPath>
        </text>
        <circle cx="100" cy="100" r="44" fill="url(#seal-core)" stroke="var(--gold)" strokeOpacity="0.6" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="40.5" fill="none" stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="0.5" />
      </svg>
      <span className="display gold-text absolute inset-0 grid place-items-center text-[clamp(3rem,9vw,5.5rem)] font-semibold tracking-[-0.06em]">
        AA
      </span>
    </div>
  );
}
