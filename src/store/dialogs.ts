import InAppSpy from 'inapp-spy';
import { atom } from 'jotai';

export const isInAppAtom = atom<boolean>(InAppSpy().isInApp);
export const showUpdateAtom = atom(false);
