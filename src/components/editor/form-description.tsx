import { cn } from '@/lib/utils';
import * as React from 'react';
import { FormItemContext } from './form-item';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { descriptionID } = React.useContext(FormItemContext);

  return (
    <p
      ref={ref}
      id={descriptionID}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

export { FormDescription };
