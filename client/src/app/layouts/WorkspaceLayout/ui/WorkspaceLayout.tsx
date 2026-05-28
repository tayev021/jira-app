import { Outlet } from 'react-router';
import { Nav } from './Nav/Nav';
import { Heading } from './Heading';
import { Container } from '../../../../shared/ui/Container';

export function WorkspaceLayout() {
  return (
    <Container className="flex flex-col gap-5">
      <Heading />
      <Nav />
      <Outlet />
    </Container>
  );
}
