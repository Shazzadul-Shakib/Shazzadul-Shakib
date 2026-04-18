import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000),
});

export const blogSchema = z.object({
  title: z.string().min(3, 'Title is required').max(200),
  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must be lowercase letters, numbers, and hyphens only',
    ),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  coverImage: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  published: z.boolean().default(false),
});

export const skillSchema = z.object({
  name: z.string().min(2, 'Skill name is required').max(80),
  category: z.enum(['Frontend', 'Backend', 'Tools']),
  level: z.string().max(40).optional().or(z.literal('')),
  order: z.number().int().min(0).optional().default(0),
});

export const projectSchema = z.object({
  title: z.string().min(2, 'Project title is required').max(120),
  description: z.string().min(20, 'Description is too short').max(1400),
  image: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value || value.length === 0) return true;
        if (value.startsWith('/')) return true;
        return z.string().url().safeParse(value).success;
      },
      {
        message:
          'Image must be an absolute URL or a local path starting with /',
      },
    )
    .or(z.literal('')),
  tech: z.array(z.string().min(1)).min(1, 'Add at least one technology'),
  liveUrl: z
    .string()
    .url('Please enter a valid Live URL (example: https://yourapp.com)')
    .optional()
    .or(z.literal('')),
  clientUrl: z
    .string()
    .url(
      'Please enter a valid Client repository URL (example: https://github.com/user/repo)',
    )
    .optional()
    .or(z.literal('')),
  serverUrl: z
    .string()
    .url(
      'Please enter a valid Server repository URL (example: https://github.com/user/repo)',
    )
    .optional()
    .or(z.literal('')),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).optional().default(0),
});

export const experienceSchema = z.object({
  role: z.string().min(2, 'Role is required').max(120),
  company: z.string().min(2, 'Company is required').max(120),
  period: z.string().min(2, 'Period is required').max(60),
  type: z.string().min(2, 'Type is required').max(60),
  description: z.array(z.string().min(2)).min(1, 'Add at least one bullet'),
  tech: z.array(z.string().min(1)).min(1, 'Add at least one technology'),
  order: z.number().int().min(0).optional().default(0),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
