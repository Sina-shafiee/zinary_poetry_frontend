import { cn } from '@/lib/utils';
import React from 'react';

type Props = React.ComponentProps<'div'>;

export const Spinner = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500',
        className,
      )}
      role="status"
      aria-label="در حال بارگزاری"
      {...props}
    >
      <span className="sr-only">در حال بارگزاری...</span>
    </div>
  );
};
