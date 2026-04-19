import { SignInForm } from '../../../../features/signIn';

export function SignInPage() {
  return (
    <div className="h-full p-5 pt-28 grid grid-cols-[minmax(min-content,1fr)_1fr] gap-5 bg-bg-secondary">
      <div>
        <h2>Welcome Placeholder</h2>
      </div>
      <SignInForm className="mx-auto" />
    </div>
  );
}
