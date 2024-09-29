import { Input, type InputProps } from '@/components/ui/input';
import { type WritableAtom, useAtom } from 'jotai';
import { useContext } from 'react';
import { FormItemContext } from './form-item';

export function TextInput({
  atom,
  ...props
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  atom: WritableAtom<string, any, void>;
} & InputProps) {
  const [value, setValue] = useAtom(atom);
  const { id } = useContext(FormItemContext);
  return (
    <Input
      id={id}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      {...props}
    />
  );
}
