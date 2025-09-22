import { ArrowUpRight } from "lucide-react";
import { footerLinks } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="relative overflow-x-clip">
      <div className="-z-10 -translate-x-1/2 absolute bottom-0 left-1/2 h-[400px] w-[1600px] bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)]"></div>
      <div className="container">
        <div className="flex flex-col items-center gap-8 border-white/15 border-t py-6 text-sm md:flex-row md:justify-between">
          <div className="text-white/40">&copy; {new Date().getFullYear()}. All rights reserved.</div>
          <nav className="flex flex-col items-center gap-8 md:flex-row">
            {footerLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="inline-flex items-center gap-1.5">
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
