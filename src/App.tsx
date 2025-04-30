import { useAtomValue } from 'jotai';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PDFViewer } from './components/PDFViewer';
import { CoverTemplate } from './components/cover-template';
import { Editor } from './components/editor/editor';
import { TopbarLeft, TopbarRight } from './components/topbar';
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

  return (
    <main className="fixed inset-0 flex divide-x">
      <QueryClientProvider client={queryClient}>
        <div
          className={cn(
            'flex min-w-0 flex-1 origin-left flex-col divide-y transition-all',
            previewMode && 'max-lg:invisible max-lg:grow-0 max-lg:scale-x-0',
          )}
        >
          <TopbarLeft />
          <Editor />
        </div>
        {(!isMobile || previewMode) && (
          <div
            className={cn(
              'flex min-w-0 flex-1 origin-left flex-col divide-y transition-all',
              previewMode || 'max-lg:invisible max-lg:grow-0 max-lg:scale-x-0',
            )}
          >
            <TopbarRight />
            <PDFViewer className="flex-1">{<CoverTemplate />}</PDFViewer>
          </div>
        )}
      </QueryClientProvider>
    </main>
  );
};

export default App;
