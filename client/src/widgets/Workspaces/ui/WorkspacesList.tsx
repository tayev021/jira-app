import { useWorkspaces } from '../../../entities/workspace';
import { useState } from 'react';
import { CreateWorkspace } from '../../../features/createWorkspace/insex';
import { CreateWorkspaceButton } from './CreateWorkspaceButton';
import { NoWorkspaces } from './NoWorkspaces';
import { WorkspaceItem } from './WorkspaceItem';

export function WorkspacesList() {
  const { workspaces = [], isLoading } = useWorkspaces();
  const [isCreating, setIsCreating] = useState(false);

  if (isLoading) return <div>Loading placeholder...</div>;

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
