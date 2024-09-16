import { useAtomValue } from 'jotai';
import './App.css';
import { TopbarLeft, TopbarRight } from './components/topbar';
import { cn } from './lib/utils';
import { previewModeAtom } from './store/preview-mode';

const App = () => {
  const previewMode = useAtomValue(previewModeAtom);

  return (
    <main className="fixed inset-0 flex divide-x">
      <div
        className={cn(
          'min-w-0 flex-1 origin-left transition-all',
          previewMode && 'lt-lg:invisible lt-lg:grow-0 lt-lg:scale-x-0',
        )}
      >
        <TopbarLeft />
      </div>
      <div
        className={cn(
          'min-w-0 flex-1 origin-right transition-all',
          previewMode || 'lt-lg:invisible lt-lg:grow-0 lt-lg:scale-x-0',
        )}
      >
        <TopbarRight />
      </div>
    </main>
  );
};

export default App;
