"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a stat like "30k+" up from zero when it scrolls into view. The
 * prefix/suffix around the number are kept as written.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const counts = match !== null;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(target);

  useEffect(() => {
    // Deps are primitives and inView only flips once, so this runs one time
    if (!counts || !inView || reduce) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, counts]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {match[1]}
      {n}
      {match[3]}
    </span>
  );
}
