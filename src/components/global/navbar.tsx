import Image from "next/image";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const Navbar = () => {
  return (
    <MaxWidthWrapper
      parentBorder="border-b"
      className="sticky top-0 z-50 bg-background/10 backdrop-blur-md"
    >
      <nav className="w-full flex items-center justify-center p-5">
        <Image
          alt="logo"
          width={20}
          height={20}
          src="/logo.svg"
          className="size-6 dark:invert"
        />
        <div className="flex-1 flex items-center justify-end gap-2.5 text-sm">
          {["Services", "Projects", "Testimonials", "Contact"].map((t) => (
            <span
              key={t}
              className="cursor-pointer px-4 py-1 rounded-full hover:bg-muted hover:font-medium transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>
        <AnimatedThemeToggler size="icon-sm" variant="ghost" />
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
