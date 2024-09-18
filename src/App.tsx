import { useAtomValue } from 'jotai';
import './App.css';
import { PDFViewer } from './components/PDFViewer';
import { CoverTemplate } from './components/cover-template';
import { Editor } from './components/editor/editor';
import { TopbarLeft, TopbarRight } from './components/topbar';
import { cn } from './lib/utils';
import { previewModeAtom } from './store/preview-mode';

const App = () => {
  const previewMode = useAtomValue(previewModeAtom);

  return (
    <main className="fixed inset-0 flex divide-x">
      <div
        className={cn(
          'flex min-w-0 flex-1 origin-left flex-col divide-y transition-all',
          previewMode && 'lt-lg:invisible lt-lg:grow-0 lt-lg:scale-x-0',
        )}
      >
        <TopbarLeft />
        <Editor />
      </div>
      <div
        className={cn(
          'flex min-w-0 flex-1 origin-left flex-col divide-y transition-all',
          previewMode || 'lt-lg:invisible lt-lg:grow-0 lt-lg:scale-x-0',
          'flex flex-col',
        )}
      >
        <TopbarRight />
        <PDFViewer className="flex-1">
          <CoverTemplate />
        </PDFViewer>
      </div>
    </main>
  );
};

export default App;
