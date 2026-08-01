import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "@/assets/css/index.css";
import Layout from "./components/layout";
import Providers from "./components/providers";
import BlogPage from "./pages/blog";
import BlogPostPage from "./pages/blog-post";
import CaseStudyPage from "./pages/case-study";
import HomePage from "./pages/home";
import WorkPage from "./pages/work";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element with id 'root'");
}

createRoot(rootElement).render(
  <Providers>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<WorkPage />} path="/work" />
          <Route element={<CaseStudyPage />} path="/work/:slug" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<BlogPostPage />} path="/blog/:slug" />
        </Route>
      </Routes>
    </BrowserRouter>
  </Providers>,
);
