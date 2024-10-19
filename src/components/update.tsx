import star from '@/assets/star.svg';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { updatePrompt } from '@/store/dialogs';
import { useAtomValue } from 'jotai';
import { Button } from './ui/button';

export function Update() {
  const show = useAtomValue(updatePrompt.showAtom);

  return (
    <Dialog open={show} onOpenChange={() => updatePrompt.close(false)}>
      <DialogContent className="flex max-h-full flex-col sm:max-w-prose">
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
        </DialogHeader>
        <div className="prose-sm flex-1 overflow-y-auto py-4 text-center">
          <img src={star} alt="" className="mx-auto block" />
          <h1>A Fresh Update is Here</h1>
          <p>
            <Button onClick={() => updatePrompt.close(true)}>Update now</Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
