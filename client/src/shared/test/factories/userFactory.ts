import type { User } from '../../types/User';

export function userFactory(overrides: Partial<User> = {}): User {
  return {
    id: crypto.randomUUID(),
    name: 'Test',
    surname: 'Test',
    email: 'test@test.com',
    avatar: undefined,
    bio: undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}
