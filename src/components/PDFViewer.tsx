import { cn } from '@/lib/utils';
import type ReactPDF from '@react-pdf/renderer';
import { usePDF } from '@react-pdf/renderer';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { useResizeObserver } from 'usehooks-ts';
import { LoadingSpinner } from './ui/loading-spinner';

type Size = {
  width?: number;
  height?: number;
};

export function PDFViewer({
  children,
  className,
  ...props
}: {
  children: React.ReactElement<ReactPDF.DocumentProps>;
} & React.HTMLAttributes<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  const fitSize = useMemo(
    () =>
      size.height && size.width
        ? size.height / size.width > Math.SQRT2
          ? { width: size.width }
          : { height: size.height }
        : undefined,
    [size],
  );

  const onResize = useDebouncedCallback(setSize, 200);

  useResizeObserver({
    ref: containerRef,
    onResize,
  });

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const [instance, updateInstance] = usePDF();
  const updateInstanceRef = useRef(updateInstance);
  updateInstanceRef.current = updateInstance;

  useEffect(() => updateInstanceRef.current(children), [children]);

  const [file] = useDebounce(instance.url, 500);

  return (
    <div
      ref={containerRef}
      className={cn('relative flex overflow-hidden bg-neutral-500', className)}
      {...props}
    >
      {file && (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="m-auto"
        >
          <Page
            pageNumber={pageNumber}
            width={fitSize?.width}
            height={fitSize?.height}
          />
        </Document>
      )}
      {(instance.loading || instance.url !== file) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <LoadingSpinner className="h-16 w-16" />
        </div>
      )}
    </div>
  );
}
