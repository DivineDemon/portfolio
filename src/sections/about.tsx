"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import bookImage from "@/assets/images/book-cover.png";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import Card from "@/components/card";
import CardHeader from "@/components/card-header";
import SectionHeader from "@/components/section-header";
import ToolboxItem from "@/components/toolbox-item";
import { hobbies, toolboxItems } from "@/lib/constants";

const AboutSection = () => {
  const constraintRef = useRef(null);

  return (
    <div id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse into my World"
          description="Learn More about who I am, what I do, and what inspires me."
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader title="My Reads" description="What currently occupies my leisure time." />
              <div className="mx-auto mt-2 w-40 md:mt-0">
                <Image src={bookImage} alt="book cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools I use to craft exceptional digital experiences."
              />
              <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex flex-none animate-move-left gap-6 py-0.5 pr-6 [animation-duration:30s]">
                  {toolboxItems.map((item, idx) => (
                    <ToolboxItem key={idx} item={item} />
                  ))}
                </div>
              </div>
              <div className="mt-6 flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="-translate-x-1/2 flex flex-none animate-move-right gap-6 py-0.5 pr-6 [animation-duration:15s]">
                  {toolboxItems.map((item, idx) => (
                    <ToolboxItem key={idx} item={item} />
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="flex h-[320px] flex-col p-0 md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                className="p-6"
                description="Explore my interests and hobbies beyond the digital realm."
              />
              <div ref={constraintRef} className="relative flex-1">
                {hobbies.map((hobby, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 px-6 py-1.5"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="relative h-[320px] p-0 md:col-span-2 lg:col-span-1">
              <Image src={mapImage} alt="map" className="size-full object-cover object-left-top" />
              <Link
                target="_blank"
                href="https://slug.vercel.app/my-location"
                className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-20 rounded-full after:absolute after:inset-0 after:rounded-full after:outline after:outline-gray-950/30 after:outline-offset-2 after:content-['']"
              >
                <div className="-z-20 absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 [animation-duration:2s]" />
                <div className="-z-10 absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400" />
                <Image src={smileMemoji} alt="smile-memoji" className="size-20" />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
