import {
  FaHtml5,
  FaCss3,
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa6";
import { IoLogoFirebase, IoLogoJavascript } from "react-icons/io5";
import {
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiRender,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";
import { TbBrandGraphql, TbBrandNextjs, TbBrandVscode } from "react-icons/tb";

type SkillItem = {
  icon: JSX.Element;
  title: string;
};

export const FrontEnd: SkillItem[] = [
  {
    icon: <FaHtml5 className="text-2xl" />,
    title: "HTML5",
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
    icon: <SiTypescript className="text-xl" />,
    title: "TypeScript",
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
  {
    icon: <IoLogoFirebase className="text-2xl" />,
    title: "Firebase Auth",
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
    icon: <SiJsonwebtokens className="text-2xl" />,
    title: "JWT",
  },
  {
    icon: <SiZod className="text-2xl" />,
    title: "Zod",
  },
  {
    title: "Rest Api",
    icon: <TbBrandGraphql className="text-2xl" />,
  },
  {
    title: "PostgreSQL",
    icon: <SiPostgresql className="text-2xl" />,
  },
  {
    title: "Prisma",
    icon: <SiPrisma className="text-2xl" />,
  },
  {
    title: "Socket.io",
    icon: <SiSocketdotio className="text-2xl" />,
  },
];

export const Tools: SkillItem[] = [
  {
    icon: <TbBrandVscode className="text-2xl" />,
    title: "Vscode",
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
    icon: <SiVercel className="text-2xl" />,
    title: "Vercel",
  },
  {
    icon: <SiPostman className="text-2xl" />,
    title: "Postman",
  },
];
