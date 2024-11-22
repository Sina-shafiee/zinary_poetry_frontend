/**
 * Responsive Dialog
 * combination of shadcn Dialog and drawer
 */
import * as React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { media_queries_map } from '@/config/media-queries';

interface BaseProps {
  children: React.ReactNode;
}

interface RootReDialogProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ReDialogProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const ReDialog = ({ children, ...props }: RootReDialogProps) => {
  const isDesktop = useMediaQuery(media_queries_map.DESKTOP);
  const ReDialog = isDesktop ? Dialog : Drawer;

  return <ReDialog {...props}>{children}</ReDialog>;
};

const ReDialogTrigger = ({ className, children, ...props }: ReDialogProps) => {
  const isDesktop = useMediaQuery(media_queries_map.DESKTOP);
  const ReDialogTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <ReDialogTrigger className={className} {...props}>
      {children}
    </ReDialogTrigger>
  );
};

const ReDialogClose = ({ className, children, ...props }: ReDialogProps) => {
  const isDesktop = useMediaQuery(media_queries_map.DESKTOP);
  const ReDialogClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <ReDialogClose className={className} {...props}>
      {children}
    </ReDialogClose>
  );
};

const ReDialogContent = ({ className, children, ...props }: ReDialogProps) => {
  const isDesktop = useMediaQuery(media_queries_map.DESKTOP);
  const ReDialogContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <ReDialogContent className={className} {...props}>
      {children}
    </ReDialogContent>
  );
};

const ReDialogDescription = ({
  className,
  children,
  ...props
}: ReDialogProps) => {
  const isDesktop = useMediaQuery(media_queries_map.DESKTOP);
  const ReDialogDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <ReDialogDescription className={className} {...props}>
      {children}
    </ReDialogDescription>
  );
};

const ReDialogHeader = ({ className, children, ...props }: ReDialogProps) => {
  const isDesktop = useMediaQuery(media_queries_map.DESKTOP);
  const ReDialogHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <ReDialogHeader className={className} {...props}>
      {children}
    </ReDialogHeader>
  );
};

const ReDialogTitle = ({ className, children, ...props }: ReDialogProps) => {
  const isDesktop = useMediaQuery(media_queries_map.DESKTOP);
  const ReDialogTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <ReDialogTitle className={className} {...props}>
      {children}
    </ReDialogTitle>
  );
};

const ReDialogBody = ({ className, children, ...props }: ReDialogProps) => {
  return (
    <div className={cn('px-4 md:px-0', className)} {...props}>
      {children}
    </div>
  );
};

const ReDialogFooter = ({ className, children, ...props }: ReDialogProps) => {
  const isDesktop = useMediaQuery(media_queries_map.DESKTOP);
  const ReDialogFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <ReDialogFooter className={className} {...props}>
      {children}
    </ReDialogFooter>
  );
};

export {
  ReDialog,
  ReDialogTrigger,
  ReDialogClose,
  ReDialogContent,
  ReDialogDescription,
  ReDialogHeader,
  ReDialogTitle,
  ReDialogBody,
  ReDialogFooter,
};
