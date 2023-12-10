'use client'

import Image from "next/image";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className=" bg-black p-10 bg-opacity-40 mt-28 flex flex-col justify-center items-center gap-3 md:">
      <div>
        <Image
          src="/logoB.png"
          width={33}
          height={33}
          className="h-[40px] w-[40px] md:h-auto md:w-auto cursor-pointer"
          priority={true}
          alt="Logo"
          onClick={handleLogoClick}
        />
      </div>
      <div>
        <div className="flex items-center justify-center gap-3 md:gap-10">
          <div className="w-[50px] bg-white h-0.5 my-4 md:w-[100px] "></div>
          <a href="https://github.com/Shazzadul-Shakib" target="_blank">
            <FaGithub className="fill-gray-400 text-3xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/shazzadul-islam-shakib/"
            target="_blank"
          >
            <FaLinkedin className="fill-gray-400 text-3xl my-5" />
          </a>
          <a
            href="https://www.facebook.com/shazzadulislam.shakib.9/"
            target="_blank"
          >
            <FaFacebook className="fill-gray-400 text-3xl" />
          </a>
          <div className="w-[50px] bg-white h-0.5 my-4 md:w-[100px] "></div>
        </div>
      </div>
      <div className="text-xs text-white text-center">
        &copy; 2023 All right reserved by Shazzadul Islam Shakib
      </div>
    </main>
  );
}