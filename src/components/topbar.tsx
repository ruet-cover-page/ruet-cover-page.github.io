import icon from '@/assets/icon.svg';
import atoms from '@/store/editor';
import { previewModeAtom } from '@/store/preview-mode';
import { ArrowLeftIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import type { PDFDownloadLinkProps } from '@react-pdf/renderer';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import PDFDownloadLink from './PDFDownloadLink';
import { About } from './about';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

export function TopbarLeft() {
  const setPreviewMode = useSetAtom(previewModeAtom);
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-secondary p-2">
      <div className="flex items-center gap-2">
        <img src={icon} alt="" className="h-8 w-auto" />
        <h1 className="whitespace-nowrap font-semibold text-2xl">
          Cover Page <span className="min-sm::sr-only">Generator</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <About />
        <ModeToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPreviewMode(true)}
          className="lg:hidden"
        >
          <EyeOpenIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Back</span>
        </Button>
      </div>
    </div>
  );
}

export function TopbarRight({
  document,
}: Pick<PDFDownloadLinkProps, 'document'>) {
  const setPreviewMode = useSetAtom(previewModeAtom);
  const courseNo = useAtomValue(atoms.courseNo);
  const studentID = useAtomValue(atoms.studentID);
  const coverNo = useAtomValue(atoms.coverNo);
  const filename = useMemo(() => {
    const parts = [
      'Cover',
      courseNo,
      studentID,
      coverNo.padStart(2, '0'),
    ].filter(Boolean);
    return parts.join('-');
  }, [courseNo, studentID, coverNo]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-secondary p-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPreviewMode(false)}
        className="lg:hidden"
      >
        <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Back</span>
      </Button>
      <div className="ms-auto">
        <Button variant="outline" size="icon" asChild>
          <PDFDownloadLink document={document} fileName={`${filename}.pdf`} />
        </Button>
      </div>
    </div>
  );
}
