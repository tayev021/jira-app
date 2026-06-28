import type { Workspace } from '../../types/Workspace';
import { userFactory } from './userFactory';

export function workspaceFactory(
  overrides: Partial<Workspace> = {}
): Workspace {
  return {
    id: crypto.randomUUID(),
    slug: 'ISS-1',
    name: 'Test',
    owner: userFactory(),
    members: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}
