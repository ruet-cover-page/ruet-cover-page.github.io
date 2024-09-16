import type { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

export class SimpleStorage<T extends string> implements SyncStorage<T> {
  getItem(key: string, initialValue: T) {
    const savedValue = localStorage.getItem(key);
    return (savedValue as T) || initialValue;
  }
  setItem(key: string, value: T) {
    localStorage.setItem(key, value);
  }
  removeItem(key: string) {
    return localStorage.removeItem(key);
  }
  subscribe(key: string, callback: (value: T) => void, initialValue: T) {
    if (
      typeof window === 'undefined' ||
      typeof window.addEventListener === 'undefined'
    ) {
      return () => {};
    }
    window.addEventListener('storage', (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        const newValue = e.newValue;
        callback((newValue as T) || initialValue);
      }
    });
    return () => {};
  }
}
