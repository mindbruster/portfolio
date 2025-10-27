import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Abdul Aziz - AI Engineer & Full Stack Developer",
  description: "Computer Science graduate specializing in AI, ML, and Full Stack Development. Building intelligent systems for automation, analytics, and real-world impact.",
  keywords: ["AI Engineer", "Full Stack Developer", "Machine Learning", "Computer Vision", "Chatbots", "Lahore, Pakistan"],
  authors: [{ name: "Abdul Aziz" }],
  openGraph: {
    title: "Abdul Aziz - AI Engineer & Full Stack Developer",
    description: "Computer Science graduate specializing in AI, ML, and Full Stack Development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
