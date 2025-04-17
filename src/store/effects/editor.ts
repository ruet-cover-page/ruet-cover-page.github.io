import editorStore from '@/store/editor';
import { atomEffect } from 'jotai-effect';

export const teacherEffect = atomEffect((get, set) => {
  const teacherName = get(editorStore.teacherName);

  if (!teacherName) {
    set(editorStore.teacherDepartment, '');
  }

  return () => {};
});
