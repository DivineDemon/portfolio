import { ArrowDown, Sparkle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import grainImage from "@/assets/images/grain.jpg";
import memojiImage from "@/assets/images/memoji-computer.png";
import HeroOrbit from "@/components/hero-orbit";

const HeroSection = () => {
  return (
    <div id="home" className="relative z-0 overflow-x-clip py-32 md:py-48 lg:py-60">
      <div className="-z-30 absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }} />
        <div className="hero-ring size-[620px]" />
        <div className="hero-ring size-[820px]" />
        <div className="hero-ring size-[1020px]" />
        <div className="hero-ring size-[1220px]" />
        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s" shouldSpin spinDuration="3s">
          <Sparkle className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s" shouldSpin spinDuration="3s">
          <Sparkle className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="36s" shouldSpin spinDuration="3s">
          <Sparkle className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="6s">
          <Star className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
          <Star className="size-8 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
          <div className="size-2 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="44s" shouldSpin spinDuration="3s">
          <Sparkle className="size-14 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="6s">
          <Star className="size-28 text-emerald-300" />
        </HeroOrbit>
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
          <Image src={memojiImage} alt="memoji" className="size-[100px]" />
          <div className="inline-flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 px-4 py-1.5">
            <div className="relative size-2.5 rounded-full bg-green-500">
              <div className="absolute inset-0 animate-ping-large rounded-full bg-green-500" />
            </div>
            <div className="font-medium text-sm">Available for new projects</div>
          </div>
        </div>
        <div className="mx-auto max-w-lg">
          <h1 className="mt-8 text-center font-serif text-3xl tracking-wide md:text-5xl">
            Building Exceptional User Experiences
          </h1>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I specialize in transforming designs into functional, high-performing web applications. Let&apos;s discuss
            your next project.
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href="#projects" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-6">
            <span className="font-semibold">Explore My Work</span>
            <ArrowDown className="size-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white bg-white px-6 text-gray-900"
          >
            <span>👋</span>
            <span className="font-semibold">Let&apos;s Connect</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
