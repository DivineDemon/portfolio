import MaxWidthWrapper from "@/components/ui/max-width-wrapper";

const Footer = () => {
  return (
    <MaxWidthWrapper parentBorder="border-none" showPlusIcons={false}>
      <footer className="w-full text-center text-sm text-muted-foreground p-5">
        &copy; {new Date().getFullYear()} Mushood Hanif. All rights reserved.
      </footer>
    </MaxWidthWrapper>
  );
};

export default Footer;
