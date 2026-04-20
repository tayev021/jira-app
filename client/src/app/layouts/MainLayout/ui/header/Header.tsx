import { Container } from '../../../../../shared/ui/Container';
import { Link } from 'react-router';
import logo from '../../../../../shared/assets/logo.png';
import { useMe } from '../../../../../entities/user';
import { AuthPanel } from './AuthPanel';
import { UserPanel } from './UserPanel';

export function Header() {
  const { user } = useMe();

  return (
    <header>
      <Container className="flex justify-between items-center py-1 px-3 shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Jira Logo" className="w-7 h-7" />
          <h2 className="text-xl leading-none">Jira</h2>
        </Link>
        {user?.id ? <UserPanel /> : <AuthPanel />}
      </Container>
    </header>
  );
}
