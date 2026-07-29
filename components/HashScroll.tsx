"use client";

import { useEffect } from "react";

/**
 * Fixes deep links to a section (e.g. /#contact).
 *
 * Native hash scrolling runs before hydration, at which point every
 * scroll-revealed section is still collapsed — so the browser lands at the
 * wrong offset and the page appears to reset to the top. This re-runs the
 * scroll once after mount, and again after the reveal transitions settle,
 * so a shared link actually lands where it says it will.
 */
export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = (behavior: ScrollBehavior) => {
      const { hash } = window.location;
      if (!hash || hash.length < 2) return;

      let target: Element | null = null;
      try {
        target = document.querySelector(hash);
      } catch {
        return; // malformed selector in the hash — ignore
      }
      if (!target) return;

      target.scrollIntoView({ behavior, block: "start" });
    };

    // First pass: immediately after hydration.
    scrollToHash("auto");

    // Second pass: after reveal animations have changed final layout height.
    const t = window.setTimeout(() => scrollToHash("auto"), 350);

    return () => window.clearTimeout(t);
  }, []);

  return null;
}
