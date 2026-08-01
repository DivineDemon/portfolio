import About from "@/components/landing/about";
import BlogTeaser from "@/components/landing/blog-teaser";
import Contact from "@/components/landing/contact";
import Hero from "@/components/landing/hero";
import Impact from "@/components/landing/impact";
import Stack from "@/components/landing/stack";
import Trajectory from "@/components/landing/trajectory";
import WorkTeaser from "@/components/landing/work-teaser";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Trajectory />
      <Impact />
      <WorkTeaser />
      <BlogTeaser />
      <Stack />
      <Contact />
    </>
  );
};

export default HomePage;
