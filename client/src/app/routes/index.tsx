import { Routes, Route, useLocation, type Location } from 'react-router';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../../pages/home';
import { SignInPage, SignUpPage } from '../../pages/auth';
import { ProtectedRoute } from './ProtectedRoute';
import {
  AppHomePage,
  BoardPage,
  IssuesPage,
  MembersPage,
  SettingsPage,
  SummaryPage,
} from '../../pages/app';
import { WorkspaceLayout } from '../layouts/WorkspaceLayout';
import { IssueDetails } from '../../widgets/IssueDetails';

export function AppRouter() {
  const location = useLocation();
  const locationState = location.state as {
    backgroundLocation?: Location;
  };
  const backgroundLocation = locationState?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
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
              <Route path="members" element={<MembersPage />} />
              <Route path="issues" element={<IssuesPage />}>
                <Route path=":issueId" element={<IssueDetails />} />
              </Route>
              <Route path="board" element={<BoardPage />}>
                <Route path="issues/:issueId" element={<IssueDetails />} />
              </Route>
              <Route path="settings" element={<SettingsPage />} />
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

      {backgroundLocation && (
        <Routes>
          <Route
            path="/app/workspace/:workspaceId/board/issues/:issueId"
            element={<IssueDetails />}
          />
          <Route
            path="/app/workspace/:workspaceId/issues/:issueId"
            element={<IssueDetails />}
          />
        </Routes>
      )}
    </>
  );
}
