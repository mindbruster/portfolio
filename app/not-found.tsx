import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="page flex min-h-[80vh] flex-col justify-center pt-24">
      <p className="label">
        <span className="text-signal">404</span> — span not found
      </p>
      <h1 className="display mt-6 text-[clamp(3.5rem,11vw,9rem)]">
        Nothing traced <em className="text-muted">to this address.</em>
      </h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted">
        The page may have moved, or the link was mistyped. Everything that exists is on the home page.
      </p>
      <Link href="/" className="btn btn-solid mt-10 self-start">
        <ArrowLeft className="size-3.5" aria-hidden />
        Back to the home page
      </Link>
    </main>
  );
}
