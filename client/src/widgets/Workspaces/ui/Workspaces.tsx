import { WorkspacesList } from './WorkspacesList';

export function Workspaces() {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-semibold">Your Recent Workspaces</h4>
      <WorkspacesList />
    </div>
  );
}
