import { DownloadIcon } from '@radix-ui/react-icons';
import { type PDFDownloadLinkProps, usePDF } from '@react-pdf/renderer';
import { type MouseEvent, useContext, useEffect, useState } from 'react';
import { getUA } from 'react-device-detect';
import { LoadingSpinner } from './ui/loading-spinner';
import { PDFContext } from './ui/pdf-context';

export const PDFDownloadLink = ({
  fileName = 'document.pdf',
  document: doc,
  children,
  onClick,
  ...rest
}: PDFDownloadLinkProps) => {
  const [instance] = useContext(PDFContext) ?? usePDF();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>();
  const fileNameClean = fileName
    .replace(' ', '_')
    .replace(/[^a-zA-Z0-9.\-_]/g, '');

  useEffect(() => {
    if (getUA !== 'Android APP') return;
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        const [prefix, data] = `${reader.result}`.split(',');
        setData(`${prefix};name=${fileNameClean},${data}`);
        setLoading(false);
      },
      false,
    );

    if (instance.blob) {
      reader.readAsDataURL(instance.blob);
      setLoading(true);
    }
  }, [instance.blob, fileNameClean]);

  if (!doc) {
    console.warn('You should pass a valid document to PDFDownloadLink');
    return null;
  }

  const handleDownloadIE = () => {
    // @ts-ignore
    if (instance && window.navigator.msSaveBlob) {
      // IE
      // @ts-ignore
      window.navigator.msSaveBlob(instance.blob, fileNameClean);
    }
  };

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  ) => {
    handleDownloadIE();
    if (typeof onClick === 'function') onClick(event, instance);
  };

  return (
    !loading && (
      <a
        href={
          getUA === 'Android APP'
            ? (data ?? instance.url ?? undefined)
            : (instance.url ?? undefined)
        }
        download={fileNameClean}
        onClick={handleClick}
        {...rest}
      >
        {(({ loading }) => (
          <>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DownloadIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Download</span>
          </>
        ))(instance)}
      </a>
    )
  );
};

export default PDFDownloadLink;
