import { useIssue } from '../../../entities/issue';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Loader } from '../../../shared/ui/Loader';
import { trim } from '../utils/trim';
import { Drawer } from '../../../shared/ui/Drawer';
import { Columns } from './Columns';
import { Heading } from './Heading';
import { formatDate } from '../../../shared/utils/formatDate';
import { Row } from './Row';
import { UpdateIssueStatus } from '../../../features/updateIssueStatus';
import { UpdateIssuePriority } from '../../../features/updateIssuePriority';
import { UserLink } from '../../../entities/user';
import { UpdateIssueDescription } from '../../../features/updateIssueDescription';
import { Assignees } from './Assignees';
import { AddAssigneeButton } from './AddAssigneeButton';
import { Actions } from './Actions';
import toast from 'react-hot-toast';

export function IssueDetails() {
  const { issue, isLoading, isError, error } = useIssue();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(error!.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader className="my-8" />;
  if (!issue) return null;

  function handleClose() {
    const isBoardPage = location.pathname.includes('board');
    const trimmedPath = trim(location.pathname);

    navigate(
      location.state?.backgroundLocation ||
        `${isBoardPage ? trim(trimmedPath) : trimmedPath}`
    );
  }

  return (
    <Drawer className="flex flex-col gap-5 px-5 py-4" close={handleClose}>
      <div className="h-7 flex justify-center items-center gap-4 pl-12 mb-2 text-lg leading-none">
        <h3 className="font-semibold text-primary text-nowrap">{issue.slug}</h3>
        <h3 className="font-medium truncate">{issue.title}</h3>
      </div>
      <Columns>
        <div>
          <Heading>Created</Heading>
          <p className="text-nowrap">{formatDate(issue.createdAt)}</p>
        </div>
        <div>
          <Heading>Updated</Heading>
          <p className="text-nowrap">{formatDate(issue.updatedAt)}</p>
        </div>
      </Columns>
      <div>
        <Heading>Description</Heading>
        <UpdateIssueDescription issue={issue} />
      </div>
      <Columns>
        <Row>
          <Heading className="mb-0">Status</Heading>
          <UpdateIssueStatus issue={issue} from="issue-details" />
        </Row>
        <Row>
          <Heading className="mb-0">Priority</Heading>
          <UpdateIssuePriority issue={issue} from="issue-details" />
        </Row>
      </Columns>
      <Columns>
        <div>
          <Heading>Reporter</Heading>
          <UserLink user={issue.reporter} />
        </div>
        <div>
          <Heading>Assignees</Heading>
          <Assignees issue={issue} />
          <AddAssigneeButton issue={issue} />
        </div>
      </Columns>
      <Actions issue={issue} />
    </Drawer>
  );
}
