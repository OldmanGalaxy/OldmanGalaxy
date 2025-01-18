import Cursor from "@/components/Cursor";
import EmailSection from "@/components/Email";
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
      <MarqueeSection text="Software Developer - Web Developer - Competitive Programmer - UI/UX Designer" />
      <Projects />
      <MarqueeSection text="Send Me An Email! Send Me An Email! Send Me An Email! Send Me An Email! Send Me An Email!" />
      <EmailSection />
    </>
  );
}
