import mongoose from 'mongoose';
import { findIssueById } from '../../../shared/utils/findIssueById';
import { User } from '../../../modules/user/user.model';
import { Workspace } from '../../../modules/workspace/workspace.model';
import { generateUniqueSlug } from '../../../modules/workspace/utils/generateUniqueSlug';
import { getNextSequence } from '../../../modules/issue/utils/getNextSequence';
import { Issue } from '../../../modules/issue/issue.model';

describe('TEST shared/utils/findIssueById', () => {
  it('should throw error if issue with this ID does not exist', async () => {
    await expect(
      findIssueById(new mongoose.Types.ObjectId().toString())
    ).rejects.toThrow('Issue with this ID does not exist');
  });

  it('should find issue by ID ', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const id = new mongoose.Types.ObjectId();
    const seq = await getNextSequence(workspace._id);
    await Issue.create({
      _id: id,
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue title',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
    });
    const issue = await findIssueById(id.toString());

    expect(issue.title).toBe('Test issue title');
    expect(issue.slug).toBe(`${workspace.slug}-${seq}`);
    expect(issue.description).toBe('description');
    expect(issue.priority).toBe('none');
  });
});
