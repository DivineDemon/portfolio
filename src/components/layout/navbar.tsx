import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 h-16 bg-background border-b flex items-center justify-between p-[14px]">
      <SidebarTrigger />
      <AnimatedThemeToggler className="rounded-full" />
    </nav>
  );
};

export default Navbar;
