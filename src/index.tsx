import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './lib/inline-script';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { pdfjs } from 'react-pdf';
import App from './App';
import { updatePrompt } from './store/dialogs';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const { Workbox } = await import('workbox-window');

  const wb = new Workbox('/sw.js');

  wb.addEventListener('installed', (event) => {
    if (!event.isUpdate) {
      console.log('Service worker installed for the first time');
    }
  });

  wb.addEventListener('waiting', (event) => {
    console.log(
      `A new service worker has installed, but it can't activate` +
        'until all tabs running the current version have fully unloaded.',
    );
    // Assuming the user accepted the update, set up a listener
    // that will reload the page as soon as the previously waiting
    // service worker has taken control.
    wb.addEventListener('controlling', () => {
      // At this point, reloading will ensure that the current
      // tab is loaded under the control of the new service worker.
      // Depending on your web app, you may want to auto-save or
      // persist transient state before triggering the reload.
      window.location.reload();
    });

    // When `event.wasWaitingBeforeRegister` is true, a previously
    // updated service worker is still waiting.
    updatePrompt.open().then((updateAccepted) => {
      if (updateAccepted) {
        wb.messageSkipWaiting();
      }
    });
  });

  wb.register();
}
