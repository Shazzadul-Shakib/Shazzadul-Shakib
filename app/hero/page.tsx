
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

export default function Hero() {
  return (
    <main
      id="hero"
      className="flex gap-10 pt-52 bg-[url('/logoB.png')] bg-no-repeat bg-[length:300px_300px] bg-[center_right]  md:bg-[center_right_16rem] md:bg-auto md:gap-48"
    >
      <div className=" ml-4">
        <div className="flex flex-col items-center justify-center">
          <div className="h-[100px] bg-white w-0.5 my-4 "></div>
          <FaGithub className="fill-gray-400 text-3xl" />
          <FaLinkedin className="fill-gray-400 text-3xl my-5" />
          <FaFacebook className="fill-gray-400 text-3xl" />
          <div className="h-[100px] bg-white w-0.5 my-4 "></div>
        </div>
      </div>
      <div>
        <div>
          <h1 className="text-white text-3xl font-bold md:text-7xl">
            Shazzadul Islam Shakib
          </h1>
          <h2 className=" text-gray-400 text-lg font-semibold italic my-5 md:text-xl">
            Front-end Developer
          </h2>
        </div>
        <div className="flex items-center">
          <button className="bg-[#EF403A] px-4 py-2 text-white font-semibold rounded-md">
            About Me
          </button>
          <HiArrowLongRight className=" text-4xl text-white -ml-2" />
        </div>
      </div>
    </main>
  );
}