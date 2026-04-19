import { useSignOut } from '../model/useSignOut';
import { cn } from '../../../shared/utils/cn';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useNavigate } from 'react-router';

interface SignOutProps {
  className?: string;
}

export function SignOut({ className = '' }: SignOutProps) {
  const mutation = useSignOut();
  const navigate = useNavigate();

  function handleClick() {
    mutation.mutate();
    navigate('/');
  }

  return (
    <button
      className={cn('w-6 h-6 cursor-pointer hover:text-secondary', className)}
      onClick={handleClick}
    >
      <HiArrowRightOnRectangle className="w-full h-full" />
    </button>
  );
}
