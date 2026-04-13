import { z } from 'zod';

class AuthValidation {
  signUpSchema = z.object({
    name: z
      .string('Name must be a string')
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
    surname: z
      .string('Surname must be a string')
      .trim()
      .min(2, 'Surname must be at least 2 characters')
      .max(50, 'Surname must be less than 50 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Surname contains invalid characters'),
    email: z.email('Email must be valid'),
    password: z
      .string('Password must be a string')
      .trim()
      .min(4, 'Password must be at least 4 characters')
      .max(24, 'Password must be less than 24 characters'),
  });

  signInSchema = z.object({
    email: z.email('Email must be valid'),
    password: z
      .string('Password must be a string')
      .trim()
      .min(4, 'Password must be at least 4 characters')
      .max(24, 'Password must be less than 24 characters'),
  });
}

export const authValidation = new AuthValidation();
