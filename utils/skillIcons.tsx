import { FaHtml5, FaCss3, FaBootstrap, FaReact } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

type FrontEndItem = {
  icon: JSX.Element;
  title: string;
};

export const FrontEnd: FrontEndItem[] = [
  {
    icon: <FaHtml5 className="text-2xl" />,
    title: "Html5",
  },
  {
    icon: <FaCss3 className="text-2xl" />,
    title: "CSS3",
  },
  {
    icon: <IoLogoJavascript className="text-2xl" />,
    title: "JavaScript",
  },
  {
    icon: <FaBootstrap className="text-2xl" />,
    title: "Bootstrap",
  },
  {
    icon: <SiTailwindcss className="text-2xl" />,
    title: "Tailwind",
  },
  {
    icon: <FaReact className="text-2xl" />,
    title: "React",
  },
  {
    icon: <TbBrandNextjs className="text-2xl" />,
    title: "Next.js",
  },
  {
    icon: <SiRedux className="text-2xl" />,
    title: "Redux",
  },
  {
    icon: <SiReactrouter className="text-2xl" />,
    title: "React-router",
  },
  {
    icon: <SiReactquery className="text-2xl" />,
    title: "React-query",
  },
];
