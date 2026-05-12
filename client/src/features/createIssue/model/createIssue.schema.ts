import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string('Issue title must be a string')
    .trim()
    .min(2, 'Issue title must be at least 2 characters')
    .max(256, 'Issue title must be less than 256 characters'),
  description: z
    .string('Issue description must be a string')
    .trim()
    .min(2, 'Issue description must be at least 2 characters')
    .max(4096, 'Issue description must be less than 4096 characters'),
});

export type CreateIssueSchema = z.infer<typeof createIssueSchema>;
