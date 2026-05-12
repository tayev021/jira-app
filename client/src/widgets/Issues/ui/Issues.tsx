import { useIssues } from '../../../entities/issue';
import { Table } from './Table/Table';
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
    <div>
      <div className="overflow-x-auto">
        {issues?.length ? <Table issues={issues || []} /> : <NoIssues />}
      </div>
      <Modal.Open modalName="create-issue">
        <Button className="flex items-center gap-2 mt-5 mx-auto">
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
