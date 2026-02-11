import DitherSplitter from "@/components/global/dither-splitter";
import About from "@/components/landing/about";
import Hero from "@/components/landing/hero";
import Projects from "@/components/landing/projects";
import Services from "@/components/landing/services";
import Skills from "@/components/landing/skills";
import Testimonials from "@/components/landing/testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <DitherSplitter />
      <Services />
      <DitherSplitter />
      <Projects />
      <DitherSplitter />
      <Testimonials />
    </>
  );
};

export default Home;
