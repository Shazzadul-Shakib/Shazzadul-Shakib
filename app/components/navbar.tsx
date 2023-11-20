import Image from "next/image";
import Link from "next/link";
import { FiAlignRight } from "react-icons/fi";

export default function Navbar() {
  return (
    <main className="w-[90%] mx-auto text-white flex justify-between items-center px-2 py-4 md:px-4 md:py-4 md:w-[80%]">
      <div>
        <Link href="/">
          <Image
            src="/logoW.png"
            width={50}
            height={50}
            className="h-[40px] w-[40px] md:h-auto md:w-auto"
            priority={true}
            alt="Logo"
          />
        </Link>
      </div>
      <div>
        <div className="block md:hidden">
          <FiAlignRight className="text-3xl" />
        </div>
        <div className="hidden md:block">
          <Link
            href="/"
            className=" ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A]  "
          >
            About
          </Link>
          <Link
            href="/"
            className=" ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A]  "
          >
            Skills
          </Link>
          <Link
            href="/"
            className=" ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A]  "
          >
            Works
          </Link>
          <Link
            href="/"
            className=" ml-14 py-2 font-bold text-gray-400 hover:border-b-2 border-[#EF403A]  "
          >
            Resume
          </Link>
        </div>
      </div>
    </main>
  );
}
