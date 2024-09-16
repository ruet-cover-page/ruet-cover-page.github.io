import { applyTheme, getManualTheme, getSystemTheme } from './theme';

try {
  applyTheme();
} catch (e) {
  //
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!getManualTheme()) applyTheme(getSystemTheme(e));
  });
