import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { SignInForm } from './SignInForm';
import { useAuth } from '../../../shared/hooks/useAuth';
import userEvent from '@testing-library/user-event';
import { signIn } from '../api/signIn';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../api/signIn', () => ({
  signIn: vi.fn(),
}));

describe('features/signin/ui/', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });
  });

  it('should sign in', async () => {
    renderWithProviders(<SignInForm />);

    const event = userEvent.setup();

    expect(
      screen.getByRole('heading', { level: 3, name: /Sign In/i })
    ).toBeInTheDocument();

    const emailInput = screen.getAllByRole('textbox')[0];
    const passwordInput = screen.getByLabelText(/^Password$/i);

    await event.type(emailInput, 'test@test.com');
    await event.type(passwordInput, '1111');

    await event.click(screen.getByRole('button', { name: /^Sign in$/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(
        {
          email: 'test@test.com',
          password: '1111',
        },
        expect.anything()
      );
    });
  });
});
