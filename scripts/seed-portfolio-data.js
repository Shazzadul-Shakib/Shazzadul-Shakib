const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

function loadEnv() {
  const envFiles = ['.env.local', '.env'];

  for (const envFile of envFiles) {
    const fullPath = path.join(process.cwd(), envFile);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!match) continue;

      const key = match[1];
      let value = match[2] || '';

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

const projectsData = [
  {
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
    liveUrl: 'https://accord-ai-client.vercel.app',
    clientUrl: 'https://github.com/Shazzadul-Shakib/accord-ai-client',
    serverUrl: 'https://github.com/Shazzadul-Shakib/accord-ai-server',
    featured: true,
    order: 1,
  },
  {
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
    liveUrl: 'https://bookswap-hub.vercel.app/',
    clientUrl: 'https://github.com/Shazzadul-Shakib/BookswapHub',
    serverUrl: 'https://github.com/Shazzadul-Shakib/BookswapHub-Server',
    featured: true,
    order: 2,
  },
  {
    title: 'Z-BOT',
    description:
      'A full-stack project and financial management app. Create and track projects, manage income/expenses/savings, monitor monthly performance. Features JWT auth, email verification, wallet management, and expense filtering.',
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
    liveUrl: 'https://z-bot-client.vercel.app/',
    clientUrl: 'https://github.com/Shazzadul-Shakib/Z-BOT_Client',
    serverUrl: 'https://github.com/Shazzadul-Shakib/Z-BOT_Server',
    featured: false,
    order: 3,
  },
];

const skillsData = [
  ...[
    'HTML5',
    'CSS3',
    'JavaScript',
    'TypeScript',
    'Bootstrap',
    'Tailwind',
    'React',
    'Next.js',
    'Redux',
    'React Router',
    'React Query',
    'Firebase Auth',
  ].map((name, index) => ({
    name,
    category: 'Frontend',
    level: '',
    order: index + 1,
  })),
  ...[
    'Node.js',
    'Express.js',
    'MongoDB',
    'Mongoose',
    'JWT',
    'Zod',
    'REST API',
    'PostgreSQL',
    'Prisma',
    'Socket.io',
  ].map((name, index) => ({
    name,
    category: 'Backend',
    level: '',
    order: index + 1,
  })),
  ...['VS Code', 'Git', 'GitHub', 'Vercel', 'Postman'].map((name, index) => ({
    name,
    category: 'Tools',
    level: '',
    order: index + 1,
  })),
];

const experiencesData = [
  {
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
    order: 1,
  },
  {
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
    order: 2,
  },
];

async function main() {
  loadEnv();

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set in .env.local or .env');
  }

  await mongoose.connect(mongoUri, { bufferCommands: false });

  const skillSchema = new mongoose.Schema(
    {
      name: String,
      category: String,
      level: String,
      order: Number,
    },
    { timestamps: true },
  );

  const projectSchema = new mongoose.Schema(
    {
      title: String,
      description: String,
      image: String,
      tech: [String],
      liveUrl: String,
      clientUrl: String,
      serverUrl: String,
      featured: Boolean,
      order: Number,
    },
    { timestamps: true },
  );

  const experienceSchema = new mongoose.Schema(
    {
      role: String,
      company: String,
      period: String,
      type: String,
      description: [String],
      tech: [String],
      order: Number,
    },
    { timestamps: true },
  );

  const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
  const Project =
    mongoose.models.Project || mongoose.model('Project', projectSchema);
  const Experience =
    mongoose.models.Experience ||
    mongoose.model('Experience', experienceSchema);

  let seededProjects = 0;
  for (const project of projectsData) {
    const res = await Project.updateOne(
      { title: project.title },
      { $set: project, $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
    if (res.upsertedCount > 0 || res.modifiedCount > 0) seededProjects += 1;
  }

  let seededSkills = 0;
  for (const skill of skillsData) {
    const res = await Skill.updateOne(
      { name: skill.name, category: skill.category },
      { $set: skill, $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
    if (res.upsertedCount > 0 || res.modifiedCount > 0) seededSkills += 1;
  }

  let seededExperiences = 0;
  for (const experience of experiencesData) {
    const res = await Experience.updateOne(
      {
        role: experience.role,
        company: experience.company,
        period: experience.period,
      },
      { $set: experience, $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
    if (res.upsertedCount > 0 || res.modifiedCount > 0) seededExperiences += 1;
  }

  console.log('Portfolio seed completed');
  console.log(`Projects upserted: ${seededProjects}`);
  console.log(`Skills upserted: ${seededSkills}`);
  console.log(`Experiences upserted: ${seededExperiences}`);

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error('Seed failed:', error.message || error);
  await mongoose.disconnect();
  process.exit(1);
});
