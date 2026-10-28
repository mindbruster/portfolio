import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/content";
import Mark from "./Mark";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-rule py-8">
      <div className="page flex flex-col gap-4 font-mono text-[12px] text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2.5">
          <Mark className="size-4" />© {new Date().getFullYear()} {profile.name}
        </p>
        <p>Set in Instrument Serif, Geist &amp; Geist Mono. Built with Next.js.</p>
        <Link href="/#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
          Back to top
          <ArrowUp className="size-3" aria-hidden />
        </Link>
      </div>
    </footer>
  );
}
