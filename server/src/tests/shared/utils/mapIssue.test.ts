import { Issue } from '../../../modules/issue/issue.model';
import { getNextSequence } from '../../../modules/issue/utils/getNextSequence';
import { User } from '../../../modules/user/user.model';
import { generateUniqueSlug } from '../../../modules/workspace/utils/generateUniqueSlug';
import { Workspace } from '../../../modules/workspace/workspace.model';
import { mapIssue } from '../../../shared/utils/mapIssue';

describe('TEST shared/utils/mapIssue', () => {
  it('should map populated Issue to Issue type', async () => {
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
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: owner._id,
      assigneeIds: [user._id],
    });
    const populatedIssue = await issue.populate<{
      reporterId: User;
      assigneeIds: User[];
    }>(['reporterId', 'assigneeIds']);
    const mappedIssue = mapIssue(populatedIssue);

    expect(mappedIssue.title).toBe('Test issue');
    expect(mappedIssue.slug).toBe(`${workspace.slug}-${seq}`);
    expect(mappedIssue.description).toBe('description');
    expect(mappedIssue.reporter.id).toBe(owner._id.toString());
    expect(mappedIssue.assignees.length).toBe(1);
    expect(mappedIssue.assignees[0].name).toBe('Test');
    expect(mappedIssue.status).toBe('todo');
    expect(mappedIssue.priority).toBe('none');
  });
});
