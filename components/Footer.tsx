import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line py-10">
      <div className="container-page flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-subtle">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-subtle">
          Built with Next.js and Tailwind
        </p>
      </div>
    </footer>
  );
}
