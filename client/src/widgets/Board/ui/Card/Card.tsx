import { Link, useLocation } from 'react-router';
import type { Issue } from '../../../../shared/types/Issue';
import { formatDate } from '../../../../shared/utils/formatDate';
import { UserAvatarLink } from '../../../../entities/user';
import { IssuePriorityIcon } from '../../../../shared/ui/IssuePriorityIcon';
import { CardAssignees } from './CardAssignees';
import type { DragEvent } from 'react';

interface CardProps {
  issue: Issue;
}

export function Card({ issue }: CardProps) {
  const location = useLocation();

  function handleDragStart(event: DragEvent<HTMLLIElement>) {
    event.dataTransfer.setData('issueId', issue.id);
  }

  return (
    <li
      className="flex flex-col gap-1 p-1.5 border border-gray-primary-light rounded-sm shadow-sm bg-primary-bg"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex items-center gap-2">
        <IssuePriorityIcon priority={issue.priority} className="min-w-4" />
        <Link
          to={`/app/workspace/${issue.workspaceId}/board/issues/${issue.id}`}
          state={{ backgroundLocation: location }}
          className="border-b-2 border-transparent font-semibold text-nowrap text-primary cursor-pointer hover:border-primary"
        >
          {issue.slug}
        </Link>
        <h5 className="truncate">{issue.title}</h5>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-sm italic">
          {formatDate(issue.createdAt, 'DD MMM YYYY')}
        </p>
        <div className="flex gap-2">
          <span className="italic">by</span>
          <UserAvatarLink
            to={`/user/${issue.reporter.id}/profile`}
            user={issue.reporter}
          />
        </div>
      </div>
      <CardAssignees assignees={issue.assignees} />
    </li>
  );
}
