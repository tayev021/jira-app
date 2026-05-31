import { HiCubeTransparent } from 'react-icons/hi2';
import { Skeleton } from '../../../../shared/ui/Skeleton';

export function WorkspaceItemSkeleton() {
  return (
    <Skeleton className="flex gap-3 px-3 py-2 border rounded-xl border-gray-primary-light shadow-sm">
      <HiCubeTransparent className="shrink-0 w-10 h-10 text-purple-primary" />
      <div className="w-full">
        <Skeleton.Text className="w-3/4 h-4 mb-2" />
        <Skeleton.Text className="w-1/2" />
      </div>
    </Skeleton>
  );
}
