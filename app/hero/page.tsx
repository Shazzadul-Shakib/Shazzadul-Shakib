
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

export default function Hero() {
  return (
    <main
      id="hero"
      className="flex gap-5 pt-52 bg-[url('/logoB.png')] bg-no-repeat bg-[length:300px_300px] bg-[center_right]  md:bg-[center_right_16rem] md:bg-auto md:gap-48"
    >
      <div className=" ml-4">
        <div className="flex flex-col items-center justify-center">
          <div className="h-[100px] bg-white w-0.5 my-4 "></div>
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

          <div className="h-[100px] bg-white w-0.5 my-4 "></div>
        </div>
      </div>
      <div>
        <div>
          <h1 className="text-white text-3xl font-bold md:text-7xl">
            Shazzadul Islam Shakib
          </h1>
          <h2 className=" text-gray-400 text-lg font-semibold italic my-2 md:text-xl">
            Front-End Developer
          </h2>
          <p className="text-gray-200 text-lg w-[95%] py-3 rounded-md md:w-[75%]">
            Passionate and innovative front-end developer specializing in{" "}
            <span className="text-[#EF403A] text-base"> React</span> , with a
            keen eye for crafting visually appealing and{" "}
            <span className="text-[#EF403A] text-base">
              user-friendly interfaces
            </span>{" "}
            . Leveraging a strong foundation in modern web technologies, I am
            dedicated to creating seamless,
            <span className="text-[#EF403A] text-base">responsive</span> , and
            performant user experiences that elevate digital landscapes. Let's
            transform ideas into captivating web realities together.
          </p>
          <p className=" text-gray-200 text-lg w-[75%] mb-3 ">
            When not working or futzing around with code, I study how to escape
            from University. Actually
            <span className="text-[#EF403A] text-base">for hire</span>.
          </p>
        </div>
        <div className="flex items-center">
          <button className="bg-[#EF403A] px-4 py-2 text-white font-semibold rounded-md">
            Resume
          </button>
          <HiArrowLongRight className=" text-4xl text-white -ml-2" />
        </div>
      </div>
    </main>
  );
}