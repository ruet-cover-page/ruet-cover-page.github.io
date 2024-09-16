import {
  type Theme,
  applyTheme,
  getManualTheme,
  getSystemTheme,
} from '@/lib/theme';
import { atomWithStorage } from 'jotai/utils';

export const themeAtom = atomWithStorage<Theme | 'auto'>(
  import.meta.env.PUBLIC_THEME_KEY,
  import.meta.env.PUBLIC_DEFAULT_THEME,
  {
    getItem: (key, initialValue) => {
      const savedTheme = localStorage.getItem(key);
      return (savedTheme && getManualTheme(savedTheme)) || initialValue;
    },
    setItem: (key, value) => {
      localStorage.setItem(key, value);
      applyTheme(getManualTheme(value) ?? getSystemTheme());
    },
    removeItem: (key) => localStorage.removeItem(key),
    subscribe: (key, callback, initialValue) => {
      if (
        typeof window === 'undefined' ||
        typeof window.addEventListener === 'undefined'
      ) {
        return () => {};
      }
      window.addEventListener('storage', (e) => {
        if (e.storageArea === localStorage && e.key === key) {
          const newValue = e.newValue;
          callback((newValue && getManualTheme(newValue)) || initialValue);
        }
      });
      return () => {};
    },
  },
  { getOnInit: true },
);
