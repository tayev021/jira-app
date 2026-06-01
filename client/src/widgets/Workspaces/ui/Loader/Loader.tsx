import { WorkspaceItemSkeleton } from './WorkspaceItemSkeleton';

export function Loader() {
  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      <WorkspaceItemSkeleton />
      <WorkspaceItemSkeleton />
      <WorkspaceItemSkeleton />
    </div>
  );
}
