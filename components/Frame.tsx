import Image from "next/image";

type Shot = { src: string; alt: string; w: number; h: number };

/**
 * A screenshot in a quiet browser window. The address bar carries the live
 * domain, or says plainly that the product is internal.
 */
export default function Frame({
  shot,
  address,
  priority,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  shot: Shot;
  address: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-rule-strong bg-raised shadow-[var(--shadow)]">
      <div className="grid grid-cols-[3rem_1fr_3rem] items-center border-b border-rule px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-rule-strong" />
          <span className="size-2 rounded-full bg-rule-strong" />
          <span className="size-2 rounded-full bg-rule-strong" />
        </span>
        <span className="mx-auto max-w-full truncate rounded-full bg-paper px-3 py-0.5 font-mono text-[11px] text-subtle">
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
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
      </div>
    </div>
  );
}
