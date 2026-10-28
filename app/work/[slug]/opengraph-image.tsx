import { projects } from "@/lib/content";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.filter((p) => p.study).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  return ogCard({
    eyebrow: `Case study N° ${String(index + 1).padStart(2, "0")}`,
    children: <span>{project?.name ?? "Case study"}</span>,
    subtitle: project?.tagline,
  });
}
