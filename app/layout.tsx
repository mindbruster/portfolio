import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";
import { profile } from "@/lib/content";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "Abdul Aziz — AI Engineer";
const description =
  "AI Engineer building production LLM systems: RAG, multi-model orchestration, and the content-safety layers that make them shippable. Seven platforms shipped in twelve months.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description,
  keywords: [
    "AI Engineer",
    "LLM",
    "RAG",
    "Machine Learning",
    "Computer Vision",
    "Next.js",
    "Lahore",
    "Pakistan",
  ],
  authors: [{ name: "Abdul Aziz" }],
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Abdul Aziz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1efe8" },
    { media: "(prefers-color-scheme: dark)", color: "#12110e" },
  ],
};

/* Runs before first paint so a saved theme never flashes the wrong one.
   With nothing saved, the CSS follows the system setting on its own. */
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {/* Skip link — first tab stop for keyboard and screen-reader users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <HashScroll />
        <Header />
        {children}
        <Footer />
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[70]" />
      </body>
    </html>
  );
}
