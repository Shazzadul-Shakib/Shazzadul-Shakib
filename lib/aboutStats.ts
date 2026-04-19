import Project from '@/models/Project';
import Skill from '@/models/Skill';
import { connectDB } from '@/lib/db';
import { aboutStats, socialLinks } from '@/utils/constants';

export type AboutStat = {
  label: string;
  value: string;
};

type GitHubSearchResponse = {
  total_count?: number;
};

function getDefaultStatMap() {
  return new Map(aboutStats.map((stat) => [stat.label, stat.value]));
}

function toDisplayCount(value: number | null, fallback: string): string {
  if (value === null) return fallback;
  return `${Math.max(0, value)}+`;
}

function getGitHubUsername(): string {
  if (process.env.GITHUB_USERNAME) return process.env.GITHUB_USERNAME;

  const githubLink = socialLinks.find((link) => link.label === 'GitHub')?.href;
  if (!githubLink) return 'Shazzadul-Shakib';

  const parts = githubLink.replace(/\/$/, '').split('/');
  return parts[parts.length - 1] || 'Shazzadul-Shakib';
}

async function getGitHubCommitCount(): Promise<number | null> {
  const username = getGitHubUsername();
  const token = process.env.GITHUB_TOKEN;

  if (!token) return null;

  try {
    let totalContributions = 0;
    const currentYear = new Date().getFullYear();
    const startYear = 2008; // GitHub was founded in 2008

    // Query each year separately since GitHub limits to 1-year spans
    for (let year = currentYear; year >= startYear; year--) {
      const from = new Date(`${year}-01-01`).toISOString();
      const to = new Date(`${year}-12-31`).toISOString();

      const query = `
        query($userName:String!, $from:DateTime!, $to:DateTime!) {
          user(login: $userName) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            userName: username,
            from,
            to,
          },
        }),
        next: { revalidate: 3600 },
      });

      if (!response.ok) return null;

      const data = (await response.json()) as any;

      if (data.errors) {
        console.error('GitHub GraphQL error:', data.errors);
        return null;
      }

      const yearContributions =
        data.data?.user?.contributionsCollection?.contributionCalendar
          ?.totalContributions;
      if (typeof yearContributions === 'number') {
        totalContributions += yearContributions;
      }
    }

    return totalContributions > 0 ? totalContributions : null;
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    return null;
  }
}

export async function getAboutStats(): Promise<AboutStat[]> {
  const fallbackMap = getDefaultStatMap();

  let projectsCount: number | null = null;
  let technologiesCount: number | null = null;

  try {
    await connectDB();

    projectsCount = await Project.countDocuments({});

    const [projectTechs, skillNames] = await Promise.all([
      Project.distinct('tech'),
      Skill.distinct('name'),
    ]);

    const uniqueTech = new Set<string>([
      ...(projectTechs as string[]),
      ...(skillNames as string[]),
    ]);

    technologiesCount = uniqueTech.size;
  } catch {
    projectsCount = null;
    technologiesCount = null;
  }

  const commitsCount = await getGitHubCommitCount();

  return [
    {
      label: 'Years Coding',
      value: fallbackMap.get('Years Coding') || '3+',
    },
    {
      label: 'Projects Built',
      value: toDisplayCount(
        projectsCount,
        fallbackMap.get('Projects Built') || '10+',
      ),
    },
    {
      label: 'Technologies',
      value: toDisplayCount(
        technologiesCount,
        fallbackMap.get('Technologies') || '20+',
      ),
    },
    {
      label: 'Commits',
      value: toDisplayCount(commitsCount, fallbackMap.get('Commits') || '500+'),
    },
  ];
}
