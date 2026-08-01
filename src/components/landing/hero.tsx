import { Eye, Mail, Sparkle } from "lucide-react";
import Profile from "@/assets/img/profile.jpg";
import { Github, LinkedIn } from "@/components/icons";
import { FIRST_ROW } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "../max-width-wrapper";
import { buttonVariants } from "../ui/button";
import { Marquee } from "../ui/marquee";

const Hero = () => {
  return (
    <MaxWidthWrapper
      className="flex min-h-screen w-full flex-col items-center justify-center gap-5"
      id="home"
    >
      <div className="grid w-full grid-cols-1 items-center justify-center gap-5 md:grid-cols-2">
        <div className="col-span-1 flex w-full flex-col items-center justify-center gap-5">
          <h2 className="w-full text-left font-bold text-7xl">
            Mushood
            <br />
            Hanif
          </h2>
          <div className="grid w-full grid-cols-2 items-center justify-center gap-5">
            <div className="col-span-1 flex w-full flex-col items-start justify-start text-sm">
              <span className="font-semibold text-muted-foreground">Role</span>
              <span>Senior AI Engineer</span>
            </div>
            <div className="col-span-1 flex w-full flex-col items-start justify-start text-sm">
              <span className="font-semibold text-muted-foreground">Company</span>
              <span>
                <a className="text-primary" href="https://haga.mushoodhanif.com">
                  Haga
                </a>
                &nbsp; (Jun '26 - Present)
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-3.5">
            <a
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "rounded-full",
                }),
              )}
              href="mailto:mohdmushood@yahoo.com"
              rel="noopener"
              target="_blank"
            >
              <Mail />
            </a>
            <a
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "rounded-full",
                }),
              )}
              href="https://linkedin.com/in/mushood-hanif"
              rel="noopener"
              target="_blank"
            >
              <LinkedIn />
            </a>
            <a
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "rounded-full",
                }),
              )}
              href="https://github.com/DivineDemon"
              rel="noopener"
              target="_blank"
            >
              <Github />
            </a>
            <a
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "flex-1 gap-2 rounded-full",
                }),
              )}
              href="https://drive.google.com/file/d/1Y5IS6F7PaajwHLkXsRmKvnqRc-8QsvxA/view?usp=sharing"
              rel="noopener"
              target="_blank"
            >
              <Eye />
              View Resume
            </a>
          </div>
          <p className="w-full text-pretty border-primary border-l-2 pl-4 text-muted-foreground text-sm italic leading-relaxed">
            Not what a model outputs - how the system decides, executes, and holds under load.
          </p>
          <div className="flex w-full items-center justify-center gap-2.5 rounded-md border p-2.5 uppercase">
            <div className="relative size-2 rounded-full bg-primary">
              <div className="absolute size-2 animate-ping rounded-full bg-primary" />
            </div>
            <span className="text-xs tracking-wide">Optimizing: Residuals • Not: Roles</span>
          </div>
        </div>
        <img
          alt="profile"
          className="col-span-1 h-full rounded-xl border object-cover shadow"
          src={Profile}
        />
      </div>
      <div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative flex w-full overflow-hidden">
        <Marquee className="w-full [--duration:20s]" pauseOnHover>
          {FIRST_ROW.map((review) => (
            <div className="flex items-center justify-center gap-4" key={review}>
              <span className="font-semibold text-primary text-xs uppercase">{review}</span>
              <Sparkle className="size-4 rotate-15 fill-primary text-foreground" />
            </div>
          ))}
        </Marquee>
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;
