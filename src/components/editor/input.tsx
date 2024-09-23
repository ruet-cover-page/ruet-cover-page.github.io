import { Input, type InputProps } from '@/components/ui/input';
import { type WritableAtom, useAtom } from 'jotai';

export function TextInput({
  atom,
  ...props
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  atom: WritableAtom<string, any, void>;
} & InputProps) {
  const [value, setValue] = useAtom(atom);
  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      {...props}
    />
  );
}
