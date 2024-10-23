import { Textarea, type TextareaProps } from '@/components/ui/textarea';
import { type WritableAtom, useAtom } from 'jotai';
import { useContext } from 'react';
import { FormItemContext } from './form-item';

export function TextAreaInput<
  S extends string,
  T extends WritableAtom<S, [S], void>,
>({
  atom,
  ...props
}: {
  atom: T;
} & TextareaProps) {
  const [value, setValue] = useAtom(atom);
  const { id } = useContext(FormItemContext);
  return (
    <Textarea
      id={id}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value as S)}
      {...props}
    />
  );
}
