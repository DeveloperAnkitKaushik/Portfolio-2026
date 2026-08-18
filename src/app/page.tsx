import Hero from "@/components/hero/Hero";
import Ribbon from "@/components/ribbon/Ribbon";
import Projects from "@/components/projects/Projects";
import Stack from "@/components/stack/Stack";
import Journey from "@/components/journey/Journey";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Ribbon />
      <Projects />
      <Stack />
      <Journey />
      <Contact />
    </main>
  );
}
