import { type PDFDownloadLinkProps, usePDF } from '@react-pdf/renderer';
import { type ReactNode, createContext, memo, useEffect, useRef } from 'react';

export const PDFContext = createContext<ReturnType<typeof usePDF> | null>(null);

export const PDF = memo(function PDF({
  children,
  document,
}: { children: ReactNode } & Pick<PDFDownloadLinkProps, 'document'>) {
  const pdf = usePDF();

  const updateInstanceRef = useRef(pdf[1]);
  updateInstanceRef.current = pdf[1];

  useEffect(() => updateInstanceRef.current(document), [document]);

  return <PDFContext.Provider value={pdf}>{children}</PDFContext.Provider>;
});
