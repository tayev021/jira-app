import { useAuth } from '../../../shared/hooks/useAuth';
import { useWorkspace } from '../../../entities/workspace';
import { UserLink } from '../../../entities/user';
import { DeleteMember } from '../../../features/deleteMember';
import { InviteMember } from './InviteMember';

export function Members() {
  const { currentUser } = useAuth();
  const { workspace } = useWorkspace();

  if (!workspace) return null;

  return (
    <div className="h-full grid grid-cols-[repeat(2,minmax(150px,350px))] justify-center gap-5 overflow-y-auto">
      <div className="relative rounded-sm bg-secondary-bg shadow-md">
        <div className="sticky top-0 h-10 flex items-center justify-center p-2 border-b border-gray-primary-light rounded-md bg-secondary-bg shadow-sm z-10">
          <h4 className="font-semibold text-base text-gray-primary uppercase leading-none">
            Workspace owner
          </h4>
        </div>
        <ul className="flex flex-col items-start gap-2 p-5 pt-8">
          <li>
            <UserLink className="h-8 text-sm" user={workspace.owner} />
          </li>
        </ul>
      </div>
      <div className="relative rounded-md bg-secondary-bg shadow-sm">
        <div className="sticky top-0 h-10 flex items-center justify-center p-2 border-b border-gray-primary-light rounded-md bg-secondary-bg shadow-sm z-10">
          <h4 className="font-semibold text-base text-gray-primary uppercase leading-none">
            Workspace members
          </h4>
          <span className="px-1 ml-2 rounded-sm font-semibold text-gray-primary bg-gray-primary-light">
            {workspace.members.length - 1}
          </span>
        </div>
        {workspace.members.length > 1 ? (
          <ul className="flex flex-col gap-2 p-5 pt-8">
            {workspace.members.map((member) =>
              member.id !== workspace.owner.id ? (
                <li
                  key={member.id}
                  className="group flex justify-between items-center gap-5"
                >
                  <UserLink className="h-8 text-sm" user={member} />
                  {currentUser?.id === workspace.owner.id && (
                    <DeleteMember memberId={member.id} />
                  )}
                </li>
              ) : null
            )}
          </ul>
        ) : (
          <p className="p-8 italic text-gray-primary text-center">
            There are no members in this workspace
          </p>
        )}
        {currentUser?.id === workspace.owner.id && <InviteMember />}
      </div>
    </div>
  );
}
