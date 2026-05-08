import { BrowserRouter, Routes, Route } from 'react-router';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../../pages/home';
import { SignInPage, SignUpPage } from '../../pages/auth';
import { ProtectedRoute } from './ProtectedRoute';
import { AppHomePage, IssuesPage, SummaryPage } from '../../pages/app';
import { WorkspaceLayout } from '../layouts/WorkspaceLayout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="auth">
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          <Route path="app" element={<ProtectedRoute />}>
            <Route index element={<AppHomePage />} />
            <Route path="workspace/:workspaceId" element={<WorkspaceLayout />}>
              <Route index element={<SummaryPage />} />
              <Route path="issues" element={<IssuesPage />} />
            </Route>
          </Route>
          <Route path="account" element={<ProtectedRoute />}>
            <Route index element={<div>Account Page</div>} />
          </Route>
          <Route
            path="user/:userId/profile"
            element={<div>User Profile Page</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
