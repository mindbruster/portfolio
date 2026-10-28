"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import SectionHead from "./SectionHead";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected work as an editorial index: one large line per project. On a
 * mouse, the product's screenshot floats beside the pointer while a row is
 * hovered; on touch, each row carries its own thumbnail.
 */
export default function WorkIndex() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 30, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 30, mass: 0.6 });

  return (
    <section id="work" className="relative scroll-mt-20 border-t border-line py-24 lg:py-36">
      <div className="page">
        <SectionHead
          n="III"
          eyebrow="Selected work"
          title={
            <>
              Seven platforms in production, <em className="gold-text font-normal">and the problems that made them hard.</em>
            </>
          }
          aside={
            <p className="max-w-[18rem] text-[15px] leading-relaxed text-muted">
              Every one is a case study: the problem, the architecture, and the decisions that mattered.
            </p>
          }
        />

        <ul
          className="mt-16 border-b border-line lg:mt-24"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          {projects.map((p, i) => (
            <li key={p.slug} id={`work-${p.slug}`} className="scroll-mt-28">
              <Link
                href={`/work/${p.slug}`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                onFocus={() => setHovered(null)}
                className="group relative grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-5 border-t border-line py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-x-4 lg:grid-cols-12 lg:py-10"
              >
                <span className="self-start pt-3 font-mono text-[12px] text-subtle transition-colors duration-500 group-hover:text-gold lg:col-span-1 lg:self-center lg:pt-0">
                  {pad(i + 1)}
                </span>
                <span className="lg:col-span-6">
                  <span className="display block text-[clamp(2.5rem,5.6vw,5.6rem)] leading-[0.95] font-light transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:text-gold-bright">
                    {p.name}
                  </span>
                  <span className="mt-2 block text-[15px] text-muted lg:hidden">{p.tagline}</span>
                </span>
                <span className="hidden lg:col-span-4 lg:block">
                  <span className="smallcaps block !text-[10.5px]">{p.layer}</span>
                  <span className="mt-1.5 block text-[15px] text-muted">{p.tagline}</span>
                </span>
                <span className="flex justify-end self-start pt-2 lg:col-span-1 lg:self-center lg:pt-0">
                  <span className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </span>
                {p.shot && (
                  <span className="col-span-full block overflow-hidden rounded-xl border border-line lg:hidden">
                    <Image
                      src={p.shot.src}
                      alt=""
                      width={p.shot.w}
                      height={p.shot.h}
                      sizes="100vw"
                      className="duo h-auto w-full"
                    />
                  </span>
                )}
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 h-px w-0 bg-gradient-to-r from-gold via-gold-bright to-transparent transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating preview, mouse only */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
        style={{ x, y }}
      >
        <div
          className={`relative -translate-x-[8%] -translate-y-[110%] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            hovered === null ? "scale-90 rotate-[-4deg] opacity-0" : "scale-100 rotate-[-2deg] opacity-100"
          }`}
        >
          <div className="relative aspect-[16/10] w-[440px] overflow-hidden rounded-2xl border border-line-gold bg-card shadow-[0_40px_100px_-30px_rgb(0_0_0/0.95),0_0_60px_-20px_rgb(216_181_108/0.35)]">
            {projects.map((p, i) =>
              p.shot ? (
                <Image
                  key={p.slug}
                  src={p.shot.src}
                  alt=""
                  fill
                  sizes="440px"
                  className={`object-cover object-top transition-[opacity,transform] duration-700 ${
                    hovered === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ) : null,
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
