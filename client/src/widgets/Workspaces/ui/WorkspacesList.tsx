import { useWorkspaces } from '../../../entities/workspace';
import { useEffect, useState } from 'react';
import { CreateWorkspace } from '../../../features/createWorkspace';
import { CreateWorkspaceButton } from './CreateWorkspaceButton';
import { NoWorkspaces } from './NoWorkspaces';
import { WorkspaceItem } from './WorkspaceItem';
import { Loader } from './Loader/Loader';
import toast from 'react-hot-toast';

export function WorkspacesList() {
  const { workspaces = [], isLoading, isError, error } = useWorkspaces();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(error!.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  return (
    <ul className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {workspaces.length > 0 ? (
        workspaces.map((workspace) => (
          <WorkspaceItem key={workspace.id} workspace={workspace} />
        ))
      ) : (
        <NoWorkspaces />
      )}

      {isCreating ? (
        <CreateWorkspace close={() => setIsCreating(false)} />
      ) : (
        <CreateWorkspaceButton
          key="create-workspace-button"
          onClick={() => setIsCreating(true)}
        />
      )}
    </ul>
  );
}
