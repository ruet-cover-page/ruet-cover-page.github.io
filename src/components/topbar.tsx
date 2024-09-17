import { courseNoAtom } from '@/store/editor';
import { previewModeAtom } from '@/store/preview-mode';
import {
  ArrowLeftIcon,
  DownloadIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { CoverTemplate } from './cover-template';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { LoadingSpinner } from './ui/loading-spinner';

export function TopbarLeft() {
  const setPreviewMode = useSetAtom(previewModeAtom);
  return (
    <div className="flex flex-wrap items-center justify-between bg-secondary p-2">
      Cover Page
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPreviewMode(true)}
          className="lg:hidden"
        >
          <EyeOpenIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Back</span>
        </Button>
      </div>
    </div>
  );
}

export function TopbarRight() {
  const setPreviewMode = useSetAtom(previewModeAtom);
  const courseNo = useAtomValue(courseNoAtom);
  const filename = useMemo(() => {
    const parts = ['Cover'];
    if (courseNo) parts.push(courseNo);
    return parts.join('-');
  }, [courseNo]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-secondary p-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPreviewMode(false)}
        className="lg:hidden"
      >
        <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Back</span>
      </Button>
      <div className="ms-auto">
        <Button variant="outline" size="icon" asChild>
          <PDFDownloadLink
            document={<CoverTemplate />}
            fileName={`${filename}.pdf`}
          >
            {({ blob, url, loading, error }) => (
              <>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <DownloadIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                )}
                <span className="sr-only">Download</span>
              </>
            )}
          </PDFDownloadLink>
        </Button>
      </div>
    </div>
  );
}
