import { useIssue } from '../../../entities/issue';
import { useLocation, useNavigate, useParams } from 'react-router';
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
import { Actions } from './Actions';

export function IssueDetails() {
  const { issue, isLoading } = useIssue();
  const location = useLocation();
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  if (isLoading) return <div>Loading placeholder...</div>;
  if (!issue) return null;

  function handleClose() {
    const isBoardPage = location.pathname.includes('board');

    navigate(
      location.state?.backgroundLocation ||
        `/app/workspace/${workspaceId}/${isBoardPage ? 'board' : 'issues'}`
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
          <Assignees assignees={issue.assignees} />
        </div>
      </Columns>
      <Actions issue={issue} />
    </Drawer>
  );
}
