import { z } from 'zod';
import { IssueStatuses } from '../../shared/types/IssueStatus';
import { IssuePriorities } from '../../shared/types/IssuePriority';

class IssueValidation {
  getIssuesSchema = z.object({
    workspaceId: z
      .string('Workspace ID must be a string')
      .trim()
      .length(24, 'Workspace ID must be 24 characters'),
  });
  createIssueSchema = z.object({
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
    workspaceId: z
      .string('Workspace ID must be a string')
      .trim()
      .length(24, 'Workspace ID must be 24 characters'),
  });
  updateTitleSchema = z.object({
    title: z
      .string('Issue title must be a string')
      .trim()
      .min(2, 'Issue title must be at least 2 characters')
      .max(256, 'Issue title must be less than 256 characters'),
  });
  updateDescriptionSchema = z.object({
    description: z
      .string('Issue description must be a string')
      .trim()
      .min(2, 'Issue description must be at least 2 characters')
      .max(4096, 'Issue description must be less than 4096 characters'),
  });
  updateStatusSchema = z.object({
    status: z.enum(IssueStatuses),
  });
  updatePrioritySchema = z.object({
    priority: z.enum(IssuePriorities),
  });
  addAssigneeSchema = z.object({
    assigneeId: z
      .string('Assignee ID must be a string')
      .trim()
      .length(24, 'Assignee ID must be 24 characters'),
  });
  deleteAssigneeSchema = z.object({
    assigneeId: z
      .string('Assignee ID must be a string')
      .trim()
      .length(24, 'Assignee ID must be 24 characters'),
  });
}

export const issueValidations = new IssueValidation();
