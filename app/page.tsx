import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Notes from "@/components/Notes";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Experience />
      <Notes />
      <Contact />
    </main>
  );
}
