"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ArmillaryHandle } from "@/lib/armillary";
import Guilloche from "./Guilloche";

/**
 * The armillary sphere in a canvas, with a small label riding on each ring.
 * three.js loads only after mount; without WebGL the engraved rosette
 * stands in.
 */
export default function Armillary({
  labels,
  active = null,
  strength = 1,
  className = "",
}: {
  labels: string[];
  active?: number | null;
  /** 0–1: how far the unlit rings step back */
  strength?: number;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const labelEls = useRef<(HTMLElement | null)[]>([]);
  const handle = useRef<ArmillaryHandle | null>(null);
  const activeRef = useRef(active);
  const strengthRef = useRef(strength);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let cancelled = false;
    // Hold the entrance while the intro curtain is still up
    const delay = document.documentElement.classList.contains("no-intro") ? 0.1 : 1.35;
    import("@/lib/armillary")
      .then(({ createArmillary }) =>
        createArmillary(el, { labels: labelEls.current, reducedMotion: !!reduce, delay, onReady: () => setReady(true) }),
      )
      .then((h) => {
        if (cancelled) return h.destroy();
        handle.current = h;
        h.setActive(activeRef.current, strengthRef.current);
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      handle.current?.destroy();
      handle.current = null;
    };
  }, [reduce]);

  useEffect(() => {
    activeRef.current = active;
    strengthRef.current = strength;
    handle.current?.setActive(active, strength);
  }, [active, strength]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="fade-edge w-[min(90%,640px)]">
            <Guilloche />
          </div>
        </div>
      ) : (
        <canvas
          ref={canvas}
          aria-hidden
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {!failed &&
        labels.map((l, i) => (
          <span
            key={l}
            ref={(node) => {
              labelEls.current[i] = node;
            }}
            aria-hidden
            data-side="right"
            className="group pointer-events-none absolute top-0 left-0 opacity-0 will-change-transform"
          >
            <span className="flex -translate-x-[5px] -translate-y-1/2 items-center whitespace-nowrap group-data-[side=left]:-translate-x-[calc(100%-5px)] group-data-[side=left]:flex-row-reverse">
              <span className="size-[10px] shrink-0 rounded-full border border-gold-bright bg-ink shadow-[0_0_14px_rgb(243_220_164/0.8)]" />
              <span className="h-px w-7 bg-gradient-to-r from-gold-bright to-gold/30 group-data-[side=left]:bg-gradient-to-l" />
              <span className="smallcaps rounded-full border border-line-gold bg-ink/85 px-3 py-1.5 !text-[10px] !tracking-[0.22em] !text-gold-bright backdrop-blur-md">
                {l}
              </span>
            </span>
          </span>
        ))}
    </div>
  );
}
