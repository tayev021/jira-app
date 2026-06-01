import { useIssues } from '../../../entities/issue';
import { useEffect } from 'react';
import { Loader } from '../../../shared/ui/Loader';
import { IssuesTable } from './Table/IssuesTable';
import { NoIssues } from './NoIssues';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import { CreateIssue } from '../../../features/createIssue';
import { HiPlus } from 'react-icons/hi2';
import toast from 'react-hot-toast';

export function Issues() {
  const { issues, isLoading, isError, error } = useIssues();

  useEffect(() => {
    if (isError) {
      toast.error(error!.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader className="my-8" />;
  if (isError) return null;

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="overflow-auto">
        {issues?.length ? <IssuesTable issues={issues || []} /> : <NoIssues />}
      </div>
      <Modal.Open modalName="create-issue">
        <Button className="flex items-center gap-2 mt-4 mb-2 px-2 py-1 mx-auto border border-gray-primary rounded-sm text-gray-primary shadow-sm hover:shadow-lg">
          <HiPlus className="text-lg" />
          Create Issue
        </Button>
      </Modal.Open>
      <Modal.Window name="create-issue">
        <CreateIssue />
      </Modal.Window>
    </div>
  );
}
