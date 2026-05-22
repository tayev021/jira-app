import { z } from 'zod';

export const updateDescriptionSchema = z.object({
  description: z
    .string('Issue description must be a string')
    .trim()
    .min(2, 'Issue description must be at least 2 characters')
    .max(4096, 'Issue description must be less than 4096 characters'),
});

export type UpdateDescriptionSchema = z.infer<typeof updateDescriptionSchema>;
