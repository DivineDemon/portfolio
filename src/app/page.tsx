import Contact from "@/components/global/contact";
import DitherSplitter from "@/components/global/dither-splitter";
import About from "@/components/landing/about";
import Hero from "@/components/landing/hero";
import Projects from "@/components/landing/projects";
import Services from "@/components/landing/services";
import Skills from "@/components/landing/skills";
import Testimonials from "@/components/landing/testimonials";
import Workflows from "@/components/landing/workflows";
import { safeJsonLdStringify } from "@/lib/json-ld";
import { getHomePageJsonLd } from "@/lib/seo/get-site-json-ld";

const Home = async () => {
  const homePageJsonLd = await getHomePageJsonLd();

  return (
    <>
      <script type="application/ld+json">
        {safeJsonLdStringify(homePageJsonLd)}
      </script>
      <Hero />
      <Services />
      <DitherSplitter />
      <Projects />
      <Workflows />
      <Testimonials />
      <DitherSplitter />
      <About />
      <Skills />
      <Contact />
    </>
  );
};

export default Home;
