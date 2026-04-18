import {
  FaHtml5,
  FaCss3,
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from 'react-icons/fa6';
import { IoLogoFirebase, IoLogoJavascript } from 'react-icons/io5';
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
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from 'react-icons/si';
import { TbBrandGraphql, TbBrandNextjs, TbBrandVscode } from 'react-icons/tb';

export type SkillItem = {
  icon: React.ReactNode;
  title: string;
  color: string;
};

export const FrontEnd: SkillItem[] = [
  { icon: <FaHtml5 />, title: 'HTML5', color: '#F59E51' },
  { icon: <FaCss3 />, title: 'CSS3', color: '#F59E51' },
  { icon: <IoLogoJavascript />, title: 'JavaScript', color: '#F0D299' },
  { icon: <SiTypescript />, title: 'TypeScript', color: '#F0D299' },
  { icon: <FaBootstrap />, title: 'Bootstrap', color: '#8D4A8A' },
  { icon: <SiTailwindcss />, title: 'Tailwind', color: '#F59E51' },
  { icon: <FaReact />, title: 'React', color: '#F0D299' },
  { icon: <TbBrandNextjs />, title: 'Next.js', color: '#F0D299' },
  { icon: <SiRedux />, title: 'Redux', color: '#8D4A8A' },
  { icon: <SiReactrouter />, title: 'React Router', color: '#F59E51' },
  { icon: <SiReactquery />, title: 'React Query', color: '#F59E51' },
  { icon: <IoLogoFirebase />, title: 'Firebase Auth', color: '#F0D299' },
];

export const BackEnd: SkillItem[] = [
  { icon: <FaNodeJs />, title: 'Node.js', color: '#F59E51' },
  { icon: <SiExpress />, title: 'Express.js', color: '#F0D299' },
  { icon: <SiMongodb />, title: 'MongoDB', color: '#F59E51' },
  { icon: <SiMongoose />, title: 'Mongoose', color: '#8D4A8A' },
  { icon: <SiJsonwebtokens />, title: 'JWT', color: '#8D4A8A' },
  { icon: <SiZod />, title: 'Zod', color: '#F0D299' },
  { icon: <TbBrandGraphql />, title: 'REST API', color: '#F59E51' },
  { icon: <SiPostgresql />, title: 'PostgreSQL', color: '#F0D299' },
  { icon: <SiPrisma />, title: 'Prisma', color: '#8D4A8A' },
  { icon: <SiSocketdotio />, title: 'Socket.io', color: '#F0D299' },
];

export const Tools: SkillItem[] = [
  { icon: <TbBrandVscode />, title: 'VS Code', color: '#F0D299' },
  { icon: <FaGitAlt />, title: 'Git', color: '#F59E51' },
  { icon: <FaGithub />, title: 'GitHub', color: '#F0D299' },
  { icon: <SiVercel />, title: 'Vercel', color: '#F0D299' },
  { icon: <SiPostman />, title: 'Postman', color: '#F59E51' },
];
