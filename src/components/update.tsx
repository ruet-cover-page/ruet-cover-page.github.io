import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { showUpdateAtom } from '@/store/dialogs';
import { useAtom } from 'jotai';
import { Button } from './ui/button';

export function InApp() {
  const [showUpdate, setShowUpdate] = useAtom(showUpdateAtom);

  return (
    <Dialog open={showUpdate} onOpenChange={setShowUpdate}>
      <DialogContent className="flex max-h-full flex-col sm:max-w-prose">
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
        </DialogHeader>
        <div className="prose flex-1 overflow-y-auto py-4">
          <p>A new version of the app is available!</p>
          <p>
            <Button onClick={() => window.location.reload()}>Update now</Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
