import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <MarqueeSection />
      <Projects />
    </>
  );
}
