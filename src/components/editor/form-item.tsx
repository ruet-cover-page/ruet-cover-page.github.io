import { createContext, type ReactNode, useId } from 'react';
import { Label } from '@/components/ui/label';

export const FormItemContext = createContext({ id: '', descriptionID: '' });

export function FormItem({
  label,
  children,
  actions,
}: {
  label: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const id = useId();
  const descriptionID = useId();
  const labelContent = <Label htmlFor={id}>{label}</Label>;
  return (
    <div className="space-y-2">
      <FormItemContext.Provider value={{ id, descriptionID }}>
        {actions ? (
          <div className="flex items-center justify-between">
            {labelContent}
            {actions}
          </div>
        ) : (
          labelContent
        )}
        {children}
      </FormItemContext.Provider>
    </div>
  );
}
