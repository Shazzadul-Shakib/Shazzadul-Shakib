import Skill from '@/models/Skill';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import DevInfo from '@/models/DevInfo';
import type { Model } from 'mongoose';
import {
  skillSchema,
  projectSchema,
  experienceSchema,
  devInfoSchema,
} from '@/lib/validations';

export const portfolioTypes = [
  'skills',
  'projects',
  'experiences',
  'devInfo',
] as const;
export type PortfolioType = (typeof portfolioTypes)[number];

const modelMap = {
  skills: Skill,
  projects: Project,
  experiences: Experience,
  devInfo: DevInfo,
};

const schemaMap = {
  skills: skillSchema,
  projects: projectSchema,
  experiences: experienceSchema,
  devInfo: devInfoSchema,
};

export function isPortfolioType(value: string): value is PortfolioType {
  return portfolioTypes.includes(value as PortfolioType);
}

export function getPortfolioModel(type: PortfolioType): Model<any> {
  return modelMap[type] as Model<any>;
}

export function validatePortfolioPayload(
  type: PortfolioType,
  payload: unknown,
) {
  return schemaMap[type].safeParse(payload);
}
