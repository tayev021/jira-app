import mongoose from 'mongoose';
import { findWorkspaceById } from '../../../shared/utils/findWorkspaceById';
import { User } from '../../../modules/user/user.model';
import { Workspace } from '../../../modules/workspace/workspace.model';
import { generateUniqueSlug } from '../../../modules/workspace/utils/generateUniqueSlug';

describe('TEST shared/utils/findIssueById', () => {
  it('should throw error if workspace with this ID does not exist', async () => {
    await expect(
      findWorkspaceById(new mongoose.Types.ObjectId().toString())
    ).rejects.toThrow('Workspace with this ID does not exist');
  });

  it('should find workspace by ID ', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const id = new mongoose.Types.ObjectId();
    await Workspace.create({
      _id: id,
      name: 'Workspace test name',
      slug: await generateUniqueSlug('Workspace test name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const workspace = await findWorkspaceById(id.toString());

    expect(workspace.name).toBe('Workspace Test Name');
    expect(workspace.slug).toBe('WTN');
  });
});
