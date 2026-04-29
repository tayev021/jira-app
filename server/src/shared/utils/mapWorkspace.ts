import { Workspace as WorkspaceModel } from '../../modules/workspace/workspace.model';
import { Workspace } from '../types/Workspace';

export function mapWorkspace(workspace: WorkspaceModel): Workspace {
  return {
    id: workspace._id.toString(),
    name: workspace.name,
    owner: workspace.owner.toString(),
    members: workspace.members.map((id) => id.toString()),
    createdAt: workspace.createdAt.toISOString(),
    updatedAt: workspace.updatedAt.toISOString(),
  };
}
