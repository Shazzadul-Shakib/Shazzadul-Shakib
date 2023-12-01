import { FaHtml5, FaCss3, FaBootstrap, FaReact, FaNodeJs, FaNpm, FaFigma, FaGitAlt, FaGithub } from "react-icons/fa6";
import { IoLogoFirebase, IoLogoJavascript } from "react-icons/io5";
import { BiLogoNetlify } from "react-icons/bi";
import {
  SiCanva,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { TbBrandNextjs, TbBrandVscode } from "react-icons/tb";

type SkillItem = {
  icon: JSX.Element;
  title: string;
};

export const FrontEnd: SkillItem[] = [
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

export const BackEnd: SkillItem[] = [
  {
    icon: <FaNodeJs className="text-2xl" />,
    title: "Node.js",
  },
  {
    icon: <SiExpress className="text-2xl" />,
    title: "Express.js",
  },
  {
    icon: <SiMongodb className="text-2xl" />,
    title: "MongoDb",
  },
  {
    icon: <SiMongoose className="text-2xl" />,
    title: "Mongoose",
  },
  {
    icon: <SiMongoose className="text-2xl" />,
    title: "Mongoose",
  },
  {
    icon: <IoLogoFirebase className="text-2xl" />,
    title: "Firebase",
  },
];

export const Tools: SkillItem[] = [
  {
    icon: <TbBrandVscode className="text-2xl" />,
    title: "Vscode",
  },
  {
    icon: <FaNpm className="text-2xl" />,
    title: "npm",
  },
  {
    icon: <FaFigma className="text-2xl" />,
    title: "Figma",
  },
  {
    icon: <FaGitAlt className="text-2xl" />,
    title: "Git",
  },
  {
    icon: <FaGithub className="text-2xl" />,
    title: "Github",
  },
  {
    icon: <SiCanva className="text-2xl" />,
    title: "Canva",
  },
  {
    icon: <SiVercel className="text-2xl" />,
    title: "Vercel",
  },
  {
    icon: <BiLogoNetlify className="text-2xl" />,
    title: "Netlify",
  },
];