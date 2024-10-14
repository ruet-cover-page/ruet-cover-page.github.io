import { useAtomValue } from 'jotai';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PDFViewer } from './components/PDFViewer';
import { CoverTemplate } from './components/cover-template';
import { Editor } from './components/editor/editor';
import { InApp } from './components/in-app';
import { TopbarLeft, TopbarRight } from './components/topbar';
import { PDF } from './components/ui/pdf-context';
import { cn } from './lib/utils';
import { previewModeAtom } from './store/preview-mode';

const mql = window.matchMedia('(max-width: 1023px)');
const queryClient = new QueryClient();

const App = () => {
  const previewMode = useAtomValue(previewModeAtom);
  const [isMobile, setIsMobile] = useState(mql.matches);

  useEffect(() => {
    const handleChange = (event: { matches: boolean }) =>
      setIsMobile(event.matches);
    mql.addEventListener('change', handleChange);

    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const document = <CoverTemplate />;

  return (
    <main className="fixed inset-0 flex divide-x">
      <QueryClientProvider client={queryClient}>
        <div
          className={cn(
            'flex min-w-0 flex-1 origin-left flex-col divide-y transition-all',
            previewMode && 'lt-lg:invisible lt-lg:grow-0 lt-lg:scale-x-0',
          )}
        >
          <TopbarLeft />
          <Editor />
        </div>
        {(!isMobile || previewMode) && (
          <div
            className={cn(
              'flex min-w-0 flex-1 origin-left flex-col divide-y transition-all',
              previewMode || 'lt-lg:invisible lt-lg:grow-0 lt-lg:scale-x-0',
            )}
          >
            <PDF document={document}>
              <TopbarRight document={document} />
              <PDFViewer className="flex-1">{document}</PDFViewer>
            </PDF>
          </div>
        )}
      </QueryClientProvider>
      <InApp />
    </main>
  );
};

export default App;
