import * as React from 'react';

import { cn } from '@/lib/utils';

export const PageTitle = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'section'> & {
    _title?: string;
    headingClassName?: string;
  }
>(({ className, _title, headingClassName, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        'rounded shadow h-16 bg-card flex items-center p-4 gap-2',
        className,
      )}
      {...props}
    >
      <h2 className={cn('md:text-lg font-medium lg:text-xl', headingClassName)}>
        {_title}
      </h2>
    </section>
  );
});
