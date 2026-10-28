import Stage from "@/components/Stage";
import Stats from "@/components/Stats";
import WorkIndex from "@/components/WorkIndex";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Notes from "@/components/Notes";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Stage />
      <Stats />
      <WorkIndex />
      <About />
      <Experience />
      <Notes />
      <Contact />
    </main>
  );
}
