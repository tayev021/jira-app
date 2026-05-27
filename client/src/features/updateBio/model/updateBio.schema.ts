import { z } from 'zod';

export const updateBioSchema = z.object({
  bio: z
    .string('User bio must be a string')
    .trim()
    .min(2, 'User bio must be at least 2 characters')
    .max(4096, 'User bio must be less than 4096 characters'),
});

export type UpdateBioSchema = z.infer<typeof updateBioSchema>;
