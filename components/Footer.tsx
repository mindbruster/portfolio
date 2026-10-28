import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/content";
import Seal from "./Seal";

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div aria-hidden className="rule-gold absolute inset-x-0 -top-px opacity-50" />
      <div className="page flex flex-col gap-6 py-10 text-[13.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3">
          <Seal size="sm" className="size-8" />
          <span>
            <span className="font-display text-[17px] text-ivory">{profile.name}</span>
            <span className="block text-[12.5px] text-subtle">
              © {new Date().getFullYear()} · {profile.role}, {profile.location}
            </span>
          </span>
        </p>
        <p className="text-subtle">Set in Cormorant Garamond &amp; Geist. Built with Next.js.</p>
        <Link href="/#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-bright">
          Back to top
          <ArrowUp className="size-3.5" aria-hidden />
        </Link>
      </div>
    </footer>
  );
}
