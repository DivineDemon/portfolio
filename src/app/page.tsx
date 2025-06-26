import { notFound } from "next/navigation";

import ChatBot from "@/components/chat-bot";
import AboutSection from "@/sections/about";
import ContactSection from "@/sections/contact";
import Footer from "@/sections/footer";
import Header from "@/sections/header";
import HeroSection from "@/sections/hero";
import ProjectsSection from "@/sections/projects";
import TapeSection from "@/sections/tape";
import TestimonialsSection from "@/sections/testimonials";
import { api } from "@/trpc/server";

const Home = async () => {
  const projects = await api.project.getProjects();
  const testimonials = await api.testimonial.getTestimonials();

  if (!projects) {
    return notFound();
  }

  if (!testimonials) {
    return notFound();
  }

  return (
    <div>
      <Header />
      <HeroSection />
      <ProjectsSection projects={projects} />
      <TapeSection />
      <TestimonialsSection testimonials={testimonials} />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Home;
