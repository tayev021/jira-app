import { useIssues } from '../../../entities/issue';
import { IssuesTable } from './Table/IssuesTable';
import { NoIssues } from './NoIssues';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import { CreateIssue } from '../../../features/createIssue';
import { HiPlus } from 'react-icons/hi2';

export function Issues() {
  const { issues, isLoading, isError } = useIssues();

  if (isLoading) return <div>Loading placeholder...</div>;
  if (isError) return <div>Error placeholder...</div>;

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
