import { z } from 'zod';

class WorkspaceValidation {
  createSchema = z.object({
    name: z
      .string('Workspace name must be a string')
      .trim()
      .min(2, 'Workspace name must be at least 2 characters')
      .max(128, 'Workspace name must be less than 128 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Workspace name contains invalid characters'),
  });
  updateNameSchema = z.object({
    name: z
      .string('Workspace name must be a string')
      .trim()
      .min(2, 'Workspace name must be at least 2 characters')
      .max(128, 'Workspace name must be less than 128 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Workspace name contains invalid characters'),
  });
}

export const workspaceValidations = new WorkspaceValidation();
