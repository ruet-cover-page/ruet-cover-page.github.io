import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { type WritableAtom, useAtom } from 'jotai';
import { FormItemContext } from './form-item';

export function SelectInput<
  S extends string,
  T extends WritableAtom<S, [S], void> = WritableAtom<S, [S], void>,
>({
  name,
  atom,
  options,
}: {
  name: string;
  atom: T;
  options: { value: string; label: string }[];
}) {
  const [value, setValue] = useAtom(atom);
  const { id } = React.useContext(FormItemContext);

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        {options.map((x) => (
          <SelectItem value={x.value} key={x.value}>
            {x.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
