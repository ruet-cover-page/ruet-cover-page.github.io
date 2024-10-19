import InAppSpy from 'inapp-spy';
import { atom } from 'jotai';
import { Prompt } from './Prompt';

export const isInAppAtom = atom<boolean>(InAppSpy().isInApp);
export const updatePrompt = new Prompt();
