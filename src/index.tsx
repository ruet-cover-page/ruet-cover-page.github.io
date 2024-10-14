import './lib/inline-script';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { pdfjs } from 'react-pdf';
import App from './App';
import { defaultStore } from './store';
import { showUpdateAtom } from './store/dialogs';

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
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.ASSET_PREFIX}/sw.js`, {
        scope: `${process.env.ASSET_PREFIX}/`,
      })
      .then((registration) => {
        console.log('SW registered: ', registration);
        registration.addEventListener('updatefound', () => {
          console.log('Service Worker update found!');
          defaultStore.set(showUpdateAtom, true);
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
