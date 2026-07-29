import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  weight: ["400", "500"],
  display: "swap",
});

const title = "Abdul Aziz — AI Engineer";
const description =
  "AI Engineer building production LLM systems: RAG, multi-model orchestration, and the content-safety layers that make them shippable. Five platforms shipped in twelve months.";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulaziz.dev"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {/* Skip link — first tab stop for keyboard and screen-reader users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        <HashScroll />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
