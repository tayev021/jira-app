import { HeadingCell } from './cells/HeadingCell';

export function Heading() {
  return (
    <thead>
      <tr className="bg-secondary-bg text-tertiary-text">
        <HeadingCell>Issue</HeadingCell>
        <HeadingCell>Reporter</HeadingCell>
        <HeadingCell>Assignee</HeadingCell>
        <HeadingCell>Priority</HeadingCell>
        <HeadingCell>Status</HeadingCell>
        <HeadingCell>Created</HeadingCell>
        <HeadingCell>Updated</HeadingCell>
      </tr>
    </thead>
  );
}
