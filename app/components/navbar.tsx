'use client'
import Image from "next/image";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function Navbar() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <main className=" sticky top-0 bg-[#4C516D] bg-opacity-20 text-white flex justify-between items-center px-2 py-4 md:px-10 md:py-2">
      <div>
        <ScrollLink
          to="hero"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A] cursor-pointer"
        >
          <Image
            src="/logoW.png"
            width={50}
            height={50}
            className="h-[40px] w-[40px] md:h-auto md:w-auto"
            priority={true}
            alt="Logo"
          />
        </ScrollLink>
      </div>
      <div>
        <div className="hidden md:block">
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A] cursor-pointer"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="skills"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A] cursor-pointer"
          >
            Skills
          </ScrollLink>
          <ScrollLink
            to="works"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A] cursor-pointer"
          >
            Works
          </ScrollLink>
          <ScrollLink
            to="resume"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A] cursor-pointer"
          >
            Resume
          </ScrollLink>
        </div>
      </div>
    </main>
  );
}
