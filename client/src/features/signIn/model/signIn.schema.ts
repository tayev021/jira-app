import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Email must be valid'),
  password: z
    .string('Password must be a string')
    .trim()
    .min(4, 'Password must be at least 4 characters')
    .max(24, 'Password must be less than 24 characters'),
});

export type SignInSchema = z.infer<typeof signInSchema>;
