export const IssuePriorities = ['low', 'medium', 'high'] as const;

export type IssuePriority = (typeof IssuePriorities)[number];
