import { Input, type InputProps } from '@/components/ui/input';
import { type WritableAtom, useAtom } from 'jotai';
import { useContext } from 'react';
import { FormItemContext } from './form-item';

export function TextInput<
  S extends string,
  T extends WritableAtom<S, [S], void>,
>({
  atom,
  ...props
}: {
  atom: T;
} & InputProps) {
  const [value, setValue] = useAtom(atom);
  const { id } = useContext(FormItemContext);
  return (
    <Input
      id={id}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value as S)}
      {...props}
    />
  );
}
