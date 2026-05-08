export const IssuePriorities = ['none', 'low', 'medium', 'high'] as const;

export type IssuePriority = (typeof IssuePriorities)[number];
