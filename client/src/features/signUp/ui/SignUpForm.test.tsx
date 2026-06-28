import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { SignUpForm } from './SignUpForm';
import { useAuth } from '../../../shared/hooks/useAuth';
import userEvent from '@testing-library/user-event';
import { signUp } from '../api/signUp';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../api/signUp', () => ({
  signUp: vi.fn(),
}));

describe('features/signup/ui/', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });
  });

  it('should sign up', async () => {
    renderWithProviders(<SignUpForm />);

    const event = userEvent.setup();

    expect(
      screen.getByRole('heading', { level: 3, name: /Sign Up/i })
    ).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/^Name$/i);
    const surnameInput = screen.getByLabelText(/^Surname$/i);
    const emailInput = screen.getByLabelText(/^Email$/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^Confirm Password$/i);

    await event.type(nameInput, 'Test');
    await event.type(surnameInput, 'Test');
    await event.type(emailInput, 'test@test.com');
    await event.type(passwordInput, '1111');
    await event.type(confirmPasswordInput, '1111');

    await event.click(screen.getByRole('button', { name: /^Sign up$/i }));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith(
        {
          name: 'Test',
          surname: 'Test',
          email: 'test@test.com',
          password: '1111',
          confirmPassword: '1111',
        },
        expect.anything()
      );
    });
  });
});
