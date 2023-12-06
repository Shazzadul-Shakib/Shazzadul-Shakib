import Contact from "./contact/page";
import Hero from "./hero/page";
import Projects from "./projects/page";
import Skills from "./skills/page";

export default function Home() {
  return (
    <div>
      <Hero />
      <Skills />
      <Projects />
      <Contact/>
    </div>
    
  )
}
