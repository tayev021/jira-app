import { useParams } from 'react-router';
import { useWorkspace } from '../../../../entities/workspace';
import { HiCubeTransparent } from 'react-icons/hi2';

export function Heading() {
  const { workspaceId } = useParams();
  const { workspace } = useWorkspace(workspaceId!);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-gray-primary">Workspace</h4>
      <h2 className="flex gap-2 items-center font-semibold text-xl">
        <HiCubeTransparent className="w-8 h-8 text-purple-primary" />
        {workspace?.name}
      </h2>
    </div>
  );
}
