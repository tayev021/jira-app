import { HiOutlinePlus } from 'react-icons/hi2';

interface CreateWorkspaceButtonProps {
  onClick: () => void;
}

export function CreateWorkspaceButton({ onClick }: CreateWorkspaceButtonProps) {
  return (
    <li
      className="flex gap-3 px-3 py-2 border rounded-xl border-gray-primary-light cursor-pointer transition-all hover:bg-secondary-bg hover:shadow-sm"
      onClick={onClick}
    >
      <HiOutlinePlus className="w-10 h-10 text-purple-primary" />
      <div className="flex items-center overflow-hidden">
        <p className="text-sm italic">Create New Workspace</p>
      </div>
    </li>
  );
}
