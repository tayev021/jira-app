import { Container } from '../../../shared/ui/Container';
import { Welcome } from '../../../shared/ui/Welcome';
import { Workspaces } from '../../../widgets/Workspaces';

export function AppHomePage() {
  return (
    <Container>
      <Welcome />
      <Workspaces />
    </Container>
  );
}
