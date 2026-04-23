import Footer from "./footer";
import Hero from "./hero";
import NavBar from "./navbar";
import Project from "./project";
import Skills from "./skills";
import TimeLine from "./time";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Project />
      <Skills />
      <TimeLine />
      <Footer />
    </div>
  );
}
