import { useAuth } from '../../../shared/hooks/useAuth';
import { Container } from '../../../shared/ui/Container';
import { formatDate } from '../../../shared/utils/formatDate';
import { Workspaces } from '../../../widgets/Workspaces';

export function AppHomePage() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div>
      <Container>
        <div className="p-5 mb-5 rounded-lg bg-linear-[150deg] from-primary from-40% to-blue-primary to-70%  text-text-secondary">
          <h4 className="mb-2 text-lg font-semibold text-secondary-text">
            {formatDate(new Date(), 'WWWW, MMM DD')}
          </h4>
          <h3 className="text-xl font-bold text-secondary-text">
            Hello, {currentUser.name} {currentUser.surname}
          </h3>
        </div>
        <Workspaces />
      </Container>
    </div>
  );
}
