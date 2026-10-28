import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";
import SmoothScroll from "@/components/SmoothScroll";
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
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
  themeColor: "#08090c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${cormorant.variable}`}>
      <body>
        {/* Skip link — first tab stop for keyboard and screen-reader users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <HashScroll />
        <Header />
        {children}
        <Footer />
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[70] opacity-70" />
      </body>
    </html>
  );
}
