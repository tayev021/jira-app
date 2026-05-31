import type { FC, ReactNode } from 'react';
import { Text } from './Text';
import { Image } from './Image';
import { Box } from './Box';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

type SkeletonComponent = FC<SkeletonProps> & {
  Text: typeof Text;
  Image: typeof Image;
  Box: typeof Box;
};

const Skeleton: SkeletonComponent = ({
  children,
  className = '',
}: SkeletonProps) => {
  return (
    <div role="status" className={cn('animate-pulse', className)}>
      {children}
    </div>
  );
};

Skeleton.Text = Text;
Skeleton.Image = Image;
Skeleton.Box = Box;

export { Skeleton };
