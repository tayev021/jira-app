import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/formatDate';

export function Welcome() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="p-5 mb-5 rounded-lg bg-linear-[150deg] from-primary from-40% to-blue-primary to-70% text-text-secondary shadow-md">
      <h4 className="mb-2 text-lg font-semibold text-secondary-text">
        {formatDate(new Date(), 'WWWW, MMM DD')}
      </h4>
      <h3 className="text-xl font-bold text-secondary-text">
        Welcome, {currentUser.name} {currentUser.surname}
      </h3>
    </div>
  );
}
