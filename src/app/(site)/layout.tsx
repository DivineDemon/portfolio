import type { ReactNode } from "react";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
