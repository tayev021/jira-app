import type { User } from '../../../shared/types/User';

export function getAvailableAssignees(
  members: User[],
  assignees: User[]
): User[] {
  const assigneeIds = new Set(assignees.map((user) => user.id));

  return members.filter((member) => !assigneeIds.has(member.id));
}
