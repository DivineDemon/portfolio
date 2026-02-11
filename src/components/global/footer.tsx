import Image from "next/image";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

const Footer = () => {
  return (
    <MaxWidthWrapper parentBorder="border-none" showPlusIcons={false}>
      <footer className="w-full flex items-center justify-center p-5">
        <Image
          alt="logo"
          width={20}
          height={20}
          src="/logo.svg"
          className="size-6 dark:invert"
        />
        <div className="flex-1 text-right text-sm font-medium text-muted-foreground">
          &copy; {new Date().getFullYear()} Mushood Hanif. All rights reserved.
        </div>
      </footer>
    </MaxWidthWrapper>
  );
};

export default Footer;
