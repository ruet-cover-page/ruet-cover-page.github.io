import { type ReactNode, useId } from 'react';
import { Label } from '../ui/label';

export function FormItem({
  label,
  children,
}: { label: string; children: ReactNode }) {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
