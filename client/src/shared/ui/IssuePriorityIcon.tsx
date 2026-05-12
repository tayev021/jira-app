import type { IconType } from 'react-icons';
import type { IssuePriority } from '../types/IssuePriority';
import {
  HiOutlineBars2,
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
  HiOutlinePause,
} from 'react-icons/hi2';
import { cn } from '../utils/cn';

const icons: Record<IssuePriority, IconType> = {
  none: HiOutlinePause,
  low: HiOutlineChevronDoubleDown,
  medium: HiOutlineBars2,
  high: HiOutlineChevronDoubleUp,
};

const colors: Record<IssuePriority, string> = {
  none: 'text-gray-primary',
  low: 'text-yellow-primary',
  medium: 'text-orange-primary',
  high: 'text-red-primary',
};

interface IssuePriorityIconProps {
  priority: IssuePriority;
  className?: string;
}

export function IssuePriorityIcon({
  priority,
  className = '',
}: IssuePriorityIconProps) {
  const Icon = icons[priority];

  return (
    <Icon
      className={cn(`inline-block text-base ${colors[priority]}`, className)}
    />
  );
}
