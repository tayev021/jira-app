export const IssueStatuses = ['todo', 'in progress', 'done'] as const;

export type IssueStatus = (typeof IssueStatuses)[number];
