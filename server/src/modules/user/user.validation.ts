import { z } from 'zod';

class UserValidation {
  searchUsers = z.object({
    query: z
      .string('Query must be a string')
      .trim()
      .min(2, 'Query must be at least 2 characters')
      .max(50, 'Query must be less than 50 characters'),
    workspaceId: z
      .string('Workspace ID must be a string')
      .trim()
      .length(24, 'Workspace ID must be 24 characters'),
  });
}

export const userValidation = new UserValidation();
