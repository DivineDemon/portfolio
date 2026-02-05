"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

const Header = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="fixed top-3 z-50 flex w-full items-center justify-center">
      <nav className="flex gap-1 rounded-full border border-white/15 bg-white/10 p-0.5 backdrop-blur">
        <Link
          onClick={() => setSelected(0)}
          href="#home"
          className={cn("nav-item", {
            "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900": selected === 0,
          })}
        >
          Home
        </Link>
        <Link
          onClick={() => setSelected(1)}
          href="#projects"
          className={cn("nav-item", {
            "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900": selected === 1,
          })}
        >
          Projects
        </Link>
        <Link
          onClick={() => setSelected(2)}
          href="#about"
          className={cn("nav-item", {
            "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900": selected === 2,
          })}
        >
          About
        </Link>
        <Link
          onClick={() => setSelected(3)}
          href="#contact"
          className={cn("nav-item", {
            "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900": selected === 3,
          })}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Header;
