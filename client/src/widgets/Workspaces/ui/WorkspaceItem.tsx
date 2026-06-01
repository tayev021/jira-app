import type { Workspace } from '../../../shared/types/Workspace';
import { Link } from 'react-router';
import { HiCubeTransparent } from 'react-icons/hi2';

interface WorkspaceItemProps {
  workspace: Workspace;
}

export function WorkspaceItem({ workspace }: WorkspaceItemProps) {
  return (
    <li>
      <Link
        to={`/app/workspace/${workspace.id}`}
        className="flex gap-3 px-3 py-2 border rounded-xl border-gray-primary-light cursor-pointer transition-all hover:bg-secondary-bg shadow-sm"
      >
        <HiCubeTransparent className="w-10 h-10 text-purple-primary" />
        <div className="overflow-hidden">
          <h1 className="font-semibold truncate">{workspace.name}</h1>
          <p className="text-xs italic">Jira Workspace</p>
        </div>
      </Link>
    </li>
  );
}
