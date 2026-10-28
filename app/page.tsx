import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Notes from "@/components/Notes";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Work />
      <About />
      <Experience />
      <Notes />
      <Contact />
    </main>
  );
}
