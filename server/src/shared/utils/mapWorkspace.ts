import { PopulatedWorkspace } from '../../modules/workspace/workspace.model';
import { Workspace } from '../types/Workspace';
import { mapUser } from './mapUser';

export function mapWorkspace(workspace: PopulatedWorkspace): Workspace {
  return {
    id: workspace._id.toString(),
    slug: workspace.slug,
    name: workspace.name,
    owner: mapUser(workspace.ownerId),
    members: workspace.memberIds.map((member) => mapUser(member)),
    createdAt: workspace.createdAt.toISOString(),
    updatedAt: workspace.updatedAt.toISOString(),
  };
}
