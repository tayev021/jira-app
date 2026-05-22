import { HeadingCell } from './cells/HeadingCell';

export function Heading() {
  return (
    <thead>
      <tr className="sticky top-0 bg-secondary-bg text-tertiary-text z-20">
        <HeadingCell className="sticky top-0 left-0 border-l-2 bg-secondary-bg z-20">
          Issue
        </HeadingCell>
        <HeadingCell>Reporter</HeadingCell>
        <HeadingCell>Assignee</HeadingCell>
        <HeadingCell>Priority</HeadingCell>
        <HeadingCell>Status</HeadingCell>
        <HeadingCell>Created</HeadingCell>
        <HeadingCell>Updated</HeadingCell>
        <HeadingCell>Actions</HeadingCell>
      </tr>
    </thead>
  );
}
