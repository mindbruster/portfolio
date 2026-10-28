"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const format = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: profile.timeZone,
  }).format(d);

/** Current time in Lahore, ticking each minute. Blank until hydrated. */
export default function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {now ?? "--:--"}
    </time>
  );
}
