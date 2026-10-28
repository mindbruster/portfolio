"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { nav, profile } from "@/lib/content";
import Mark from "./Mark";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const progress = useRef<HTMLDivElement>(null);

  // Background on scroll, plus a 1px reading-progress rule along the bottom.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
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

  // Which home section is under the middle of the viewport.
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

  // The mobile sheet locks scrolling behind it and closes on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // A section left over from the home page means nothing on a case study.
  const current = onHome ? active : null;
  const activeIndex = nav.findIndex((n) => n.id === current);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-rule bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="page flex h-16 items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-3">
          {/* "/" rather than "#top" so it also works from a case-study page */}
          <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Mark className="size-6 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="text-[15px] font-medium tracking-tight">{profile.name}</span>
          </Link>
          {activeIndex >= 0 && (
            <span className="hidden truncate font-mono text-xs text-subtle md:inline">
              <span aria-hidden>/ </span>§ {String(activeIndex + 1).padStart(2, "0")}{" "}
              {nav[activeIndex].label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ul className="mr-3 hidden items-center gap-6 lg:flex">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.id === current ? "true" : undefined}
                  className={`group text-sm transition-colors hover:text-ink ${
                    item.id === current ? "text-ink" : "text-muted"
                  }`}
                >
                  <span className="mr-1 font-mono text-[11px] text-subtle transition-colors group-hover:text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a href={profile.resume} download className="btn hidden sm:inline-flex">
            CV
            <ArrowDownToLine className="size-3.5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-rule text-ink lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        ref={progress}
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-signal-fill"
      />

      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto bg-paper lg:hidden">
          <ul className="page flex flex-col pt-6">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="font-mono text-xs text-subtle">
                    § {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-5xl">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="page mt-8 flex flex-wrap gap-3 pb-10">
            <a href={profile.resume} download className="btn btn-solid">
              Download CV
              <ArrowDownToLine className="size-3.5" aria-hidden />
            </a>
            <a href={`mailto:${profile.email}`} className="btn">
              {profile.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
