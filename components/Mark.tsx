/**
 * The logo: a three-span waterfall. Two short spans of work bracket one long
 * grey span — the model — which is the whole site's argument in 24px.
 */
export default function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="1" y="4" width="8" height="4" rx="2" fill="var(--signal-fill)" />
      <rect x="6" y="10" width="13" height="4" rx="2" fill="var(--model)" />
      <rect x="16" y="16" width="7" height="4" rx="2" fill="var(--signal-fill)" />
    </svg>
  );
}
