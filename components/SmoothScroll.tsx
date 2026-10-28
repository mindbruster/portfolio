"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Weighted, eased scrolling. Skipped entirely for people who ask for reduced
 * motion — they get the browser's native scroll.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      autoRaf: true,
      // In-page links glide too, stopping clear of the fixed header
      anchors: { offset: -88 },
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
