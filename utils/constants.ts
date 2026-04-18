import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa6';

export const siteConfig = {
  name: 'Shazzadul Islam Shakib',
  role: 'Full Stack Developer',
  email: 'shakib.shazzadulislam@gmail.com',
  resumeUrl:
    'https://drive.google.com/file/d/1kBVcGBo2_6lh2iTkxSLHeZO4ZS9czptM/view',
  bio: 'Passionate Full-Stack Developer specializing in the MERN stack and PostgreSQL. Building scalable, secure, and high-performing applications that make a difference.',
  bioLong:
    "I'm a passionate and adaptable Full-Stack Developer with expertise in the MERN stack and PostgreSQL. My commitment lies in crafting seamless user experiences backed by efficient server-side logic. When I'm not coding, I'm studying how to escape infinite bug loops. Always excited to learn and embrace new technologies to deliver impactful solutions. Let's transform ideas into powerful full-stack realities together.",
};

export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Shazzadul-Shakib',
    Icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shazzadul-islam-shakib/',
    Icon: FaLinkedin,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/shazzadulislam.shakib.9/',
    Icon: FaFacebook,
  },
];

export const projects = [
  {
    id: 1,
    title: 'Accord-AI',
    description:
      'A real-time chat platform where users join or create topic-based rooms for focused discussions. Features instant messaging, message deletion, online user tracking, and AI-generated chat summaries via OpenAI API.',
    image: '/accord-ai.png',
    tech: [
      'Next.js',
      'Socket.io',
      'Node.js',
      'Express.js',
      'MongoDB',
      'TypeScript',
      'JWT',
      'Cloudinary',
      'AI Integration',
    ],
    links: {
      client: 'https://github.com/Shazzadul-Shakib/accord-ai-client',
      server: 'https://github.com/Shazzadul-Shakib/accord-ai-server',
      live: 'https://accord-ai-client.vercel.app',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'Bookswap Hub',
    description:
      'A book-sharing platform where users exchange books without money. Features include adding books, borrowing via confirmation codes, bookmarking, managing borrow requests, and profile management.',
    image: '/bookswaphub.jpg',
    tech: [
      'React',
      'Tailwind',
      'Firebase',
      'Node.js',
      'Express.js',
      'TypeScript',
      'MongoDB',
      'RTK Query',
      'JWT',
      'Cloudinary',
    ],
    links: {
      client: 'https://github.com/Shazzadul-Shakib/BookswapHub',
      server: 'https://github.com/Shazzadul-Shakib/BookswapHub-Server',
      live: 'https://bookswap-hub.vercel.app/',
    },
    featured: true,
  },
  {
    id: 3,
    title: 'Z-BOT',
    description:
      'A full-stack project & financial management app. Create and track projects, manage income/expenses/savings, monitor monthly performance. Features JWT auth, email verification, wallet management, and expense filtering.',
    image: '/zbotdashboard.png',
    tech: [
      'React',
      'Tailwind',
      'Shadcn',
      'Redux',
      'Node.js',
      'Express.js',
      'TypeScript',
      'MongoDB',
      'RTK Query',
      'JWT',
    ],
    links: {
      client: 'https://github.com/Shazzadul-Shakib/Z-BOT_Client',
      server: 'https://github.com/Shazzadul-Shakib/Z-BOT_Server',
      live: 'https://z-bot-client.vercel.app/',
    },
    featured: false,
  },
];

export const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: '2023 — Present',
    type: 'Freelance',
    description: [
      'Designed and developed multiple production-grade full-stack web applications using Next.js, React, Node.js, and MongoDB.',
      'Built real-time features using Socket.io, enabling live chat and presence tracking across dedicated chat rooms.',
      'Integrated AI capabilities including OpenAI-powered chat summarization, improving user experience.',
      'Implemented secure authentication systems with JWT, bcrypt, and email verification flows.',
      'Deployed to Vercel and Render with optimized CI/CD pipelines and performance tuning.',
    ],
    tech: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Socket.io', 'TypeScript'],
  },
  {
    id: 2,
    role: 'Open Source Contributor',
    company: 'GitHub',
    period: '2022 — Present',
    type: 'Open Source',
    description: [
      'Actively manage and maintain open-source repositories with clean, documented code.',
      'Contributed to community projects focusing on React and Node.js ecosystems.',
      'Maintained well-structured READMEs and issue tracking for developer collaboration.',
    ],
    tech: ['React', 'Node.js', 'Git', 'GitHub'],
  },
];

export const aboutStats = [
  { label: 'Years Coding', value: '3+' },
  { label: 'Projects Built', value: '10+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Commits', value: '500+' },
];
