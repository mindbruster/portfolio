import Image from "next/image";

type Shot = { src: string; alt: string; w: number; h: number };

/**
 * A screenshot in a dark browser window with a gold-lit edge. The address
 * bar carries the live domain, or says plainly there isn't one.
 */
export default function Frame({
  shot,
  address,
  priority,
  sizes = "(min-width: 1024px) 55vw, 100vw",
  className = "",
}: {
  shot: Shot;
  address: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-line-strong bg-[#0b0c10] shadow-[0_0_0_1px_rgb(216_181_108/0.06),0_40px_100px_-40px_rgb(0_0_0/0.95),0_0_80px_-30px_rgb(216_181_108/0.25)] ${className}`}
    >
      <div className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center border-b border-line bg-white/[0.02] px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </span>
        <span className="mx-auto flex max-w-full items-center gap-1.5 truncate rounded-full border border-line bg-ink/60 px-3 py-0.5 font-mono text-[11px] text-subtle">
          <span className="size-1 rounded-full bg-gold/70" aria-hidden />
          {address}
        </span>
      </div>
      <div className="overflow-hidden">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.w}
          height={shot.h}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
