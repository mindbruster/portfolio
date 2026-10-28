# Portfolio — Abdul Aziz

Personal site for an AI engineer working on production LLM systems. Built around
evidence: live products, case studies with architecture, and the reasoning behind
the decisions.

The design argues one idea — *the model is the easy part* — and is set like an
engraved certificate: deep ink, ivory type, champagne gold, small capitals and
roman-numeral sections. Its signature is a guilloche rosette (the engraving on
banknotes and watch dials), drawn procedurally on a canvas and revealed with an
engraving sweep. The hero card is a request trace where every gold span is a
layer built in one of the projects and the one grey span is the model. Work is a
deck of plates that stack as you scroll; scrolling is smoothed with Lenis.

Type: Cormorant Garamond (display), Geist (text), Geist Mono (technical labels).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

---

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

---

## Structure

```
app/
  layout.tsx             root layout, fonts, metadata, theme script, skip link
  page.tsx               home — composes the sections below
  work/[slug]/page.tsx   case-study pages, statically generated
  opengraph-image.tsx    link-preview image (and one per case study)
  not-found.tsx          404
  globals.css            design tokens for both themes + component classes
  icon.svg               favicon, alongside favicon.ico and apple-icon.png
components/
  Header  Hero  Marquee  Work  About  Experience  Notes  Contact  Footer
  Guilloche.tsx          the engraved rosette, drawn once to a canvas
  Seal.tsx               the monogram seal (large emblem, small logo)
  TraceCard.tsx          the hero's interactive request trace
  Pipeline.tsx           architecture diagram, gold lozenges on a line
  Frame.tsx              screenshot in a browser window
  SectionHead.tsx        numeral, rule and serif title for each section
  CountUp.tsx            stats that count up when they scroll into view
  SmoothScroll.tsx       Lenis, off for reduced-motion users
  Reveal.tsx             scroll-reveal wrapper (fade, or masked slide-up)
  HashScroll.tsx         makes deep links to a section land correctly
lib/
  content.ts             all copy, project data and the hero trace
  og.tsx                 shared template for the link-preview images
  og-fonts/              Cormorant Garamond TTFs for those images (OFL)
public/
  shots/                 product screenshots
  resume.pdf             downloadable CV
```

---

## Editing content

**Everything the site says lives in `lib/content.ts`.** Components read from it and
hold no copy of their own. To change text, add a project, or reorder the work,
edit that file — you should not need to open a component.

Adding a project:

```ts
{
  slug: "my-project",              // becomes /work/my-project
  name: "My Project",
  tagline: "One line on what it is",
  layer: "Safety screening",       // the layer around the model it shows
  year: "2026",
  problem: "The interesting engineering problem, not a feature list.",
  built: ["What was actually built.", "Two or three lines."],
  stack: ["Next.js", "PostgreSQL"],
  href: "https://example.com",     // omit for internal work
  hrefLabel: "example.com",
  shot: { src: "/shots/x.jpg", alt: "…", w: 1920, h: 1080 },
  study: { … },                    // optional — see below
}
```

A case-study page is generated **only** when `study` is present; without it the
project stays a card on the home page. `w` and `h` must be the file's real pixel
size, since `next/image` uses them to reserve the aspect box — a wrong ratio
squashes the image.

### Screenshots

They live in `public/shots/`. Two rules:

1. **Give a replacement a new filename** (`foo-v2.jpg`) rather than overwriting.
   Browsers cache the old URL hard and will keep serving the previous image.
2. **Blur anything identifying** — licence plates, faces, customer names,
   internal figures — before committing. Several current shots are already
   redacted for this reason.

---

## Design notes

Things that will bite you if you assume otherwise:

- **Tailwind v4 configures from CSS.** Colours are CSS variables on `:root`,
  exposed to Tailwind through `@theme inline` (`bg-ink`, `text-gold`, …).
  There is no `tailwind.config.ts`, and adding one back does nothing.
- **Masked reveals trigger on the clipping box.** Content that starts clipped
  away can never report itself as in view, so `Reveal variant="mask"` puts the
  observer on the wrapper and drives the child through variants.
- **The work plates only stack on tall screens** (`.stack-card`, min-height
  820px), so a pinned plate is never cropped on a short laptop window.
- **The hero trace is data.** Its spans live in `trace` in `content.ts`; each
  `slug` links a span to its project. Timings are illustrative, and the figure
  caption says so.
- **Navigation uses root-relative hashes** (`/#work`). A bare `#work` resolves
  against the current URL, so from `/work/[slug]` it silently does nothing.
- **The hero is a server component** using CSS keyframes rather than Framer
  Motion, so it paints before hydration and there is no blank flash on load.
  Everything below the fold uses `Reveal`, which collapses to a plain render
  under `prefers-reduced-motion`.
- **Diagrams are semantic HTML**, not images — screen-readable, responsive, and
  editable as plain data in `content.ts`.
- **`HashScroll` exists for a reason.** Native hash scrolling runs before
  hydration, while revealed sections are still collapsed, so the browser lands
  at the wrong offset. It re-runs the scroll after mount.

---

## Deploying

The repo is connected to Vercel; pushing to `main` deploys automatically.

```bash
npx vercel        # preview deployment
npx vercel --prod # promote to production
```

No environment variables are needed. Every route is prerendered at build time,
so the output is fully static.
