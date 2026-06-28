import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { Workspaces } from './Workspaces';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { useWorkspaces } from '../../../entities/workspace';
import userEvent from '@testing-library/user-event';
import { createWorkspace } from '../../../features/createWorkspace/api/createWorkspace';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../entities/workspace', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../../entities/workspace')>();

  return {
    ...actual,
    useWorkspaces: vi.fn(),
  };
});

vi.mock('../../../features/createWorkspace/api/createWorkspace', () => ({
  createWorkspace: vi.fn(),
}));

const user = userFactory({ id: '1' });

describe('widgets/Workspaces/ui/', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  it('should render skeleton loader', async () => {
    vi.mocked(useWorkspaces).mockReturnValue({
      workspaces: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    renderWithProviders(<Workspaces />);

    expect(
      screen.getByRole('heading', {
        level: 4,
        name: /^Your Recent Workspaces$/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('status').length).toBe(3);
  });

  it('should render no workspaces', async () => {
    vi.mocked(useWorkspaces).mockReturnValue({
      workspaces: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Workspaces />);

    expect(
      screen.getByRole('heading', {
        level: 4,
        name: /^Your Recent Workspaces$/i,
      })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/^No workspaces yet$/i)).toBeInTheDocument();
    });
  });

  it('should render workspaces list', async () => {
    vi.mocked(useWorkspaces).mockReturnValue({
      workspaces: [
        workspaceFactory({ name: 'First Workspace' }),
        workspaceFactory({ name: 'Second Workspace' }),
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Workspaces />);

    expect(await screen.findByText(/^First Workspace$/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Second Workspace$/i)).toBeInTheDocument();
  });

  it('should create new workspace', async () => {
    vi.mocked(useWorkspaces).mockReturnValue({
      workspaces: [
        workspaceFactory({ name: 'First Workspace' }),
        workspaceFactory({ name: 'Second Workspace' }),
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Workspaces />);

    const event = userEvent.setup();

    await event.click(screen.getByText(/^Create New Workspace$/i));

    const textInput = screen.getByRole('textbox');

    await event.type(textInput, 'Third workspace');

    await event.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(vi.mocked(createWorkspace).mock.calls[0][0]).toEqual({
        name: 'Third workspace',
      });
    });
  });
});
