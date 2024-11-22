import * as React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import {
  UpdatePoetInput,
  updatePoetScheam,
  useUpdatePoet,
} from '../api/update-poet';
import { NonNullablePoetType } from '../api/get-poets';

interface Props extends React.ComponentPropsWithRef<typeof Sheet> {
  poet: NonNullablePoetType | null;
}

export const PoetUpdateSheet = ({ poet, ...props }: Props) => {
  const form = useForm<UpdatePoetInput>({
    resolver: zodResolver(updatePoetScheam),
    values: {
      id: poet?.id ?? '1',
      fullName: poet?.fullName,
      birthYear: poet?.birthYear,
      deathYear: poet?.deathYear,
    },
  });

  const updatePoet = useUpdatePoet({});

  if (!poet) {
    return null;
  }
  const onSubmit = async (data: UpdatePoetInput) => {
    const result = await updatePoet.mutateAsync(data);
    if (result.updatePoet?.poet?.id) {
      toast.success('شاعر مورد نظر با موفقیت اپدیت شد');
    } else {
      toast.error('خطایی رخ داد لطفا بعدا تلاش کنید');
    }
    props.onOpenChange?.(false);
  };
  return (
    <Sheet {...props}>
      <SheetContent
        side="left"
        className="flex w-full flex-col gap-6 sm:max-w-md"
      >
        <SheetHeader className="text-start">
          <SheetTitle>ویرایش شاعر</SheetTitle>
          <SheetDescription>
            جزئیات شاعر را به‌روزرسانی و تغییرات را ذخیره کنید.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="update-poet-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none"
                      value={value ?? ''}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>تاریخ تولد</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={
                        value
                          ? new DateObject({
                              date: new Date(value),
                              locale: persian_fa,
                              calendar: persian,
                            })
                          : ''
                      }
                      onChange={date => {
                        if (date instanceof DateObject && date.isValid) {
                          const formattedDate = date
                            .toDate()
                            .toISOString()
                            .split('T')[0];
                          onChange(formattedDate);
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deathYear"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>تاریخ وفات</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={
                        value
                          ? new DateObject({
                              date: new Date(value),
                              locale: persian_fa,
                              calendar: persian,
                            })
                          : ''
                      }
                      onChange={date => {
                        if (date instanceof DateObject && date.isValid) {
                          const formattedDate = date
                            .toDate()
                            .toISOString()
                            .split('T')[0];
                          onChange(formattedDate);
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className="flex gap-2 p-0 sm:justify-start">
          <Button
            disabled={updatePoet.isPending}
            form="update-poet-form"
            className="mt-2 min-w-20"
          >
            {updatePoet.isPending ? (
              <Spinner className="size-4 text-destructive-foreground" />
            ) : (
              'ویرایش'
            )}
          </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline" className="mt-2">
              بستن
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
