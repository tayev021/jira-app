import { User } from '../../../modules/user/user.model';
import { generateUniqueSlug } from '../../../modules/workspace/utils/generateUniqueSlug';
import { Workspace } from '../../../modules/workspace/workspace.model';
import { mapWorkspace } from '../../../shared/utils/mapWorkspace';

describe('TEST shared/utils/mapWorkspace', () => {
  it('should map populated Workspace to Workspace type', async () => {
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
      memberIds: [owner._id, user._id],
    });
    const populatedWorkspace = await workspace.populate<{
      ownerId: User;
      memberIds: User[];
    }>(['ownerId', 'memberIds']);
    const mappedWorkspace = mapWorkspace(populatedWorkspace);

    expect(mappedWorkspace.name).toBe('Workspace Test Name');
    expect(mappedWorkspace.slug).toBe('WTN');
    expect(mappedWorkspace.owner.id).toBe(owner._id.toString());
    expect(mappedWorkspace.members.length).toBe(2);
    expect(mappedWorkspace.members[1].name).toBe('Test');
  });
});
