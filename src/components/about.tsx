import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  EyeOpenIcon,
  GitHubLogoIcon,
  InfoCircledIcon,
  LinkBreak2Icon,
  MixerVerticalIcon,
  MobileIcon,
} from '@radix-ui/react-icons';

export function About() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <InfoCircledIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">About</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-full flex-col sm:max-w-prose">
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
        </DialogHeader>
        <div className="prose-sm flex-1 overflow-y-auto py-4">
          <p>
            Simple app to quickly create cover pages for your assignments and
            lab reports. Just fill in details like the title, your name, and the
            date, and instantly generate a ready-to-download PDF.
          </p>
          <h2>Features</h2>
          <ul>
            {(
              [
                [
                  EyeOpenIcon,
                  'Live Preview',
                  'See your cover page as you fill it in.',
                ],
                [
                  MixerVerticalIcon,
                  'Customizable',
                  'Tweak settings to get preferred style.',
                ],
                [
                  LinkBreak2Icon,
                  'Works Offline',
                  'Use it anytime, even without internet.',
                ],
                [
                  MobileIcon,
                  'Mobile-Friendly',
                  'Easy to use on both phones and computers.',
                ],
              ] as const
            ).map(([Icon, x, text]) => (
              <li key={x} className="relative">
                <Icon className="-left-4 absolute top-1 h-4 w-4" />
                <b>{x}: </b>
                {text}
              </li>
            ))}
          </ul>
          <h2>Developers</h2>
          <h3>Maintainer</h3>
          <p>
            <a href="https://www.nabilsnigdho.dev" target="blank">
              S. Mahmud Nabil, 20 Series, Dept. of MSE, RUET
            </a>
          </p>
          <h3>Top contributors</h3>
          <ul className="pl-0">
            <li>
              <a href="https://github.com/mdasadur5027" target="blank">
                Md. Asadur Rahman, 21 Series, Dept. of CE, RUET
              </a>
            </li>
          </ul>
          <h2>Source code</h2>
          <p>
            This frontend of this project is open sourced and licensed under the
            MIT license, meaning it's free to use, share, and adapt. The source
            code is available in this{' '}
            <a
              href="https://github.com/ruet-cover-page/ruet-cover-page.github.io/"
              className="inline-flex items-center gap-1 underline"
            >
              <GitHubLogoIcon className="inline" /> github repository
            </a>
            .
          </p>
          <p>
            However the backend is close sourced. The backend is used to fetch
            autocompletion data, analytics and some other features.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
