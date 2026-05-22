import { Providers } from './providers';
import { AppRouter } from './routes';
import { Toaster } from '../shared/ui/Toaster';
import { BrowserRouter } from 'react-router';

export function App() {
  return (
    <Providers>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </Providers>
  );
}
