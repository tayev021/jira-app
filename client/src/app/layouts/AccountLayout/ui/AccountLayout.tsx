import { Outlet } from 'react-router';
import { Container } from '../../../../shared/ui/Container';
import { Welcome } from '../../../../shared/ui/Welcome';
import { Nav } from './Nav/Nav';

export function AccountLayout() {
  return (
    <Container>
      <Welcome />
      <div className="min-h-0 flex-1 grid grid-cols-[200px_minmax(200px,1fr)] grid-rows-1 gap-4">
        <Nav />
        <div className="min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
