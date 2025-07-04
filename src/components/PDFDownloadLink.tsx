import { DownloadIcon } from '@radix-ui/react-icons';
import { pdf } from '@react-pdf/renderer';
import { fileSave } from 'browser-fs-access';
import { type ComponentProps, type MouseEvent, useTransition } from 'react';
import { defaultStore } from '@/store';
import editor from '@/store/editor';
import { CoverTemplate } from './cover-template';
import { LoadingSpinner } from './ui/loading-spinner';

export const PDFDownloadLink = ({
  fileName = 'document.pdf',
  ...props
}: { fileName?: string } & ComponentProps<'button'>) => {
  const [isPending, startTransition] = useTransition();
  const fileNameClean = fileName
    .replace(' ', '_')
    .replace(/[^a-zA-Z0-9.\-_]/g, '');

  const handleClick = (
    _event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    startTransition(async () => {
      try {
        const blob = await pdf(<CoverTemplate key={Math.random()} />).toBlob();
        if (window.navigator.userAgent === 'ruet-cover-page-gen') {
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            (
              window as {
                ReactNativeWebView?: {
                  postMessage(msg: string): void;
                };
              }
            ).ReactNativeWebView?.postMessage(
              JSON.stringify({
                dataURI: fileReader.result,
                fileName: fileNameClean,
              }),
            );
          };
          fileReader.readAsDataURL(blob);
          return;
        }
        await fileSave(blob, {
          fileName: fileNameClean,
          extensions: ['.pdf'],
        });
      } catch (error) {
        console.error(error);
        alert('Could not download!');
      }
    });
    try {
      // @ts-ignore
      window.umami?.track('download-cover-page', {
        studentId: defaultStore.get(editor.studentID) || 'Blank',
        courseNo: defaultStore.get(editor.courseNo) || 'Blank',
        courseTitle: defaultStore.get(editor.courseTitle) || 'Blank',
        teacher: defaultStore.get(editor.teacherName) || 'Blank',
        watermark: defaultStore.get(editor.watermark) ? 'true' : 'false',
      });
    } catch (_err) {
      console.error();
    }
  };

  return (
    <button type="button" onClick={handleClick} disabled={isPending} {...props}>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <DownloadIcon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Download</span>
    </button>
  );
};

export default PDFDownloadLink;
