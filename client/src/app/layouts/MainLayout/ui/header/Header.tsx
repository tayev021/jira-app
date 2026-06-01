import { useAuth } from '../../../../../shared/hooks/useAuth';
import { Container } from '../../../../../shared/ui/Container';
import { Link } from 'react-router';
import logo from '../../../../../shared/assets/logo.png';
import { UserPanel } from './UserPanel';
import { AuthPanel } from './AuthPanel';

export function Header() {
  const { currentUser } = useAuth();

  return (
    <header className="shadow-md">
      <Container className="flex-row justify-between items-center py-1">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Jira Logo" className="w-7 h-7" />
          <h2 className="text-xl leading-none">Jira</h2>
        </Link>
        {currentUser ? <UserPanel /> : <AuthPanel />}
      </Container>
    </header>
  );
}
