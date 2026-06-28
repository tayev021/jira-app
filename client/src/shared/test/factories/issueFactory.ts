import type { Issue } from '../../types/Issue';
import { userFactory } from './userFactory';

export function issueFactory(overrides: Partial<Issue> = {}): Issue {
  return {
    id: crypto.randomUUID(),
    slug: 'ISS-1',
    title: 'Test',
    description: 'description',
    workspaceId: crypto.randomUUID(),
    reporter: userFactory(),
    assignees: [],
    status: 'todo',
    priority: 'none',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    doneAt: null,
    ...overrides,
  };
}
