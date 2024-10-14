import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { type WritableAtom, useAtom } from 'jotai';
import type { Value } from 'node_modules/react-date-picker/dist/esm/shared/types';
import DatePicker, { type DatePickerProps } from 'react-date-picker';
import classes from './date-input.module.css';

export function DateInput({
  atom,
  ...props
}: {
  atom: WritableAtom<Date | null, [Date | null], void>;
} & DatePickerProps) {
  const [value, onChange] = useAtom(atom);
  return (
    <DatePicker
      onChange={onChange as (value: Value) => void}
      value={value}
      format="d MMMM y"
      className={[
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        classes.dateInput,
      ]}
      {...props}
    />
  );
}
