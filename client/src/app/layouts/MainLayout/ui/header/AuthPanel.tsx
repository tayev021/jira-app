import { Link } from 'react-router';

export function AuthPanel() {
  return (
    <div className="flex gap-2 text-base">
      <Link
        to="/auth/signin"
        className="py-1 px-2 rounded-md font-medium leading-none text-primary hover:bg-bg-secondary hover:text-secondary"
      >
        Sign in
      </Link>
      <Link
        to="/auth/signup"
        className="py-1 px-2 rounded-md font-medium leading-none text-primary hover:bg-bg-secondary hover:text-secondary"
      >
        Sign up
      </Link>
    </div>
  );
}
