import { User } from '../../../modules/user/user.model';
import { generateUniqueSlug } from '../../../modules/workspace/utils/generateUniqueSlug';
import { Workspace } from '../../../modules/workspace/workspace.model';
import { restrictToOwner } from '../../../shared/utils/restrictToOwner';

describe('TEST shared/utils/restrictToOwner', () => {
  it('should throw error if user is not an owner of this workspace', async () => {
    const owner = await User.create({
      name: 'Owner',
      surname: 'Owner',
      email: 'owner@test.com',
      password: 'test',
    });
    const user = await User.create({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: 'test',
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: owner._id,
      memberIds: [owner._id],
    });

    await expect(
      restrictToOwner(workspace, user._id.toString())
    ).rejects.toThrow(
      'You are not the owner of this workspace. You do not have permission to perform this action'
    );
  });

  it('should pass if user is a member of this workspace', async () => {
    const owner = await User.create({
      name: 'Owner',
      surname: 'Owner',
      email: 'owner@test.com',
      password: 'test',
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: owner._id,
      memberIds: [owner._id],
    });
    const result = await restrictToOwner(workspace, owner._id.toString());

    expect(result).toBe(undefined);
  });
});
