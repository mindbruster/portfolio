import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Notes from "@/components/Notes";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Approach />
      <Experience />
      <Notes />
      <Contact />
    </main>
  );
}
