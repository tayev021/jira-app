import '@testing-library/jest-dom/vitest';
import { useMe } from '../../entities/user';
import { userFactory } from './factories/userFactory';

vi.mock('../../entities/user', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../entities/user')>();

  return {
    ...actual,
    useMe: vi.fn(),
  };
});

vi.mock('react-hot-toast', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-hot-toast')>();

  return {
    ...actual,
    default: {
      ...actual.default,
      error: vi.fn(),
    },
  };
});

const mockedUseMe = vi.mocked(useMe);

beforeEach(() => {
  mockedUseMe.mockReturnValue({
    user: userFactory(),
    isLoading: false,
    isError: false,
    error: null,
  });
});
