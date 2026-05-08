import { useIssues } from '../../../entities/issue';
import { NoIssues } from './NoIssues';
import { Table } from './Table/Table';

export function Issues() {
  const { issues, isLoading, isError } = useIssues();

  if (isLoading) return <div>Loading placeholder...</div>;
  if (isError) return <div>Error placeholder...</div>;

  return (
    <div className="overflow-x-auto">
      {issues?.length ? <Table issues={issues || []} /> : <NoIssues />}
    </div>
  );
}
