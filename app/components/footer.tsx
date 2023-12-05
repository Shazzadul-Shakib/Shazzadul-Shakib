import Image from "next/image";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <main className=" bg-black p-10 bg-opacity-40 mt-28 flex flex-col justify-center items-center gap-3 md:">
      <div>
        <Image
          src="/logoB.png"
          width={33}
          height={33}
          className="h-[40px] w-[40px] md:h-auto md:w-auto"
          priority={true}
          alt="Logo"
        />
      </div>
      <div className="  ">
        <div className="flex items-center justify-center gap-3 md:gap-10">
          <div className="w-[50px] bg-white h-0.5 my-4 md:w-[100px] "></div>
          <FaGithub className="fill-gray-400 text-3xl" />
          <FaLinkedin className="fill-gray-400 text-3xl my-5" />
          <FaFacebook className="fill-gray-400 text-3xl" />
          <div className="w-[50px] bg-white h-0.5 my-4 md:w-[100px] "></div>
        </div>
      </div>
      <div className="text-xs text-white text-center">
        &copy; 2023 All right reserved by Shazzadul Islam Shakib
      </div>
    </main>
  );
}