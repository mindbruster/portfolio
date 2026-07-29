"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, profile } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : ""
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        {/* Routes to "/" rather than "#home" so it works from a case-study page,
            where a bare hash would resolve against the current URL and do nothing. */}
        <Link
          href="/"
          className="font-mono text-sm text-fg transition-colors hover:text-accent"
        >
          abdul-aziz
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={profile.resume}
              download
              className="rounded border border-line px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              CV
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="font-mono text-sm text-muted sm:hidden"
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg sm:hidden">
          <ul className="container-page flex flex-col py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.resume}
                download
                className="block py-2 text-sm text-accent"
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
