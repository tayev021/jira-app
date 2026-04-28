import { HiCubeTransparent } from 'react-icons/hi2';

interface WorkspaceItemProps {
  workspace: {
    name: string;
  };
}

export function WorkspaceItem({ workspace }: WorkspaceItemProps) {
  return (
    <li className="flex gap-3 px-3 py-2 border rounded-xl border-gray-primary-light cursor-pointer transition-all hover:bg-secondary-bg hover:shadow-sm">
      <HiCubeTransparent className="w-10 h-10 text-purple-primary" />
      <div className="overflow-hidden">
        <h1 className="font-semibold truncate">{workspace.name}</h1>
        <p className="text-xs italic">Jira Workspace</p>
      </div>
    </li>
  );
}
