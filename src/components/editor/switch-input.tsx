import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { type WritableAtom, useAtom } from 'jotai';
import { useId } from 'react';

export function SwitchInput<T extends WritableAtom<boolean, [boolean], void>>({
  atom,
  label,
}: {
  atom: T;
} & { label: string }) {
  const [value, setValue] = useAtom(atom);
  const id = useId();
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} checked={value} onCheckedChange={setValue} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
