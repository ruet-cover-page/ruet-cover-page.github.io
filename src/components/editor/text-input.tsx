import { Input, type InputProps } from '@/components/ui/input';
import { Cross1Icon } from '@radix-ui/react-icons';
import { type WritableAtom, useAtom } from 'jotai';
import { type RESET, useResetAtom } from 'jotai/utils';
import { useContext } from 'react';
import { Button } from '../ui/button';
import { FormItemContext } from './form-item';

export function TextInput<
  S extends string,
  T extends WritableAtom<S, [S | typeof RESET], void>,
>({
  atom,
  ...props
}: {
  atom: T;
} & InputProps) {
  const [value, setValue] = useAtom(atom);
  const reset = useResetAtom(atom);
  const { id } = useContext(FormItemContext);
  return (
    <div className="relative">
      <Input
        id={id}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value as S)}
        {...props}
      />
      {!!value && props.type !== 'number' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 bottom-0 z-10"
          aria-label="reset"
          onClick={reset}
        >
          <Cross1Icon className="h-4 w-4 opacity-50" />
        </Button>
      )}
    </div>
  );
}
