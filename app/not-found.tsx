import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Orrery from "@/components/Orrery";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-[88vh] items-center overflow-hidden pt-[72px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[130vw] max-w-[820px] opacity-[0.12]">
          <div className="spin-slow">
            <Orrery uid="404" />
          </div>
        </div>
      </div>
      <div className="page relative text-center">
        <p className="smallcaps">Error 404 — not on the instrument</p>
        <h1 className="display mt-6 text-[clamp(3.5rem,10vw,8rem)] font-light">
          This page <em className="gold-text">doesn&apos;t exist.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The link may be mistyped, or the page has moved. Everything that exists is on the home page.
        </p>
        <Link href="/" className="btn-gold mt-10">
          <ArrowLeft className="size-4" aria-hidden />
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
