import * as React from 'react';
import { Row } from '@tanstack/react-table';

import {
  ReDialog,
  ReDialogBody,
  ReDialogClose,
  ReDialogContent,
  ReDialogDescription,
  ReDialogFooter,
  ReDialogHeader,
  ReDialogTitle,
  ReDialogTrigger,
} from '@/components/ui/dialog/re-dialog';

import { NonNullablePoetType } from '../api/get-poets';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useDeletePoet } from '../api/delete-poet';
import { Spinner } from '@/components/ui/spinner';

interface Props
  extends Omit<React.ComponentPropsWithoutRef<typeof ReDialog>, 'children'> {
  poets: Row<NonNullablePoetType>['original'][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export const PoetDeleteDialog = ({
  showTrigger,
  onSuccess,
  poets,
  ...props
}: Props) => {
  const deletePoet = useDeletePoet({
    mutationConfig: {
      onSuccess: () => {
        onSuccess?.();
      },
    },
  });

  const handleDeletePoet = async (poetId: string) => {
    const result = await deletePoet.mutateAsync(poetId);
    if (!result.deletePoet?.success) {
      toast.error('خطایی رخ داد لطفا بعدا تلاش کنید');
      return false;
    }
    return true;
  };

  const onDelete = async () => {
    const isMultiDelete = poets.length > 1;
    let allSuccess = true;

    for (const poet of poets) {
      const success = await handleDeletePoet(poet!.id);
      if (!success) {
        allSuccess = false;
        break;
      }
    }

    if (isMultiDelete) {
      toast[allSuccess ? 'success' : 'error'](
        allSuccess
          ? 'تمامی شاعران مورد نظر با موفقیت حذف شدند'
          : 'خطایی رخ داد لطفا بعدا تلاش کنید',
      );
    } else if (allSuccess) {
      toast.success('شاعر مورد نظر با موفقیت حذف شد');
    }

    props.onOpenChange?.(false);
  };

  return (
    <ReDialog {...props}>
      {showTrigger ? (
        <ReDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            Delete ({poets.length})
          </Button>
        </ReDialogTrigger>
      ) : null}
      <ReDialogContent>
        <ReDialogHeader>
          <ReDialogTitle>آیا کاملاً مطمئن هستید؟</ReDialogTitle>
          <ReDialogDescription>
            <span className="text-base mt-2">
              این عمل قابل بازگشت نیست. این کار به طور دائمی{' '}
              {poets.length === 1 ? ' شاعر' : ' شاعران'} انتخابی شما را از
              سرورهای ما حذف خواهد کرد.
            </span>
          </ReDialogDescription>
        </ReDialogHeader>
        <ReDialogBody className="text-destructive text-sm flex flex-col gap-1">
          <span>
            - لطفاً توجه داشته باشید که با حذف شاعر، تمامی اطلاعات مرتبط با او،
            از جمله اشعار و مجموعه‌های او، نیز حذف خواهند شد.
          </span>
        </ReDialogBody>
        <ReDialogFooter className="gap-2">
          <Button
            aria-label="حذف سطر های انتخاب شده"
            variant="destructive"
            className="min-w-16"
            onClick={onDelete}
            disabled={deletePoet.isPending}
          >
            {deletePoet.isPending ? (
              <Spinner className="size-4 text-destructive-foreground" />
            ) : (
              'حذف'
            )}
          </Button>
          <ReDialogClose asChild>
            <Button variant="outline">لغو</Button>
          </ReDialogClose>
        </ReDialogFooter>
      </ReDialogContent>
    </ReDialog>
  );
};
