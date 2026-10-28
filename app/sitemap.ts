import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/content";

/** Home plus every case-study page — mirrors generateStaticParams in work/[slug]. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site, changeFrequency: "monthly", priority: 1 },
    ...projects
      .filter((p) => p.study)
      .map((p) => ({
        url: `${profile.site}/work/${p.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
