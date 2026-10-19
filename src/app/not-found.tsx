import { FolderX } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <MaxWidthWrapper className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center gap-6 pt-32">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderX className="size-8 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>Page Not Found.</EmptyTitle>
              <EmptyDescription>
                The requested page could not be located. It may have been moved or removed.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Link className={buttonVariants({ variant: "default", size: "lg" })} href="/">
                Back to Home
              </Link>
            </EmptyContent>
          </Empty>
        </MaxWidthWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
