import {
  useWorkspace,
  useWorkspaceStatistics,
} from '../../../entities/workspace';
import { useEffect } from 'react';
import { Loader } from '../../../shared/ui/Loader';
import { Card } from './Card';
import { UserLink } from '../../../entities/user';
import toast from 'react-hot-toast';
import {
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlinePlusCircle,
  HiOutlineStar,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import { StatusChart } from './StatusChart';
import { PriorityChart } from './PriorityChart';

export function Summary() {
  const {
    workspace,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
    error: workspaceError,
  } = useWorkspace();
  const {
    workspaceStatistics: statistics,
    isLoading: isStatisticLoading,
    isError: isStatisticError,
    error: statisticError,
  } = useWorkspaceStatistics();

  useEffect(() => {
    if (isWorkspaceError) {
      toast.error(workspaceError!.message);
    }
  }, [isWorkspaceError, workspaceError]);

  useEffect(() => {
    if (isStatisticError) {
      toast.error(statisticError!.message);
    }
  }, [isStatisticError, statisticError]);

  if (isWorkspaceLoading || isStatisticLoading) {
    return <Loader className="my-8" />;
  }
  if (!workspace || !statistics) return null;

  console.log(statistics);

  return (
    <div className="w-full max-w-250 flex flex-col gap-5 px-5 mx-auto">
      <div className="grid grid-cols-2 gap-5">
        <Card>
          <HiOutlineStar className="w-10 h-10 shrink-0 text-orange-primary" />
          <UserLink className="h-8 text-base" user={workspace.owner} />
        </Card>
        <Card>
          <HiOutlineUserGroup className="w-10 h-10 shrink-0 text-primary" />
          <h4 className="font-medium text-base text-nowrap">
            {workspace.members.length} members in workspace
          </h4>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Card>
          <HiOutlinePlusCircle className="w-10 h-10 shrink-0 text-purple-primary" />
          <div>
            <h4 className="font-bold">
              {statistics.createdInLastWeek} created
            </h4>
            <p className="text-sm text-gray-primary">in the last 7 days</p>
          </div>
        </Card>
        <Card>
          <HiOutlinePencilSquare className="w-10 h-10 shrink-0 text-yellow-primary" />
          <div>
            <h4 className="font-bold">{statistics.updatedInLastWeek} update</h4>
            <p className="text-sm text-gray-primary">in the last 7 days</p>
          </div>
        </Card>
        <Card>
          <HiOutlineCheckCircle className="w-10 h-10 shrink-0 text-green-primary" />
          <div>
            <h4 className="font-bold">
              {statistics.completedInLastWeek} completed
            </h4>
            <p className="text-sm text-gray-primary">in the last 7 days</p>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <StatusChart statuses={statistics.statuses} />
        <PriorityChart priorities={statistics.priorities} />
      </div>
    </div>
  );
}
