import { cn } from '@/lib/utils';
import type ReactPDF from '@react-pdf/renderer';
import { usePDF } from '@react-pdf/renderer';
import {
  memo,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Document, Page } from 'react-pdf';
import { useDebouncedCallback } from 'use-debounce';
import { useResizeObserver } from 'usehooks-ts';
import { coverSkeleton } from './cover-skeleton';

type Size = {
  width?: number;
  height?: number;
};

const MemoizedPDFViewer = memo(
  ({
    instance,
    fitSize,
  }: {
    instance: ReactPDF.UsePDFInstance;
    fitSize: { width: number; height: number } | undefined;
  }) => {
    const loading = (
      <div
        className="flex flex-col items-center justify-center gap-[4%] bg-white p-[16%]"
        style={fitSize}
      >
        {coverSkeleton}
      </div>
    );
    return (
      <Document file={instance.blob} loading={loading} className="m-auto">
        <Page
          pageNumber={1}
          width={fitSize?.width}
          height={fitSize?.height}
          loading={loading}
        />
      </Document>
    );
  },
  (a, b) =>
    a.instance.url === b.instance.url && a.fitSize?.width === b.fitSize?.width,
);

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
          ? { width: size.width, height: size.width * Math.SQRT2 }
          : { width: size.height * Math.SQRT1_2, height: size.height }
        : undefined,
    [size],
  );

  const onResize = useDebouncedCallback(setSize, 200);

  useResizeObserver({
    ref: containerRef,
    onResize,
  });

  const [instance, updateInstance] = usePDF();
  const updateInstanceRef = useRef(updateInstance);
  updateInstanceRef.current = updateInstance;

  useEffect(() => updateInstanceRef.current(children), [children]);

  const debouncedURL = useDeferredValue(instance.url);
  const debouncedInstance = useRef(instance);
  if (debouncedURL !== debouncedInstance.current.url) {
    debouncedInstance.current = instance;
  } else if (!debouncedInstance.current.blob && instance.blob) {
    debouncedInstance.current = instance;
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative flex overflow-hidden bg-neutral-500', className)}
      {...props}
    >
      {debouncedInstance.current.blob && (
        <MemoizedPDFViewer
          instance={debouncedInstance.current}
          fitSize={fitSize}
        />
      )}
    </div>
  );
}
