import { useEffect } from 'react';
import { useMyIssues } from '../../../entities/issue';
import { Loader } from '../../../shared/ui/Loader';
import { Card } from './Card/Card';
import { Outlet } from 'react-router';
import toast from 'react-hot-toast';

export function AccountIssues() {
  const { issues, isLoading, isError, error } = useMyIssues();

  useEffect(() => {
    if (isError) {
      toast.error(error!.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader className="my-8" />;

  return (
    <div className="p-5 border border-gray-primary-light rounded-md shadow-md">
      <h4 className="mb-2 font-semibold text-xl text-primary text-center">
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
