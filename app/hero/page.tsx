
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

export default function Hero() {
  return (
    <main className=" h-screen flex gap-10 pt-52 bg-[url('/logoB.png')] bg-no-repeat bg-[center_right_12rem] md:gap-48">
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
        <div className="">
          <h1 className="text-white text-3xl font-bold md:text-7xl">
            Shazzadul Islam Shakib
          </h1>
          <h2 className=" text-gray-400 text-lg font-semibold italic my-5 md:text-xl">
            Front-end Developer
          </h2>
        </div>
      </div>
    </main>
  );
}