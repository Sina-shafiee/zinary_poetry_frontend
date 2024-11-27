import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

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

import {
  UpdatePoetInput,
  updatePoetScheam,
  useUpdatePoet,
} from '../api/update-poet';
import PlateEditor from '@/components/editor/plate-editor';
import { Button } from '@/components/ui/button';

import { NonNullablePoetType } from '../api/get-poet';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/config/paths';

interface Props {
  poet: NonNullablePoetType | null;
}

export const UpdatePoetForm = ({ poet }: Props) => {
  const navigate = useNavigate();

  const form = useForm<UpdatePoetInput>({
    resolver: zodResolver(updatePoetScheam),
    values: {
      id: poet?.id ?? '1',
      fullName: poet?.fullName,
      birthYear: poet?.birthYear,
      deathYear: poet?.deathYear,
      biography: poet?.biography,
    },
  });

  const updatePoet = useUpdatePoet({});

  if (!poet) {
    return null;
  }
  const navigateToPeotsList = () => {
    navigate(paths.writer_panel.poets.getHref());
  };
  const onSubmit = async (data: UpdatePoetInput) => {
    data.biography = localStorage.getItem('editor_content');
    const result = await updatePoet.mutateAsync(data);

    if (result.updatePoet?.poet?.id) {
      toast.success('شاعر مورد نظر با موفقیت اپدیت شد');
      localStorage.removeItem('editor_content');

      navigateToPeotsList();
    } else {
      toast.error('خطایی رخ داد لطفا بعدا تلاش کنید');
    }
  };

  return (
    <Form {...form}>
      <form
        id="update-poet-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-2 bg-card p-4 rounded-md shadow"
      >
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field: { value, ...field } }) => (
              <FormItem className="col-span-2 md:col-span-1">
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
              <FormItem className="col-span-2 md:col-span-1">
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
              <FormItem className="col-span-2 md:col-span-1">
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
        </div>
        <FormField
          control={form.control}
          name="biography"
          render={({ field: { value } }) => (
            <FormItem className="w-full">
              <FormLabel>بیوگرافی</FormLabel>
              <FormControl>
                <PlateEditor value={value ?? undefined} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex gap-2 mt-4">
          <Button type="submit">ذخیره تغیرات</Button>
          <Button type="button" onClick={navigateToPeotsList} variant="outline">
            برگشت
          </Button>
        </section>
      </form>
    </Form>
  );
};
