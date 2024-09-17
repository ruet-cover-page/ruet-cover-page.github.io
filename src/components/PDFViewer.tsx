import type ReactPDF from '@react-pdf/renderer';
import { usePDF } from '@react-pdf/renderer';
import { useEffect, useRef } from 'react';

export function PDFViewer({
  children,
  ...props
}: {
  children: React.ReactElement<ReactPDF.DocumentProps>;
} & React.HTMLAttributes<HTMLIFrameElement>) {
  const [instance, updateInstance] = usePDF();
  const updateInstanceRef = useRef(updateInstance);
  updateInstanceRef.current = updateInstance;

  useEffect(() => updateInstanceRef.current(children), [children]);

  const src = instance.url ? `${instance.url}#toolbar=0&view=Fit` : null;

  return src && <iframe src={src} {...props} />;
}
