import { atom } from 'jotai';
import { defaultStore } from '.';

export class Prompt {
  private _showAtom;
  private promptResult?: Promise<boolean>;
  private resolve?: (value: boolean) => void;
  showAtom;

  constructor() {
    const _showAtom = atom(false);
    this._showAtom = _showAtom;
    this.showAtom = atom((get) => get(_showAtom));
  }

  close(value: boolean) {
    this.resolve?.(value);
    this.promptResult = undefined;
    this.resolve = undefined;
    defaultStore.set(this._showAtom, false);
  }

  open() {
    this.close(false);
    defaultStore.set(this._showAtom, true);
    console.log('iiii');
    this.promptResult = new Promise<boolean>((resolve) => {
      this.resolve = resolve;
    });
    return this.promptResult;
  }
}
