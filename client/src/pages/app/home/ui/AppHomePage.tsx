import { Container } from '../../../../shared/ui/Container';
import { Workspaces } from '../../../../widgets/Workspaces';
import { AppWelcome } from './AppWelcome';

export function AppHomePage() {
  return (
    <div>
      <Container>
        <AppWelcome />
        <Workspaces />
      </Container>
    </div>
  );
}
