import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { isInAppAtom } from '@/store/dialogs';
import { useAtom } from 'jotai';

export function InApp() {
  const [isInApp, setIsInApp] = useAtom(isInAppAtom);

  return (
    <Dialog open={isInApp} onOpenChange={setIsInApp}>
      <DialogContent className="flex max-h-full flex-col sm:max-w-prose">
        <DialogHeader>
          <DialogTitle>In-App browser detected</DialogTitle>
        </DialogHeader>
        <div className="prose flex-1 overflow-y-auto py-4">
          <p>
            It seems you're currently viewing this page inside an in-app
            browser. For the best experience 🚀, we recommend opening it in your
            default browser (like Chrome or Safari)!
          </p>
          <h2>How to do it:</h2>
          <ol>
            <li>
              Tap the "•••" (menu icon) or share icon in the top right corner.
            </li>
            <li>Look for "Open in Browser" or "Open in Chrome/Safari".</li>
            <li>
              Enjoy full functionality and even install this app to your home
              screen!
            </li>
          </ol>
          <p>
            😊 Thanks for understanding! Your experience will be much smoother
            in your main browser.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
