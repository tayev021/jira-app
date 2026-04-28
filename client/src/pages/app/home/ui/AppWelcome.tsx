import { useAuth } from '../../../../shared/hooks/useAuth';
import { getFormattedDate } from '../utils/getFormattedDate';

export function AppWelcome() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="p-5 mb-5 rounded-lg bg-linear-[150deg] from-primary from-40% to-blue-primary to-70%  text-text-secondary">
      <h4 className="mb-2 text-lg font-semibold text-secondary-text">
        {getFormattedDate()}
      </h4>
      <h3 className="text-xl font-bold text-secondary-text">
        Hello, {currentUser.name} {currentUser.surname}
      </h3>
    </div>
  );
}
