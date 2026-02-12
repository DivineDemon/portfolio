import Contact from "@/components/global/contact";
import DitherSplitter from "@/components/global/dither-splitter";
import About from "@/components/landing/about";
import Hero from "@/components/landing/hero";
import Projects from "@/components/landing/projects";
import Services from "@/components/landing/services";
import Skills from "@/components/landing/skills";
import Testimonials from "@/components/landing/testimonials";
import { SITE_URL } from "@/lib/constants";
import {
  PERSON_SCHEMA_ID,
  safeJsonLdStringify,
  WEBSITE_SCHEMA_ID,
} from "@/lib/json-ld";

export const revalidate = 3600;

const Home = () => {
  const homePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}#webpage`,
    url: SITE_URL,
    name: "Mushood Hanif | Founder and Builder",
    description:
      "Founder and Builder specializing in scalable SaaS platforms, AI-powered automation systems, Next.js, Node.js, and high-performance product engineering.",
    inLanguage: "en-US",
    isPartOf: {
      "@id": WEBSITE_SCHEMA_ID,
    },
    about: {
      "@id": PERSON_SCHEMA_ID,
    },
  };

  return (
    <>
      <script type="application/ld+json">
        {safeJsonLdStringify(homePageJsonLd)}
      </script>
      <Hero />
      <Services />
      <DitherSplitter />
      <Projects />
      <Testimonials />
      <DitherSplitter />
      <About />
      <Skills />
      <Contact />
    </>
  );
};

export default Home;
