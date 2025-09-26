import Footer from "./footer";
import Hero from "./hero";
import NavBar from "./navbar";
import Project from "./project";
import Skills from "./skills";

import TimeLine from "./time";

export default function Home() {
  return (
    <div>
      {/* <p>Hello</p> */}

      {/* <NavBar></NavBar> */}
      <Hero></Hero>
      <Project></Project>
      <Skills></Skills>
      <TimeLine></TimeLine>

      <Footer></Footer>
    </div>
  );
}
