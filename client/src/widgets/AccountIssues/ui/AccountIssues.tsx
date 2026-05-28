import { useMyIssues } from '../../../entities/issue';
import { Card } from './Card/Card';
import { Outlet } from 'react-router';

export function AccountIssues() {
  const { issues } = useMyIssues();

  return (
    <div className="p-5 border border-gray-primary-light rounded-md shadow-md">
      <h4 className="mb-2 font-semibold text-xl text-purple-primary text-center">
        Your Issues
      </h4>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {issues?.map((issue) => (
          <Card key={issue.id} issue={issue} />
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
