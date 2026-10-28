/**
 * The logo: a small armillary. A jewel core (the model) sits inside a
 * tilted ring and a meridian on a polar axis; the ring passes behind the
 * core and back across its face, cut out where it crosses. `cut` must
 * match whatever the mark sits on so the crossing reads as a gap.
 */
export default function Mark({ className = "", cut = "var(--ink)" }: { className?: string; cut?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className} fill="none" strokeLinecap="round">
      <g transform="rotate(-28 20 20)">
        <line x1="20" y1="0.9" x2="20" y2="39.1" stroke="var(--accent)" strokeWidth="0.9" strokeOpacity="0.7" />
        <circle cx="20" cy="0.9" r="1.1" fill="var(--accent)" />
        <circle cx="20" cy="39.1" r="1.1" fill="var(--accent)" />
        <ellipse cx="20" cy="20" rx="4.4" ry="17.4" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.55" />
        {/* back half of the ring, behind the core */}
        <path d="M2.4 20 A17.6 4.6 0 0 1 37.6 20" stroke="var(--accent-bright)" strokeWidth="2" />
        <circle cx="20" cy="20" r="6.4" fill="var(--accent)" />
        <circle cx="18.3" cy="18.2" r="2.2" fill="var(--accent-bright)" opacity="0.75" />
        {/* front half, with a cut-out only where it crosses the core */}
        <path d="M28.26 24.06 A17.6 4.6 0 0 1 11.74 24.06" stroke={cut} strokeWidth="4.4" strokeLinecap="butt" />
        <path d="M2.4 20 A17.6 4.6 0 0 0 37.6 20" stroke="var(--accent-bright)" strokeWidth="2" />
      </g>
    </svg>
  );
}
