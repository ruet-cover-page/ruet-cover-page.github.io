import { cn } from '@/lib/utils';
import type ReactPDF from '@react-pdf/renderer';
import { usePDF } from '@react-pdf/renderer';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useDebouncedCallback } from 'use-debounce';
import { useResizeObserver } from 'usehooks-ts';
import { coverSkeleton } from './cover-skeleton';
import { PDFContext } from './ui/pdf-context';

type Size = {
  width?: number;
  height?: number;
};

const MemoizedPDFViewer = memo(
  ({
    debouncedInstance,
    fitSize,
    setDebouncedInstance,
    isLoadingRef,
    instanceRef,
  }: {
    debouncedInstance: ReactPDF.UsePDFInstance;
    fitSize: { width: number; height: number } | undefined;
    setDebouncedInstance: React.Dispatch<
      React.SetStateAction<ReactPDF.UsePDFInstance>
    >;
    isLoadingRef: React.MutableRefObject<boolean>;
    instanceRef: React.MutableRefObject<ReactPDF.UsePDFInstance>;
  }) => {
    isLoadingRef.current = true;
    const loading = (
      <div
        className="flex flex-col items-center justify-center gap-[4%] bg-white p-[16%]"
        style={fitSize}
      >
        {coverSkeleton}
      </div>
    );
    const handleUpdate = () => {
      isLoadingRef.current = false;
      if (debouncedInstance.blob === instanceRef.current.blob) return;
      setDebouncedInstance(instanceRef.current);
    };

    return (
      <Document
        file={debouncedInstance.blob}
        loading={loading}
        className="m-auto"
        onLoadSuccess={handleUpdate}
        onLoadError={handleUpdate}
        onSourceError={handleUpdate}
      >
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
    a.debouncedInstance.blob === b.debouncedInstance.blob &&
    a.fitSize?.width === b.fitSize?.width,
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

  const [instance] = useContext(PDFContext) ?? usePDF();

  const [debouncedInstance, setDebouncedInstance] = useState(instance);
  const isLoadingRef = useRef(false);
  const isLatest = instance.blob === debouncedInstance.blob;
  const instanceRef = useRef(instance);
  instanceRef.current = instance;

  useEffect(() => {
    if (isLatest || isLoadingRef.current) return;
    setDebouncedInstance(instanceRef.current);
  }, [isLatest]);

  return (
    <div
      ref={containerRef}
      className={cn('relative flex overflow-hidden bg-neutral-500', className)}
      {...props}
    >
      {debouncedInstance.blob && (
        <MemoizedPDFViewer
          debouncedInstance={debouncedInstance}
          fitSize={fitSize}
          setDebouncedInstance={setDebouncedInstance}
          instanceRef={instanceRef}
          isLoadingRef={isLoadingRef}
        />
      )}
    </div>
  );
}
