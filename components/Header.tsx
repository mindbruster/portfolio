"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, profile } from "@/lib/content";
import Magnetic from "./Magnetic";
import Mark from "./Mark";

const inline = nav.filter((n) => n.id !== "contact");

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const progress = useRef<HTMLDivElement>(null);

  // Glass once the page moves, plus an accent reading-progress hairline.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) {
          progress.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Which home section sits under the middle of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  // The mobile sheet locks the page behind it and closes on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // A section remembered from the home page means nothing on a case study.
  const current = onHome ? active : null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="page flex h-[76px] items-center justify-between gap-6">
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3.5">
          <Mark className="size-11 transition-transform duration-700 group-hover:rotate-[24deg]" />
          <span className="font-display text-[23px] leading-none font-medium tracking-tight">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {inline.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.id === current ? "true" : undefined}
                className={`roll-host relative flex items-center gap-2 text-[14.5px] transition-colors ${
                  item.id === current ? "text-accent-bright" : "text-muted hover:text-fg"
                }`}
              >
                <span
                  aria-hidden
                  className={`size-[5px] rotate-45 bg-accent transition-all duration-500 ${item.id === current ? "opacity-100" : "scale-0 opacity-0"}`}
                />
                <span className="roll">
                  <span>{item.label}</span>
                  <span aria-hidden>{item.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Magnetic strength={0.2}>
              <Link href="/#contact" className="btn-primary !px-5 !py-2.5 !text-[14px]">
                Let&apos;s talk
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </Magnetic>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-fg lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gradient-to-r from-accent-deep via-accent to-accent-bright"
      />

      {open && (
        <div id="mobile-nav" data-lenis-prevent className="h-[calc(100dvh-76px)] overflow-y-auto bg-ink lg:hidden">
          <ul className="page flex flex-col pt-6">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-5 py-5">
                  <span className="w-7 font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-5xl font-light">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="page mt-10 flex flex-wrap gap-3 pb-12">
            <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary">
              Let&apos;s talk
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <a href={profile.resume} download className="btn-ghost">
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
