import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { userFactory } from '../../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../../shared/test/renders/renderWithProviders';
import { WorkspaceLayout } from './WorkspaceLayout';
import { useWorkspace } from '../../../../entities/workspace';
import { workspaceFactory } from '../../../../shared/test/factories/workspaceFactory';

vi.mock('../../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../../entities/workspace', () => ({
  useWorkspace: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');

  return {
    ...actual,
    Outlet: () => <div>Mock Outlet</div>,
  };
});

const user = userFactory({ id: '1' });

describe('app/layouts/WorkspaceLayout/ui/', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
    vi.mocked(useWorkspace).mockReturnValue({
      workspace: workspaceFactory({
        id: '111',
        name: 'Workspace Name',
        owner: user,
        members: [user],
      }),
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it('should render WorkspaceLayout', async () => {
    renderWithProviders(<WorkspaceLayout />);

    expect(
      screen.getByRole('heading', { level: 4, name: /^Workspace$/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Workspace Name')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Issues')).toBeInTheDocument();
    expect(screen.getByText('Board')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Mock Outlet')).toBeInTheDocument();
  });
});
