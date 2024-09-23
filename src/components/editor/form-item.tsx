import { Label } from '@/components/ui/label';
import { type ReactNode, createContext, useId } from 'react';

export const FormItemContext = createContext({ id: '', descriptionID: '' });

export function FormItem({
  label,
  children,
}: { label: string; children: ReactNode }) {
  const id = useId();
  const descriptionID = useId();
  return (
    <div className="space-y-2">
      <FormItemContext.Provider value={{ id, descriptionID }}>
        <Label htmlFor={id}>{label}</Label>
        {children}
      </FormItemContext.Provider>
    </div>
  );
}
