"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger successive items by passing an increasing delay (seconds). */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "section" | "article";
  /** "mask" slides the content up out of a clipped box — for headings. */
  variant?: "fade" | "mask";
};

/**
 * Single source of scroll-reveal motion for the whole site. Plays once,
 * and collapses to a plain render when reduced motion is requested.
 */
export default function Reveal({ children, delay = 0, className, style, as = "div", variant = "fade" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  if (variant === "mask") {
    // The trigger sits on the clipping box: the content starts clipped away,
    // so it could never report itself as in view.
    return (
      <MotionTag
        className={className}
        style={{ ...style, overflow: "hidden", paddingBottom: "0.1em" }}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div
          variants={{ hidden: { y: "105%" }, shown: { y: 0 } }}
          transition={{ duration: 1.1, delay, ease: [0.19, 1, 0.22, 1] }}
        >
          {children}
        </motion.div>
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
