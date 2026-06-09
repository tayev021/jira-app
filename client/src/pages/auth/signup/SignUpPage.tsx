import { useAuth } from '../../../shared/hooks/useAuth';
import { Navigate } from 'react-router';
import { Container } from '../../../shared/ui/Container';
import { SignUpForm } from '../../../features/signUp';
import {
  HiCubeTransparent,
  HiOutlineChartBar,
  HiOutlineUserGroup,
} from 'react-icons/hi2';

export function SignUpPage() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/app" replace />;
  }

  return (
    <Container>
      <div className="h-135 grid grid-cols-[minmax(min-content,1fr)_1fr] items-center gap-5 py-4 m-10 border-2 border-primary rounded-2xl bg-linear-to-r from-primary from-50% to-primary-bg to-50% shadow-lg">
        <div className="w-full max-w-125 px-8 py-5 mx-auto text-lg text-secondary-text">
          <h2 className="mb-10 font-semibold text-4xl text-center uppercase">
            Start organizing your work today
          </h2>
          <div className="flex items-center gap-5 pl-5 mb-2">
            <HiCubeTransparent className="w-10 h-10 text-secondary-text" />
            <p>
              Create your{' '}
              <span className="font-semibold text-yellow-primary uppercase">
                workspace,
              </span>
            </p>
          </div>
          <div className="flex items-center justify-end gap-5 pr-5 mb-2">
            <HiOutlineUserGroup className="w-10 h-10 text-secondary-text" />
            <p className="text-right">
              invite{' '}
              <span className="font-semibold text-yellow-primary uppercase">
                teammates,
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-5 pl-5 mb-2">
            <HiOutlineChartBar className="w-10 h-10 text-secondary-text" />
            <p className="">
              and track{' '}
              <span className="font-semibold text-yellow-primary uppercase">
                progress
              </span>{' '}
              effortlessly.
            </p>
          </div>
        </div>
        <SignUpForm className="mx-auto border-none" />
      </div>
    </Container>
  );
}
