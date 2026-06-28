import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../modules/user/user.model';
import { generateAccessToken } from '../../../shared/utils/generateAccessToken';
import { Workspace } from '../../../modules/workspace/workspace.model';
import { generateUniqueSlug } from '../../../modules/workspace/utils/generateUniqueSlug';

describe('/api/v1/users', () => {
  it('GET /api/v1/users', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });

    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.users)).toBe(true);
  });

  it('GET /api/v1/users/:userId', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    const user = await User.create({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: 'test',
    });

    const response = await request(app)
      .get(`/api/v1/users/${user._id.toString()}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.name).toBe('Test');
    expect(response.body.data.user.surname).toBe('Test');
    expect(response.body.data.user.email).toBe('test@test.com');
  });

  it('GET /api/v1/users/search', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });
    await User.create({
      name: 'Test',
      surname: 'Test',
      email: 'test@test.com',
      password: 'test',
    });
    const workspace = await Workspace.create({
      name: 'Workspace Test Name',
      slug: await generateUniqueSlug('Workspace Test Name'),
      ownerId: currentUser._id,
      memberIds: [currentUser._id],
    });

    const response = await request(app)
      .get('/api/v1/users/search')
      .query({
        query: 'test',
        workspaceId: workspace._id.toString(),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.users.length).toBe(1);
    expect(response.body.data.users[0].name).toBe('Test');
    expect(response.body.data.users[0].surname).toBe('Test');
    expect(response.body.data.users[0].email).toBe('test@test.com');
  });

  it('PATCH /api/v1/users/bio', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });

    const response = await request(app)
      .patch('/api/v1/users/bio')
      .set('Authorization', `Bearer ${token}`)
      .send({
        bio: 'new bio',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.bio).toBe('new bio');
  });

  it('DELETE /api/v1/users/delete', async () => {
    const currentUser = await User.create({
      name: 'CurrentUser',
      surname: 'CurrentUser',
      email: 'currentUser@test.com',
      password: 'currentUser',
    });
    const token = generateAccessToken({
      id: currentUser._id.toString(),
    });

    const response = await request(app)
      .delete('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({});
  });
});
