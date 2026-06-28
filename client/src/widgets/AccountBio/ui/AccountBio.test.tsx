import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { AccountBio } from './AccountBio';
import { MemoryRouter, Route, Routes } from 'react-router';
import type { User } from '../../../shared/types/User';
import { userFactory } from '../../../shared/test/factories/userFactory';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../features/updateBio', () => ({
  UpdateBio: ({ user }: { user: User }) => <div>{user.bio}</div>,
}));

vi.mock('../../../features/updateAvatar', () => ({
  UpdateAvatar: () => <div>UpdateAvatar</div>,
}));

vi.mock('../../../entities/user', () => ({
  UserAvatar: () => <div>UserAvatar</div>,
}));

describe('widgets/AccountBio/ui/', () => {
  it('should render bio when user is authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: userFactory({ bio: 'test bio' }),
      isLoading: false,
    });

    render(<AccountBio />);

    expect(screen.getByText('test bio')).toBeInTheDocument();
  });

  it('should redirect to sign in page when user is not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/account']}>
        <Routes>
          <Route path="/account" element={<AccountBio />} />
          <Route path="/auth/signin" element={<div>Sign In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In Page')).toBeInTheDocument();
  });
});
