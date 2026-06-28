import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../modules/user/user.model';
import { generateAccessToken } from '../../../shared/utils/generateAccessToken';
import { Workspace } from '../../../modules/workspace/workspace.model';
import { generateUniqueSlug } from '../../../modules/workspace/utils/generateUniqueSlug';
import { getNextSequence } from '../../../modules/issue/utils/getNextSequence';
import { Issue } from '../../../modules/issue/issue.model';

describe('/api/v1/issues', () => {
  it('GET /api/v1/issues', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
      assigneeIds: [currentUser._id],
    });

    const response = await request(app)
      .get('/api/v1/issues')
      .query({
        workspaceId: workspace._id.toString(),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.issues)).toBe(true);
  });

  it('GET /api/v1/issues/me', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
      assigneeIds: [currentUser._id],
    });

    const response = await request(app)
      .get('/api/v1/issues/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.issues)).toBe(true);
  });

  it('GET /api/v1/issues/:issueId', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
      assigneeIds: [currentUser._id],
    });

    const response = await request(app)
      .get(`/api/v1/issues/${issue._id.toString()}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.issue.title).toBe('Test issue');
  });

  it('POST /api/v1/issues', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const response = await request(app)
      .post('/api/v1/issues')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test issue',
        description: 'description',
        priority: 'high',
        workspaceId: workspace._id.toString(),
      });

    const issues = await Issue.find({ workspaceId: workspace._id.toString() });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.issue.title).toBe('Test issue');
    expect(Array.isArray(issues)).toBe(true);
    expect(issues[0].title).toBe('Test issue');
    expect(issues[0].status).toBe('todo');
    expect(issues[0].priority).toBe('high');
  });

  it('PATCH /api/v1/issues/:issueId/title', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
      assigneeIds: [currentUser._id],
    });

    const response = await request(app)
      .patch(`/api/v1/issues/${issue._id.toString()}/title`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New title',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.issue.title).toBe('New title');
  });

  it('PATCH /api/v1/issues/:issueId/description', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
      assigneeIds: [currentUser._id],
    });

    const response = await request(app)
      .patch(`/api/v1/issues/${issue._id.toString()}/description`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'New description',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.issue.description).toBe('New description');
  });

  it('PATCH /api/v1/issues/:issueId/status', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
      assigneeIds: [currentUser._id],
    });

    const response = await request(app)
      .patch(`/api/v1/issues/${issue._id.toString()}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'in progress',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.issue.status).toBe('in progress');
  });

  it('PATCH /api/v1/issues/:issueId/priority', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
      assigneeIds: [currentUser._id],
    });

    const response = await request(app)
      .patch(`/api/v1/issues/${issue._id.toString()}/priority`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        priority: 'high',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.issue.priority).toBe('high');
  });

  it('PUT /api/v1/issues/:issueId/assignee', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
    });

    const response = await request(app)
      .put(`/api/v1/issues/${issue._id.toString()}/assignee`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        assigneeId: currentUser._id.toString(),
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.issue.assignees.length).toBe(1);
    expect(response.body.data.issue.assignees[0].id).toBe(
      currentUser._id.toString()
    );
  });

  it('DELETE /api/v1/issues/:issueId', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
      assigneeIds: [currentUser._id],
    });

    const response = await request(app)
      .delete(`/api/v1/issues/${issue._id.toString()}/assignee`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        assigneeId: currentUser._id.toString(),
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.issue.assignees.length).toBe(0);
  });

  it('DELETE /api/v1/issues/:issueId/assignee', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });
    const seq = await getNextSequence(workspace._id);
    const issue = await Issue.create({
      slug: `${workspace.slug}-${seq}`,
      sequenceNumber: seq,
      title: 'Test issue',
      description: 'description',
      priority: 'none',
      workspaceId: workspace._id,
      reporterId: currentUser._id,
    });

    const response = await request(app)
      .delete(`/api/v1/issues/${issue._id.toString()}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({});
  });
});
