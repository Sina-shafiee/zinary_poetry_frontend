import * as React from 'react';
import MultiDatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const DatePicker = React.forwardRef<
  React.ElementRef<typeof MultiDatePicker>,
  React.ComponentPropsWithoutRef<typeof MultiDatePicker>
>((props, ref) => {
  return (
    <MultiDatePicker
      ref={ref as any}
      format="YYYY/MM/DD"
      calendar={persian}
      locale={persian_fa}
      arrowClassName="after:!shadow-sm"
      containerClassName="w-full h-9 bg-transparent [&_rmdp-wrapper]:!shadow-none  rounded-md mt-1 flex h-9 w-full rounded-md border border-input"
      inputClass="rounded-md px-2 px-3 py-1 text-base !shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium bg-transparent file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      className="mt-1 rounded-md w-full"
      calendarPosition="bottom-right"
      style={{
        height: '2.1rem',
        minHeight: '2.1rem',
        width: '100%',
      }}
      arrowStyle={{
        boxShadow: 'none',
      }}
      {...props}
    />
  );
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
